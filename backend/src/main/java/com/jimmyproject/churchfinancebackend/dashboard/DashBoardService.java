package com.jimmyproject.churchfinancebackend.dashboard;


import com.jimmyproject.churchfinancebackend.contribution.ContributionRepository;
import com.jimmyproject.churchfinancebackend.expense.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;


@Service
@RequiredArgsConstructor
public class DashBoardService {
    private final ContributionRepository contributionRepository;
    private final ExpenseRepository expenseRepository;

    public DashboardResponse getDashboard(Integer year, Integer month, LocalDate startDate, LocalDate endDate){
        BigDecimal totalContributions;
        BigDecimal totalExpenses;

        if (startDate != null && endDate != null) {
            totalContributions = contributionRepository.getContributionsByDateRange(startDate, endDate);
            totalExpenses = expenseRepository.getExpensesByDateRange(startDate, endDate);
        } else if (startDate != null || endDate != null) {
            throw new IllegalArgumentException("Both startDate and endDate are required for date range filtering");
        } else if (year != null && month != null) {
            totalContributions = contributionRepository.getContributionsByMonth(year, month);
            totalExpenses = expenseRepository.getExpensesByMonth(year, month);
        } else if (year != null) {
            totalContributions = contributionRepository.getContributionsByYear(year);
            totalExpenses = expenseRepository.getExpensesByYear(year);
        } else {
            LocalDate today = LocalDate.now();
            year = today.getYear();
            month = today.getMonthValue();

            totalContributions = contributionRepository.getContributionsByMonth(year, month);
            totalExpenses = expenseRepository.getExpensesByMonth(year, month);
        }

        BigDecimal totalBalance = totalContributions.subtract(totalExpenses);
        return new DashboardResponse(year, month, totalContributions, totalExpenses, totalBalance);
    }



}
