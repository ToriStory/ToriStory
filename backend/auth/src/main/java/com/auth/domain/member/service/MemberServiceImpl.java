package com.auth.domain.member.service;

import com.auth.domain.member.dto.request.JoinReq;
import com.auth.domain.member.dto.request.LoginReq;
import com.auth.domain.member.dto.response.FindIdRes;
import com.auth.domain.member.dto.response.LoginRes;
import com.auth.domain.member.entity.Member;
import com.auth.domain.member.repository.MemberRepository;
import com.auth.global.exception.AuthException;
import com.auth.global.exception.ErrorCode;
import com.auth.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(ErrorCode.NO_SUCH_MEMBER));
    }

    @Override
    public void join(JoinReq joinReq) {

        log.debug("Member Service: join() method called.........");

        memberRepository.save(Member.builder()
                .email(joinReq.getEmail())
                .nickname(joinReq.getNickname())
                .pw(passwordEncoder.encode(joinReq.getPassword()))
                .build());
    }

    @Override
    public LoginRes login(LoginReq loginReq) {

        log.debug("Member Service: login() method called.........");

        Member member = memberRepository.findByEmail(loginReq.getEmail())
                .orElseThrow(() -> new AuthException(ErrorCode.NO_SUCH_MEMBER));

        // 비밀번호가 일치하지 않는 경우
        if (!passwordEncoder.matches(loginReq.getPassword(), member.getPw())) {
            throw new AuthException(ErrorCode.NOT_MATCH_PASSWORD);
        }

        return LoginRes.builder()
                .accessToken(jwtProvider.generateAccessToken(member.getEmail()))
                .refreshToken(jwtProvider.generateRefreshToken(member.getEmail()))
                .build();

    }

    @Override
    public FindIdRes findId(String email) {
        return FindIdRes.builder()
                .id(findByEmail(email).getMemberId())
                .build();
    }

    @Override
    public void logout(String accessToken) {

        String email = jwtProvider.extractEmail(accessToken);

        jwtProvider.setBlackList(accessToken, email);
        jwtProvider.deleteRefreshToken(email);

    }

}
