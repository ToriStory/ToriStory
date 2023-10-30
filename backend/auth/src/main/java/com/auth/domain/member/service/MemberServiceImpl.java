package com.auth.domain.member.service;

import com.auth.domain.mail.service.MailService;
import com.auth.domain.member.dto.request.CheckCodeReq;
import com.auth.domain.member.dto.request.JoinReq;
import com.auth.domain.member.dto.request.LoginReq;
import com.auth.domain.member.dto.response.FindIdRes;
import com.auth.domain.member.dto.response.LoginRes;
import com.auth.domain.member.dto.response.MyInfoRes;
import com.auth.domain.member.entity.Member;
import com.auth.domain.member.repository.MemberRepository;
import com.auth.global.exception.AuthException;
import com.auth.global.exception.ErrorCode;
import com.auth.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final MailService mailService;
    private final RedisTemplate<String, String> redisTemplate;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${spring.mail.auth-code-expiration-millis}")
    private long authCodeExpirationMillis;

    @Override
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(ErrorCode.NO_SUCH_MEMBER));
    }

    @Override
    public void join(JoinReq joinReq) {

        log.debug("Member Service: join() method called.........");

        checkDuplicateEmail(joinReq.getEmail());

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

        log.debug("Member Service: logout() method called.........");

        String email = jwtProvider.extractEmail(accessToken);

        log.debug("email: {}", email);

        jwtProvider.setBlackList(accessToken, email);
        jwtProvider.deleteRefreshToken(email);
    }

    @Override
    public void checkDuplicateEmail(String email) {

            log.debug("Member Service: checkEmail() method called.........");
            log.debug("email: {}", email);

            if (memberRepository.existsByEmail(email)) {
                log.debug("--------------Duplicate Email--------------");
                throw new AuthException(ErrorCode.DUPLICATED_EMAIL);
            }
    }

    @Override
    public MyInfoRes findMyInfo(String accessToken) {

        log.debug("Member Service: findMyInfo() method called.........");

        Member member = findByEmail(jwtProvider.extractEmail(accessToken));

        return MyInfoRes.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .imgUrl(member.getImgUrl())
                .build();
    }

    @Override
    public void sendCodeToEmail(String toEmail) {
        checkDuplicateEmail(toEmail);
        String title = "Tori Story 이메일 인증 번호";
        String authCode = this.createCode();
        mailService.sendEmail(toEmail, title, authCode);
        // 이메일 인증 요청 시 인증 번호 Redis에 저장 ( key = "AuthCode " + Email / value = AuthCode )
        redisTemplate.opsForValue().set(
                toEmail,
                authCode,
                authCodeExpirationMillis,
                TimeUnit.MILLISECONDS);

    }

    private String createCode() {
        int lenth = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < lenth; i++) {
                builder.append(random.nextInt(10));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            log.debug("MemberService.createCode() exception occur");
            throw new AuthException(ErrorCode.NO_SUCH_ALGORITHM);
        }
    }

    public void checkCode(CheckCodeReq checkCodeReq) {

        String email = checkCodeReq.getEmail();
        String authCode = checkCodeReq.getCode();

        // 이메일 중복 체크
        checkDuplicateEmail(email);

        // Redis에 키가 있는지 확인
        if(!redisTemplate.hasKey(email))
            throw new AuthException(ErrorCode.EXPIRED_AUTH_CODE);

        // Redis에 저장된 인증 번호와 입력한 인증 번호가 일치하는지 확인
        if(!authCode.equals(redisTemplate.opsForValue().get(email)))
            throw new AuthException(ErrorCode.NOT_MATCH_AUTH_CODE);
    }

}
