package com.jimmyproject.churchfinancebackend.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@AllArgsConstructor
@Getter
@Setter
public class DashboardResponse {
    private Integer year;
    private Integer month;
    private BigDecimal totalContributions;
    private BigDecimal totalExpenses;
    private BigDecimal totalBalance;
}
