package com.auth.domain.member.service;

import com.auth.domain.member.entity.Member;
import com.auth.domain.member.repository.MemberRepository;
import com.auth.global.exception.AuthException;
import com.auth.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(ErrorCode.NO_SUCH_MEMBER));
    }

}
