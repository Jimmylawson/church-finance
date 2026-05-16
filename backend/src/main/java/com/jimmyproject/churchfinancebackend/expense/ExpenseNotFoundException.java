package com.jimmyproject.churchfinancebackend.expense;

import com.jimmyproject.churchfinancebackend.exceptions.ResourceNotFoundException;

public class ExpenseNotFoundException extends ResourceNotFoundException {

    public ExpenseNotFoundException(Long id) {
        super("Expense not found with id: " + id);
    }

    public ExpenseNotFoundException(String message) {
        super(message);
    }
}
