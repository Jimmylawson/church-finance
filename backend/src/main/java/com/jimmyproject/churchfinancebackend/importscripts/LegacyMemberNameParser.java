package com.jimmyproject.churchfinancebackend.importscripts;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

public final class LegacyMemberNameParser {
    private static final Set<String> TITLE_PREFIXES = Set.of(
            "mr",
            "mrs",
            "ms",
            "miss",
            "pastor",
            "mama",
            "bro",
            "brother",
            "sis",
            "sister",
            "elder",
            "rev",
            "reverend",
            "deacon",
            "deaconess",
            "minister",
            "Ps",
            "ps",
            "Min."
    );

    private LegacyMemberNameParser() {
    }

    public static String normalizeForMatching(String rawName) {
        List<String> parts = extractNameParts(rawName);
        return parts.stream()
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.joining(" "));
    }

    public static ParsedMemberName parseMemberName(String rawName) {
        List<String> parts = extractNameParts(rawName);
        if (parts.isEmpty()) {
            throw new IllegalArgumentException("Could not parse a member name from: " + rawName);
        }

        String firstName = capitalize(parts.get(0));
        String lastName = parts.size() == 1
                ? ""
                : parts.subList(1, parts.size()).stream()
                .map(LegacyMemberNameParser::capitalize)
                .collect(Collectors.joining(" "));

        return new ParsedMemberName(firstName, lastName);
    }

    private static List<String> extractNameParts(String rawName) {
        String normalized = nullToBlank(rawName)
                .toLowerCase(Locale.US)
                .replace("-", " ")
                .replaceAll("[^a-z\\s]", " ")
                .replaceAll("\\s+", " ")
                .trim();

        if (normalized.isBlank()) {
            return List.of();
        }

        List<String> parts = List.of(normalized.split(" ")).stream()
                .filter(part -> !part.isBlank())
                .collect(Collectors.toList());

        int startIndex = 0;
        while (startIndex < parts.size() && TITLE_PREFIXES.contains(parts.get(startIndex))) {
            startIndex++;
        }

        return parts.subList(startIndex, parts.size());
    }

    private static String capitalize(String value) {
        if (value == null || value.isBlank()) {
            return "";
        }
        return value.substring(0, 1).toUpperCase(Locale.US) + value.substring(1).toLowerCase(Locale.US);
    }

    private static String nullToBlank(String value) {
        return value == null ? "" : value.trim();
    }
}
