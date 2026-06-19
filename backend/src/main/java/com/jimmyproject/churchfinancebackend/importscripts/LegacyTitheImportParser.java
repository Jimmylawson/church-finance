package com.jimmyproject.churchfinancebackend.importscripts;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Month;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import static java.util.regex.Pattern.compile;

public class LegacyTitheImportParser {
    private static final int MEMBER_NAME_COLUMN = 0;
    private static final int FIRST_CONTRIBUTION_COLUMN = 2; // C
    private static final int LAST_CONTRIBUTION_COLUMN = 61; // BJ
    private static final int MONTH_HEADER_ROW_INDEX = 2; // row 3
    private static final int WEEK_HEADER_ROW_INDEX = 4; // row 5
    private static final int FIRST_MEMBER_ROW_INDEX = 5; // row 6
    private static final int LAST_MEMBER_ROW_INDEX = 51; // row 52

    private final DataFormatter dataFormatter = new DataFormatter(Locale.US);

    public List<Integer> findAvailableYears(Path workbookPath) throws IOException {
        try (InputStream inputStream = Files.newInputStream(workbookPath);
             XSSFWorkbook workbook = new XSSFWorkbook(inputStream)) {

            Set<Integer> years = new TreeSet<>();
            for (int sheetIndex = 0; sheetIndex < workbook.getNumberOfSheets(); sheetIndex++) {
                Sheet sheet = workbook.getSheetAt(sheetIndex);
                try {
                    years.add(extractYear(sheet.getSheetName()));
                } catch (IllegalArgumentException ignored) {
                    // Ignore non-year sheets in the workbook.
                }
            }

            return new ArrayList<>(years);
        }
    }

    public List<ParsedContribution> parseSheetByYear(Path workbookPath, int targetYear) throws IOException {
        try (InputStream inputStream = Files.newInputStream(workbookPath);
             XSSFWorkbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = findSheetByYear(workbook, targetYear);
            if (sheet == null) {
                throw new IllegalArgumentException("Could not find a sheet containing " + targetYear + " in the workbook");
            }

            int year = extractYear(sheet.getSheetName());
            Map<Integer, Month> monthByColumn = buildMonthByColumn(sheet);
            Map<Integer, Integer> weekByColumn = buildWeekByColumn(sheet);
            List<ParsedContribution> parsedRows = new ArrayList<>();

            for (int rowIndex = FIRST_MEMBER_ROW_INDEX; rowIndex <= LAST_MEMBER_ROW_INDEX; rowIndex++) {
                Row row = sheet.getRow(rowIndex);
                if (row == null) {
                    continue;
                }

                String memberName = getCellValue(row.getCell(MEMBER_NAME_COLUMN));
                if (memberName.isBlank()) {
                    continue;
                }

                for (int columnIndex = FIRST_CONTRIBUTION_COLUMN; columnIndex <= LAST_CONTRIBUTION_COLUMN; columnIndex++) {
                    BigDecimal amount = parseAmount(row.getCell(columnIndex));
                    if (amount == null) {
                        continue;
                    }

                    Month month = monthByColumn.get(columnIndex);
                    Integer weekNumber = weekByColumn.get(columnIndex);

                    if (month == null || weekNumber == null) {
                        continue;
                    }

                    parsedRows.add(new ParsedContribution(
                            memberName,
                            year,
                            month,
                            weekNumber,
                            amount
                    ));
                }
            }

            return parsedRows;
        }
    }

    public List<ParsedContribution> parse2018Sheet(Path workbookPath) throws IOException {
        return parseSheetByYear(workbookPath, 2018);
    }

    public List<ParsedContribution> parse2019Sheet(Path workbookPath) throws IOException {
        return parseSheetByYear(workbookPath, 2019);
    }

    private Sheet findSheetByYear(XSSFWorkbook workbook, int targetYear) {
        for (int sheetIndex = 0; sheetIndex < workbook.getNumberOfSheets(); sheetIndex++) {
            Sheet sheet = workbook.getSheetAt(sheetIndex);
            if (sheet.getSheetName().contains(String.valueOf(targetYear))) {
                return sheet;
            }
        }
        return null;
    }

    private int extractYear(String sheetName) {
        var matcher = compile("(20\\d{2}|19\\d{2})").matcher(sheetName);
        if (!matcher.find()) {
            throw new IllegalArgumentException("Could not extract year from sheet name: " + sheetName);
        }
        return Integer.parseInt(matcher.group());
    }

    private Map<Integer, Month> buildMonthByColumn(Sheet sheet) {
        Row monthRow = sheet.getRow(MONTH_HEADER_ROW_INDEX);
        Map<Integer, Month> monthByColumn = new HashMap<>();
        Month currentMonth = null;

        for (int columnIndex = FIRST_CONTRIBUTION_COLUMN; columnIndex <= LAST_CONTRIBUTION_COLUMN; columnIndex++) {
            String monthHeader = getCellValue(monthRow.getCell(columnIndex));
            if (!monthHeader.isBlank()) {
                currentMonth = parseMonth(monthHeader);
            }

            if (currentMonth != null) {
                monthByColumn.put(columnIndex, currentMonth);
            }
        }

        return monthByColumn;
    }

    private Map<Integer, Integer> buildWeekByColumn(Sheet sheet) {
        Row weekRow = sheet.getRow(WEEK_HEADER_ROW_INDEX);
        Map<Integer, Integer> weekByColumn = new HashMap<>();

        for (int columnIndex = FIRST_CONTRIBUTION_COLUMN; columnIndex <= LAST_CONTRIBUTION_COLUMN; columnIndex++) {
            String weekHeader = getCellValue(weekRow.getCell(columnIndex));
            if (!weekHeader.isBlank()) {
                weekByColumn.put(columnIndex, parseWeekNumber(weekHeader));
            }
        }

        return weekByColumn;
    }

    private Month parseMonth(String header) {
        return Month.valueOf(header.trim().toUpperCase(Locale.US));
    }

    private int parseWeekNumber(String weekHeader) {
        var matcher = compile("(\\d+)").matcher(weekHeader);
        if (!matcher.find()) {
            throw new IllegalArgumentException("Could not extract week number from header: " + weekHeader);
        }
        return Integer.parseInt(matcher.group(1));
    }

    private BigDecimal parseAmount(Cell cell) {
        String rawValue = getCellValue(cell);
        if (rawValue.isBlank()) {
            return null;
        }

        String normalized = rawValue.replace("$", "").replace(",", "").trim();
        if (normalized.isBlank() || normalized.startsWith("SUM(")) {
            return null;
        }

        return new BigDecimal(normalized);
    }

    private String getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        return dataFormatter.formatCellValue(cell).trim();
    }
}
