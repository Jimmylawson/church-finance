package com.jimmyproject.churchfinancebackend.importscripts;

import com.jimmyproject.churchfinancebackend.enums.ContributionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LegacyTitheImportPreview(
        String spreadsheetName,
        Long matchedMemberId,
        String matchedMemberName,
        BigDecimal amount,
        int year,
        String month,
        int weekNumber,
        LocalDate contributionDate,
        ContributionType contributionType,
        LegacyTitheImportStatus status,
        String reason
) {
}
