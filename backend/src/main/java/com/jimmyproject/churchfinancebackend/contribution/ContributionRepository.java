package com.jimmyproject.churchfinancebackend.contribution;

import com.jimmyproject.churchfinancebackend.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

public interface ContributionRepository extends JpaRepository<Contribution, Long> {

    @Query(
            """
            select coalesce(sum(c.amount), 0) from Contribution c 
            where year(c.date) = :year
""")
    BigDecimal getContributionsByYear(@Param("year") int year);
    @Query("""
        select  coalesce(sum(c.amount), 0) from Contribution c
        where c.date between :startDate and :endDate
        
""")
    BigDecimal getContributionsByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query("""
        select coalesce(sum(c.amount), 0 ) from Contribution c
        where  year(c.date) = :year and month(c.date) = :month
""")
    BigDecimal getContributionsByMonth(@Param("year") int year, @Param("month") int month);

}
