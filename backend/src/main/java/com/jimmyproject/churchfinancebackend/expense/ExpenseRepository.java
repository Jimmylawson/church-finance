package com.jimmyproject.churchfinancebackend.expense;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.math.BigDecimal;
import java.time.LocalDate;



public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Page<Expense> findAllByDateBetween(LocalDate from, LocalDate to, Pageable pageable);
    Page<Expense> findAllByDateGreaterThanEqual(LocalDate from, Pageable pageable);
    Page<Expense> findAllByDateLessThanEqual(LocalDate to, Pageable pageable);

    @Query("""
        select coalesce(sum(e.amount), 0 ) from Expense e 
        where  year(e.date) = :year
""")
    BigDecimal getExpensesByYear(@Param("year") int year);
    @Query("""
        select coalesce(sum(e.amount), 0 ) from Expense e 
        where  year(e.date) = :year and month(e.date) = :month
""")
    BigDecimal getExpensesByMonth(@Param("year") int year, @Param("month") int month);

    @Query("""
        select coalesce(sum(e.amount), 0 ) from Expense  e
        where e.date between :startDate and :endDate
""")
    BigDecimal getExpensesByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
