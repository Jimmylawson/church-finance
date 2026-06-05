package com.jimmyproject.churchfinancebackend.contribution;

import com.jimmyproject.churchfinancebackend.enums.ContributionType;
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
public class ContributionResponse {
    private Long id;
    private BigDecimal amount;
    private ContributionType contributionType;
    private ;
    private String description;
    private String reference;
    private LocalDate date;
}
