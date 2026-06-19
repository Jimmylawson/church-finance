package com.jimmyproject.churchfinancebackend.importscripts;

import com.jimmyproject.churchfinancebackend.member.Member;
import com.jimmyproject.churchfinancebackend.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LegacyMemberLookupService {
    private final MemberRepository memberRepository;

    public List<LegacyMemberLookupResult> previewMatches(List<ParsedContribution> rows) {
        List<String> spreadsheetNames = rows.stream()
                .map(ParsedContribution::memberName)
                .distinct()
                .sorted()
                .toList();

        return previewMatches(spreadsheetNames);
    }

    public List<LegacyMemberLookupResult> previewMatches(Collection<String> spreadsheetNames) {
        Map<String, List<Member>> membersByNormalizedName = memberRepository.findAllByActiveTrue().stream()
                .collect(Collectors.groupingBy(
                        member -> LegacyMemberNameParser.normalizeForMatching(buildFullName(member)),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        return spreadsheetNames.stream()
                .distinct()
                .sorted()
                .map(name -> buildLookupResult(name, membersByNormalizedName))
                .toList();
    }

    public LegacyMemberLookupResult lookupMember(String spreadsheetName) {
        Map<String, List<Member>> membersByNormalizedName = memberRepository.findAllByActiveTrue().stream()
                .collect(Collectors.groupingBy(
                        member -> LegacyMemberNameParser.normalizeForMatching(buildFullName(member)),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        return buildLookupResult(spreadsheetName, membersByNormalizedName);
    }


    private LegacyMemberLookupResult buildLookupResult(
            String spreadsheetName,
            Map<String, List<Member>> membersByNormalizedName
    ) {
        String normalizedSpreadsheetName = LegacyMemberNameParser.normalizeForMatching(spreadsheetName);
        List<Member> matches = membersByNormalizedName.getOrDefault(normalizedSpreadsheetName, List.of());

        if (matches.isEmpty()) {
            return new LegacyMemberLookupResult(
                    spreadsheetName,
                    normalizedSpreadsheetName,
                    LegacyMemberLookupStatus.UNMATCHED,
                    null,
                    null
            );
        }

        if (matches.size() > 1) {
            return new LegacyMemberLookupResult(
                    spreadsheetName,
                    normalizedSpreadsheetName,
                    LegacyMemberLookupStatus.AMBIGUOUS,
                    null,
                    null
            );
        }

        Member member = matches.get(0);
        return new LegacyMemberLookupResult(
                spreadsheetName,
                normalizedSpreadsheetName,
                LegacyMemberLookupStatus.MATCHED,
                member.getId(),
                buildFullName(member)
        );
    }

    private String buildFullName(Member member) {
        return List.of(
                        nullToBlank(member.getFirstName()),
                        nullToBlank(member.getLastName())
                ).stream()
                .filter(part -> !part.isBlank())
                .collect(Collectors.joining(" "));
    }

    private String nullToBlank(String value) {
        return value == null ? "" : value.trim();
    }
}
