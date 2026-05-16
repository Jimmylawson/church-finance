package com.jimmyproject.churchfinancebackend.expense;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.time.LocalDate;



public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Page<Expense> findAllByDateBetween(LocalDate from, LocalDate to, Pageable pageable);
    Page<Expense> findAllByDateGreaterThanEqual(LocalDate from, Pageable pageable);
    Page<Expense> findAllByDateLessThanEqual(LocalDate to, Pageable pageable);
}
