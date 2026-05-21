package com.jimmyproject.churchfinancebackend.contribution;

import com.jimmyproject.churchfinancebackend.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Contribution, Long> {
    Optional<Member> findMemberById(Long id);
}
