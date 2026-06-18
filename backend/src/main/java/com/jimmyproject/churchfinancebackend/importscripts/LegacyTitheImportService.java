package com.jimmyproject.churchfinancebackend.importscripts;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LegacyTitheImportService {
    private final LegacyMemberLookupService legacyMemberLookupService;

    public List<LegacyMemberLookupResult> previewMemberMatches(List<ParsedContribution> rows) {
        return legacyMemberLookupService.previewMatches(rows);
    }
}
