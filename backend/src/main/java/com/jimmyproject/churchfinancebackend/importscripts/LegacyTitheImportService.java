package com.jimmyproject.churchfinancebackend.importscripts;

import com.jimmyproject.churchfinancebackend.contribution.Contribution;
import com.jimmyproject.churchfinancebackend.contribution.ContributionRepository;
import com.jimmyproject.churchfinancebackend.enums.ContributionType;
import com.jimmyproject.churchfinancebackend.member.Member;
import com.jimmyproject.churchfinancebackend.member.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LegacyTitheImportService {
    private final LegacyMemberLookupService legacyMemberLookupService;
    private final ContributionRepository contributionRepository;
    private final MemberRepository memberRepository;

    public List<LegacyMemberLookupResult> previewMemberMatches(List<ParsedContribution> rows) {
        return legacyMemberLookupService.previewMatches(rows);
    }

    public List<LegacyTitheImportPreview> previewImportRows(List<ParsedContribution> rows) {
        return rows.stream()
                .map(this::buildPreview)
                .toList();
    }

    @Transactional
    public List<LegacyTitheImportPreview> importRows(List<ParsedContribution> rows) {
        List<LegacyTitheImportPreview> importedRows = new ArrayList<>();

        for (ParsedContribution row : rows) {
            LegacyTitheImportPreview preview = buildPreview(row);
            if (preview.status() != LegacyTitheImportStatus.READY_TO_IMPORT) {
                importedRows.add(preview);
                continue;
            }

            Contribution contribution = buildContribution(row, preview);
            contributionRepository.save(contribution);

            importedRows.add(new LegacyTitheImportPreview(
                    preview.spreadsheetName(),
                    preview.matchedMemberId(),
                    preview.matchedMemberName(),
                    preview.amount(),
                    preview.year(),
                    preview.month(),
                    preview.weekNumber(),
                    preview.contributionDate(),
                    preview.contributionType(),
                    LegacyTitheImportStatus.IMPORTED,
                    "Imported successfully"
            ));
        }

        return importedRows;
    }

    private LegacyTitheImportPreview buildPreview(ParsedContribution row) {
        LegacyMemberLookupResult lookupResult = legacyMemberLookupService.lookupMember(row.memberName());
        LocalDate contributionDate = LegacyContributionDateResolver.resolveContributionDate(
                row.year(),
                row.month(),
                row.weekNumber()
        );

        if (lookupResult.status() == LegacyMemberLookupStatus.UNMATCHED) {
            return new LegacyTitheImportPreview(
                    row.memberName(),
                    null,
                    null,
                    row.amount(),
                    row.year(),
                    row.month().name(),
                    row.weekNumber(),
                    contributionDate,
                    ContributionType.TITHE,
                    LegacyTitheImportStatus.SKIPPED_UNMATCHED_MEMBER,
                    "No active member matched this spreadsheet name"
            );
        }

        if (lookupResult.status() == LegacyMemberLookupStatus.AMBIGUOUS) {
            return new LegacyTitheImportPreview(
                    row.memberName(),
                    null,
                    null,
                    row.amount(),
                    row.year(),
                    row.month().name(),
                    row.weekNumber(),
                    contributionDate,
                    ContributionType.TITHE,
                    LegacyTitheImportStatus.SKIPPED_AMBIGUOUS_MEMBER,
                    "More than one active member matched this spreadsheet name"
            );
        }

        return new LegacyTitheImportPreview(
                row.memberName(),
                lookupResult.matchedMemberId(),
                lookupResult.matchedMemberName(),
                row.amount(),
                row.year(),
                row.month().name(),
                row.weekNumber(),
                contributionDate,
                ContributionType.TITHE,
                LegacyTitheImportStatus.READY_TO_IMPORT,
                "Ready to import"
        );
    }

    private Contribution buildContribution(ParsedContribution row, LegacyTitheImportPreview preview) {
        Member member = memberRepository.findById(preview.matchedMemberId())
                .orElseThrow(() -> new IllegalStateException(
                        "Matched member id " + preview.matchedMemberId() + " was not found during import"
                ));

        Contribution contribution = new Contribution();
        contribution.setAmount(row.amount());
        contribution.setContributionType(ContributionType.TITHE);
        contribution.setMember(member);
        contribution.setDate(preview.contributionDate());
        contribution.setDescription("Imported from legacy tithe spreadsheet");
        contribution.setReference(
                "legacy-tithe-%d-%s-week-%d".formatted(row.year(), row.month().name().toLowerCase(), row.weekNumber())
        );
        return contribution;
    }
}