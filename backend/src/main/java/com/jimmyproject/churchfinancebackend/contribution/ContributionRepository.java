package com.jimmyproject.churchfinancebackend.contribution;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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
    select distinct year(c.date) from Contribution c 
    order by year(c.date) desc
""")
    List<Integer> findAvailableYears();

    @Query("""
    select coalesce(sum(c.amount), 0) from Contribution c
    where year(c.date) = :year and month(c.date) = :month
""")
    BigDecimal getContributionsByMonth(@Param("year") int year, @Param("month") int month);
    Page<Contribution> findAllByDateBetween(LocalDate from, LocalDate to, Pageable pageable);
    Page<Contribution> findAllByMemberId(Long memberId, Pageable pageable);


}
