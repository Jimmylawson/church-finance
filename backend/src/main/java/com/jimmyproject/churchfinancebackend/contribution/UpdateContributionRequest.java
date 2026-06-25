package com.jimmyproject.churchfinancebackend.contribution;

import com.jimmyproject.churchfinancebackend.enums.ContributionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record UpdateContributionRequest(BigDecimal amount,
                                        LocalDate date,
                                        Long memberId,
                                        ContributionType contributionType,
                                        String reference,
                                        String description) {}
