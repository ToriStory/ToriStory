package com.auth.domain.member.controller;

import com.auth.domain.member.dto.request.JoinReq;
import com.auth.domain.member.dto.request.LoginReq;
import com.auth.domain.member.dto.response.LoginRes;
import com.auth.domain.member.service.MemberService;
import com.auth.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public EnvelopRes join(@RequestBody JoinReq joinReq) {

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

}
