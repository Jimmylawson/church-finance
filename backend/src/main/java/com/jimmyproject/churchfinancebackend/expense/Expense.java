package com.jimmyproject.churchfinancebackend.expense;


import com.jimmyproject.churchfinancebackend.base.BaseEntity;
import com.jimmyproject.churchfinancebackend.enums.Category;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Expense  extends BaseEntity {
    @Enumerated(EnumType.STRING)
    private Category category;
    private BigDecimal amount;
    private String description = "";
    private String reference;
    private LocalDate date;
}
