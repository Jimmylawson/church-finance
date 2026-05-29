package com.jimmyproject.churchfinancebackend.contribution;


import com.jimmyproject.churchfinancebackend.member.Member;
import com.jimmyproject.churchfinancebackend.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContributionService {
    private final ContributionRepository contributionRepository;
    private final ContributionMapper contributionMapper;
    private final MemberService memberService;

    //create contribution
    public ContributionResponse createContribution(ContributionRequest request){
        Member member = memberService.getMemberById(request.getMemberId());
        var contribution = contributionMapper.toEntity(request);
        contribution.setMember(member);
        var savedContribution = contributionRepository.save(contribution);
        return contributionMapper.toResponse(savedContribution);
    }
    //
}
