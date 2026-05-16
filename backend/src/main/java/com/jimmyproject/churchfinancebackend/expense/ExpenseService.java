package com.jimmyproject.churchfinancebackend.expense;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;

    private ExpenseResponse getExpenseById(Long id) {
        var expense =  expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException(id));

        return expenseMapper.toResponse(expense);
    }

    public ExpenseResponse createExpense(ExpenseRequest request){
        Expense expense = expenseMapper.toEntity(request);
        expense = expenseRepository.save(expense);
        return expenseMapper.toResponse(expense);
    }
    public ExpenseResponse getExpense(Long expenseId){
        return getExpenseById(expenseId);
    }
    public Page<ExpenseResponse> getAllExpenses(Pageable pageable){
        return expenseRepository.findAll(pageable).map(expenseMapper::toResponse);
    }
    public Page<ExpenseResponse> getExpensesByDateBetween(LocalDate from, LocalDate to, Pageable pageable){
        return expenseRepository.findAllByDateBetween(from, to, pageable).map(expenseMapper::toResponse);
    }
    public Page<ExpenseResponse> getExpensesByGreaterThanEqual(LocalDate from, Pageable pageable){
        return expenseRepository.findAllByDateGreaterThanEqual(from, pageable).map(expenseMapper::toResponse);
    }
    public Page<ExpenseResponse> getExpensesByLessThanEqual(LocalDate to, Pageable pageable){
        return expenseRepository.findAllByDateLessThanEqual(to, pageable).map(expenseMapper::toResponse);
    }
}
