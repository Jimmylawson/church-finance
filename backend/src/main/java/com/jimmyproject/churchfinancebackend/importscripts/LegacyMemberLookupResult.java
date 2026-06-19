package com.jimmyproject.churchfinancebackend.importscripts;

public record LegacyMemberLookupResult(
        String spreadsheetName,
        String normalizedSpreadsheetName,
        LegacyMemberLookupStatus status,
        Long matchedMemberId,
        String matchedMemberName
) {
}
