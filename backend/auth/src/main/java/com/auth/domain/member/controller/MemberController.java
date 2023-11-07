package com.auth.domain.member.controller;

import com.auth.domain.member.dto.request.*;
import com.auth.domain.member.dto.response.FindIdRes;
import com.auth.domain.member.dto.response.LoginRes;
import com.auth.domain.member.dto.response.MyInfoRes;
import com.auth.domain.member.dto.response.RefreshRes;
import com.auth.domain.member.service.MemberService;
import com.auth.global.exception.AuthException;
import com.auth.global.jwt.JwtProperties;
import com.auth.global.jwt.JwtProvider;
import com.auth.global.response.EnvelopRes;
import com.auth.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;
    private final JwtProperties jwtProperties;

    @Value("${jwt.cookieName}")
    private String jwtCookieName;

    @Value("${refreshToken.path}")
    private String refreshTokenPath;

    @PostMapping("/join")
    public ResponseEntity<EnvelopRes> join(@Valid @RequestBody JoinReq joinReq) {

        log.debug("Member Controller: join() method called.........");


        memberService.checkCode(CheckCodeReq.builder()
                .email(joinReq.getEmail())
                .code(joinReq.getCode())
                .build());

        memberService.join(joinReq);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(EnvelopRes.builder()
                        .code(201)
                        .build());
    }

    @PostMapping("/login")
    public ResponseEntity<EnvelopRes<LoginRes>> login(@Valid @RequestBody LoginReq loginReq) {

        log.debug("Member Controller: login() method called.........");

        return ResponseEntity.status(HttpStatus.OK)
                .header("Set-Cookie", jwtCookieName + "=" + jwtProvider.generateRefreshToken(loginReq.getEmail())
                        + "; Path=" + refreshTokenPath + "; HttpOnly; Max-Age=" + jwtProperties.getRefreshTokenValidity()/1000 + "; SameSite=None; Secure")
                .body(EnvelopRes.<LoginRes>builder()
                        .data(memberService.login(loginReq))
                        .build());
    }

    @PostMapping("/logout")
    public ResponseEntity<EnvelopRes> logout(@ApiIgnore @RequestHeader("Authorization") String accessToken) {

        log.debug("Member Controller: logout() method called.........");

        memberService.logout(accessToken);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.builder()
                        .build());
    }

    @PostMapping("/refresh")
    public ResponseEntity<EnvelopRes<RefreshRes>> refresh(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();

        String refreshToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (jwtCookieName.equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    log.debug("refreshToken: " + refreshToken);
                }
            }
        }else{
            throw new AuthException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        String email = jwtProvider.extractEmail(refreshToken);

        // refreshToken 유효기간이 절반 이하로 남았을 경우 refreshToken 재발급
        if(jwtProvider.getRemainMilliSeconds(refreshToken) < jwtProperties.getRefreshTokenValidity()/2){

            log.debug("refreshToken 재발급.........");

            String newAccessToken = jwtProvider.reIssue(refreshToken);
            String newRefreshToken = jwtProvider.generateRefreshToken(email);

            return ResponseEntity.status(HttpStatus.OK)
                    .header("Set-Cookie", jwtCookieName + "=" + newRefreshToken
                            + "; Path=" + refreshTokenPath +"; HttpOnly; Max-Age=" + jwtProperties.getRefreshTokenValidity()/1000 + "; SameSite=None; Secure")
                    .body(EnvelopRes.<RefreshRes>builder()
                            .data(RefreshRes.builder()
                                    .accessToken(newAccessToken)
                                    .build())
                            .build());
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<RefreshRes>builder()
                        .data(RefreshRes.builder()
                                .accessToken(jwtProvider.reIssue(refreshToken))
                                .build())
                        .build());
    }

    @PostMapping("/id")
    public ResponseEntity<EnvelopRes<FindIdRes>> findId(@ApiIgnore @RequestHeader("Authorization") String accessToken){

        log.debug("Member Controller: test() method called.........");

        String email = jwtProvider.extractEmail(accessToken);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<FindIdRes>builder()
                        .data(memberService.findId(email))
                        .build());
    }

    @PostMapping("/checkEmail")
    public ResponseEntity<EnvelopRes> checkEmail(@Valid @RequestBody CheckEmailReq checkEmailReq){

        log.debug("Member Controller: checkEmail() method called.........");

        memberService.sendCodeToEmail(checkEmailReq.getEmail());

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.builder()
                        .build());
    }

    @PostMapping("/checkCode")
    public ResponseEntity<EnvelopRes> checkCode(@Valid @RequestBody CheckCodeReq checkCodeReq){

        log.debug("Member Controller: checkCode() method called.........");

        memberService.checkCode(checkCodeReq);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.builder()
                        .build());
    }

    @GetMapping("")
    public ResponseEntity<EnvelopRes<MyInfoRes>> myInfo(@ApiIgnore @RequestHeader("Authorization") String accessToken){

        log.debug("Member Controller: myInfo() method called.........");

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<MyInfoRes>builder()
                        .data(memberService.findMyInfo(accessToken))
                        .build());
    }

    @PutMapping("")
    public ResponseEntity<EnvelopRes> modifyMyInfo(@ApiIgnore @RequestHeader("Authorization") String accessToken,
                                                   @Valid @RequestBody ModifyMemberReq modifyMemberReq){

        log.debug("Member Controller: modifyMyInfo() method called.........");

        memberService.modifyMember(accessToken, modifyMemberReq);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.builder()
                        .build());
    }

    @DeleteMapping("")
    public ResponseEntity<EnvelopRes> deleteMember(@ApiIgnore @RequestHeader("Authorization") String accessToken){

        log.debug("Member Controller: deleteMember() method called.........");

        memberService.deleteMember(accessToken);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.builder()
                        .build());
    }

}
