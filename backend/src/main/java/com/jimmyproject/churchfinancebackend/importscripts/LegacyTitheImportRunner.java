package com.jimmyproject.churchfinancebackend.importscripts;

import java.math.BigDecimal;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.Month;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class LegacyTitheImportRunner {
    public static void main(String[] args) throws Exception {
        Path workbookPath = Path.of("/Users/jimmylawson/Desktop/church-finance/backend/imports/Replib Chicago Tithing Spreadsheet.xlsx");
        int yearToInspect = 2019;

        LegacyTitheImportParser parser = new LegacyTitheImportParser();
        List<ParsedContribution> rows = parser.parseSheetByYear(workbookPath, yearToInspect);

        System.out.printf("Parsed %d contributions from %d.%n", rows.size(), yearToInspect);

        Set<String> uniqueMembers = rows.stream()
                .map(ParsedContribution::memberName)
                .collect(Collectors.toCollection(LinkedHashSet::new));

        BigDecimal totalAmountForYear = rows.stream()
                .map(ParsedContribution::amount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<Month, BigDecimal> totalsByMonth = rows.stream()
                .collect(Collectors.groupingBy(
                        ParsedContribution::month,
                        Collectors.mapping(
                                ParsedContribution::amount,
                                Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                        )
                ));

        System.out.printf("Unique members: %d%n", uniqueMembers.size());
        System.out.printf("Year total: %s%n", totalAmountForYear.toPlainString());

        System.out.println();
        System.out.println("Monthly totals:");
        totalsByMonth.entrySet().stream()
                .sorted(Map.Entry.comparingByKey(Comparator.naturalOrder()))
                .forEach(entry -> System.out.printf("- %s: %s%n", entry.getKey(), entry.getValue().toPlainString()));

        System.out.println();
        System.out.println("First 10 members:");
        uniqueMembers.stream()
                .limit(10)
                .forEach(name -> System.out.printf("- %s%n", name));

        System.out.println();
        System.out.println("First 25 parsed rows with derived dates:");
        rows.stream()
                .limit(25)
                .forEach(row -> {
                    LocalDate contributionDate = LegacyContributionDateResolver.resolveContributionDate(
                            row.year(),
                            row.month(),
                            row.weekNumber()
                    );

                    System.out.printf(
                            "- %s | %s | week %d | %s | %s%n",
                            row.memberName(),
                            row.month(),
                            row.weekNumber(),
                            contributionDate,
                            row.amount().toPlainString()
                    );
                });
    }
}
