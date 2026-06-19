package com.jimmyproject.churchfinancebackend;

import com.jimmyproject.churchfinancebackend.importscripts.LegacyMemberImportService;
import com.jimmyproject.churchfinancebackend.importscripts.LegacyTitheImportParser;
import com.jimmyproject.churchfinancebackend.importscripts.LegacyTitheImportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.nio.file.Path;

@SpringBootApplication
@EnableJpaAuditing

public class ChurchFinanceBackendApplication {
    private static final Logger log = LoggerFactory.getLogger(ChurchFinanceBackendApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ChurchFinanceBackendApplication.class, args);
    }

    @Bean
    @Profile("import")
    public CommandLineRunner run(
            LegacyMemberImportService legacyMemberImportService,
            LegacyTitheImportService legacyTitheImportService
    ) {
        return args -> {
            Path workbookPath = Path.of("/Users/jimmylawson/Desktop/church-finance/backend/imports/Replib Chicago Tithing Spreadsheet.xlsx");

            LegacyTitheImportParser parser = new LegacyTitheImportParser();
            var yearsToImport = parser.findAvailableYears(workbookPath);

            log.info("Discovered workbook years: {}", yearsToImport);
            for (Integer yearToImport : yearsToImport) {
                var rows = parser.parseSheetByYear(workbookPath, yearToImport);

                var memberResults = legacyMemberImportService.importMembers(rows);
                var contributionResults = legacyTitheImportService.importRows(rows);

                long createdMembers = memberResults.stream()
                        .filter(result -> result.status().name().equals("CREATED"))
                        .count();

                long importedContributions = contributionResults.stream()
                        .filter(result -> result.status().name().equals("IMPORTED"))
                        .count();

                long skippedContributions = contributionResults.size() - importedContributions;

                log.info("Imported spreadsheet year {}", yearToImport);
                log.info("Parsed rows: {}", rows.size());
                log.info("Members created: {}", createdMembers);
                log.info("Contributions imported: {}", importedContributions);
                log.info("Contributions skipped: {}", skippedContributions);
            }
        };
    }
}
