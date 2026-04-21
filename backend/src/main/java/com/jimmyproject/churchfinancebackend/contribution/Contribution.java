package com.jimmyproject.churchfinancebackend.contribution;


import com.jimmyproject.churchfinancebackend.base.BaseEntity;
import com.jimmyproject.churchfinancebackend.enums.ContributionType;
import com.jimmyproject.churchfinancebackend.enums.PaymentMethod;
import com.jimmyproject.churchfinancebackend.user.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "contributions")
@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class Contribution  extends BaseEntity {
    private BigDecimal amount;
    @Enumerated(EnumType.STRING)
    private ContributionType contributionType;
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod = PaymentMethod.ZELLE;
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    private String description  = "";
    private String reference;
    private LocalDate date;

}
