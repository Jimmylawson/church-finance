package com.jimmyproject.churchfinancebackend.expense;

import jakarta.transaction.Transactional;
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

    private Expense getExpenseById(Long id) {
       return expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    public ExpenseResponse createExpense(ExpenseRequest request){
        Expense expense = expenseMapper.toEntity(request);
        expense = expenseRepository.save(expense);
        return expenseMapper.toResponse(expense);
    }
    public ExpenseResponse getExpense(Long expenseId){

        return expenseMapper.toResponse(getExpenseById(expenseId));
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
    @Transactional
    public void deleteExpense(Long expenseId){
        getExpenseById(expenseId);
        expenseRepository.deleteById(expenseId);
    }
    @Transactional
    public ExpenseResponse updateExpense(Long expenseId, ExpenseRequest dto){
        Expense expense = getExpenseById(expenseId);

        if (dto.getCategory() != null) {
            expense.setCategory(dto.getCategory());
        }
        if (dto.getAmount() != null) {
            expense.setAmount(dto.getAmount());
        }
        if (dto.getDescription() != null) {
            expense.setDescription(dto.getDescription());
        }
        if (dto.getReference() != null) {
            expense.setReference(dto.getReference());
        }
        if (dto.getDate() != null) {
            expense.setDate(dto.getDate());
        }

        var savedExpense = expenseRepository.save(expense);

        return expenseMapper.toResponse(savedExpense);

    }
}
