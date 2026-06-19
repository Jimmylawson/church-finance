package com.jimmyproject.churchfinancebackend.importscripts;

public enum LegacyTitheImportStatus {
    READY_TO_IMPORT,
    IMPORTED,
    SKIPPED_UNMATCHED_MEMBER,
    SKIPPED_AMBIGUOUS_MEMBER
}
