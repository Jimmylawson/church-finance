package com.jimmyproject.churchfinancebackend.contribution;


import com.jimmyproject.churchfinancebackend.member.Member;
import com.jimmyproject.churchfinancebackend.member.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ContributionService {
    private final ContributionRepository contributionRepository;
    private final ContributionMapper contributionMapper;
    private final MemberService memberService;

    //create contribution
    @Transactional
    public ContributionResponse createContribution(ContributionRequest request){
        Member member = memberService.getMemberById(request.getMemberId());
        var contribution = contributionMapper.toEntity(request);
        contribution.setMember(member);
        var savedContribution = contributionRepository.save(contribution);
        return contributionMapper.toResponse(savedContribution);
    }

    public ContributionResponse getContributionById(Long contributionId){
        return contributionMapper.toResponse(contributionRepository.findById(contributionId)
                .orElseThrow(()-> new ContributionNotFoundException(contributionId)));
    }
    public Page<ContributionResponse> getAllContributions(Pageable pageable){
        return contributionRepository.findAll(pageable).map(contributionMapper::toResponse);
    }

    public Page<ContributionResponse> getContributionByDateRange(LocalDate from, LocalDate to, Pageable pageable){
        return contributionRepository.findAllByDateBetween(from, to,pageable).map(contributionMapper::toResponse);
    }
    public Page<ContributionResponse> getContributionsByMemberId(Long memberId, Pageable pageable){
        return contributionRepository.findAllByMemberId(memberId, pageable).map(contributionMapper::toResponse);
    }


    }


