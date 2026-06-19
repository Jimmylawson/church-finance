package com.jimmyproject.churchfinancebackend.importscripts;

import com.jimmyproject.churchfinancebackend.member.Member;
import com.jimmyproject.churchfinancebackend.member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LegacyMemberImportService {
    private final MemberRepository memberRepository;

    public List<LegacyMemberImportPreview> previewMemberCreation(List<ParsedContribution> rows) {
        List<String> spreadsheetNames = rows.stream()
                .map(ParsedContribution::memberName)
                .distinct()
                .sorted()
                .toList();

        return previewMemberCreationFromNames(spreadsheetNames);
    }

    public List<LegacyMemberImportPreview> previewMemberCreationFromNames(List<String> spreadsheetNames) {
        Map<String, Member> existingMembersByNormalizedName = memberRepository.findAll().stream()
                .collect(Collectors.toMap(
                        member -> LegacyMemberNameParser.normalizeForMatching(buildFullName(member)),
                        member -> member,
                        (left, right) -> left,
                        LinkedHashMap::new
                ));

        return spreadsheetNames.stream()
                .distinct()
                .sorted()
                .map(name -> buildPreview(name, existingMembersByNormalizedName))
                .toList();
    }

    @Transactional
    public List<LegacyMemberImportPreview> importMembers(List<ParsedContribution> rows) {
        List<LegacyMemberImportPreview> previews = previewMemberCreation(rows);

        return previews.stream()
                .map(preview -> {
                    if (preview.status() != LegacyMemberImportStatus.READY_TO_CREATE) {
                        return preview;
                    }

                    Member member = new Member();
                    member.setFirstName(preview.firstName());
                    member.setLastName(preview.lastName());
                    member.setActive(true);
                    member.setPhoneNumber("");
                    member.setAddress("");
                    member = memberRepository.save(member);

                    return new LegacyMemberImportPreview(
                            preview.spreadsheetName(),
                            preview.normalizedSpreadsheetName(),
                            preview.firstName(),
                            preview.lastName(),
                            member.getId(),
                            buildFullName(member),
                            LegacyMemberImportStatus.CREATED,
                            "Member created from legacy spreadsheet"
                    );
                })
                .toList();
    }

    private LegacyMemberImportPreview buildPreview(String spreadsheetName, Map<String, Member> existingMembersByNormalizedName) {
        ParsedMemberName parsedName = LegacyMemberNameParser.parseMemberName(spreadsheetName);
        String normalizedSpreadsheetName = LegacyMemberNameParser.normalizeForMatching(spreadsheetName);
        Member existingMember = existingMembersByNormalizedName.get(normalizedSpreadsheetName);

        if (existingMember != null) {
            return new LegacyMemberImportPreview(
                    spreadsheetName,
                    normalizedSpreadsheetName,
                    parsedName.firstName(),
                    parsedName.lastName(),
                    existingMember.getId(),
                    buildFullName(existingMember),
                    LegacyMemberImportStatus.SKIPPED_ALREADY_EXISTS,
                    "A member with this normalized name already exists"
            );
        }

        return new LegacyMemberImportPreview(
                spreadsheetName,
                normalizedSpreadsheetName,
                parsedName.firstName(),
                parsedName.lastName(),
                null,
                null,
                LegacyMemberImportStatus.READY_TO_CREATE,
                "Ready to create member"
        );
    }

    private String buildFullName(Member member) {
        return List.of(member.getFirstName(), member.getLastName()).stream()
                .filter(value -> value != null && !value.isBlank())
                .collect(Collectors.joining(" "));
    }
}
