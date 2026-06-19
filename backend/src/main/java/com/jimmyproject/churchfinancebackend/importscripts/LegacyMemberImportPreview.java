package com.jimmyproject.churchfinancebackend.importscripts;

public record LegacyMemberImportPreview(
        String spreadsheetName,
        String normalizedSpreadsheetName,
        String firstName,
        String lastName,
        Long existingMemberId,
        String existingMemberName,
        LegacyMemberImportStatus status,
        String reason
) {
}
