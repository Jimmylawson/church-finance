package com.jimmyproject.churchfinancebackend.importscripts;

import com.jimmyproject.churchfinancebackend.member.Member;

import java.math.BigDecimal;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.Month;
import java.util.Optional;

public class LegacyTitheImportParser {
    public void importWorkbook(Path workbookPath){
        var filePath = workbookPath.toAbsolutePath()

    }
    private int extractYear(String sheetName){

    }
    private Month parseMonth(String header){

    }
    private int parseWeekNumber(String weekHeader){

    }
    private LocalDate resolveWeekDate(int year, Month month, int weekNumber){

    }
    private Optional<Member> findMemberByName(String name){

    }

    private BigDecimal parseAmount(Cell cell){

    }
}
