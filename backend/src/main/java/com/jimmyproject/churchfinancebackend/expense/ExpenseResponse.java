package com.jimmyproject.churchfinancebackend.expense;

import com.jimmyproject.churchfinancebackend.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseResponse {
    private Long id;
    private Category category;
    private BigDecimal amount;
    private String description;
    private String reference;
    private LocalDate date;
}
