package com.jimmyproject.churchfinancebackend.dashboard;


import com.jimmyproject.churchfinancebackend.contribution.ContributionRepository;
import com.jimmyproject.churchfinancebackend.expense.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DashBoardService {
    private final ContributionRepository contributionRepository;
    private final ExpenseRepository expenseRepository;



}
