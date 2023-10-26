package com.auth.domain.member.controller;

import com.auth.domain.member.dto.request.JoinReq;
import com.auth.domain.member.dto.request.LoginReq;
import com.auth.domain.member.dto.response.FindIdRes;
import com.auth.domain.member.dto.response.LoginRes;
import com.auth.domain.member.service.MemberService;
import com.auth.global.jwt.JwtProvider;
import com.auth.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    @PostMapping("/join")
    public EnvelopRes join(@Valid @RequestBody JoinReq joinReq) {

        log.debug("Member Controller: join() method called.........");

        memberService.join(joinReq);

        return EnvelopRes.builder()
                .code(201)
                .build();

    }

    @PostMapping("/login")
    public EnvelopRes<LoginRes> login(@Valid @RequestBody LoginReq loginReq) {

        log.debug("Member Controller: login() method called.........");

        return EnvelopRes.<LoginRes>builder()
                .data(memberService.login(loginReq))
                .build();
    }

    @PostMapping("/logout")
    public EnvelopRes logout(@ApiIgnore @RequestHeader("Authorization") String accessToken) {

        log.debug("Member Controller: logout() method called.........");

        memberService.logout(accessToken);

        return EnvelopRes.builder()
                .code(200)
                .build();
    }

    @PostMapping("/id")
    public EnvelopRes<FindIdRes> findId(@ApiIgnore @RequestHeader("Authorization") String accessToken){

        log.debug("Member Controller: test() method called.........");

        String email = jwtProvider.extractEmail(accessToken);

        return EnvelopRes.<FindIdRes>builder()
                .data(memberService.findId(email))
                .build();
    }

}
