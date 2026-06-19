package com.jimmyproject.churchfinancebackend.importscripts;

import java.math.BigDecimal;
import java.time.Month;

public record ParsedContribution(
        String memberName,
        int year,
        Month month,
        int weekNumber,
        BigDecimal amount
        ) {}
