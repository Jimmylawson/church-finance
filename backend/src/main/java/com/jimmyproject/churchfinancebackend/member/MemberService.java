package com.jimmyproject.churchfinancebackend.member;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    private Member getMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));
    }

    public MemberResponse createMember(MemberRequest request) {
        Member member = memberMapper.toEntity(request);
        member = memberRepository.save(member);
        return memberMapper.toResponse(member);
    }

    public MemberResponse getMember(Long memberId) {
        return memberMapper.toResponse(getMemberById(memberId));
    }

    public Page<MemberResponse> getAllMembers(Pageable pageable) {
        return memberRepository.findAll(pageable).map(memberMapper::toResponse);
    }

    @Transactional
    public void deleteMember(Long memberId) {
        getMemberById(memberId);
        memberRepository.deleteById(memberId);
    }

    @Transactional
    public MemberResponse updateMember(Long memberId, MemberRequest request) {
        Member member = getMemberById(memberId);

        if (request.getFirstName() != null) {
            member.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            member.setLastName(request.getLastName());
        }
        if (request.getEmail() != null) {
            member.setEmail(request.getEmail());
        }
        if (request.getPhoneNumber() != null) {
            member.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getAddress() != null) {
            member.setAddress(request.getAddress());
        }

        member.setActive(request.isActive());

        Member savedMember = memberRepository.save(member);
        return memberMapper.toResponse(savedMember);
    }
}
