package com.jimmyproject.churchfinancebackend.importscripts;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.TemporalAdjusters;

public final class LegacyContributionDateResolver {

    private LegacyContributionDateResolver() {
    }

    public static LocalDate resolveContributionDate(int year, Month month, int weekNumber) {
        if (weekNumber < 1 || weekNumber > 5) {
            throw new IllegalArgumentException("Week number must be between 1 and 5. Received: " + weekNumber);
        }

        LocalDate firstSunday = LocalDate.of(year, month, 1)
                .with(TemporalAdjusters.firstInMonth(DayOfWeek.SUNDAY));

        LocalDate resolvedDate = firstSunday.plusWeeks(weekNumber - 1L);

        if (resolvedDate.getMonth() != month) {
            return LocalDate.of(year, month, 1)
                    .with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY));
        }

        return resolvedDate;
    }
}
