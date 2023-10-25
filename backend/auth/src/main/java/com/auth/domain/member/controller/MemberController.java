package com.auth.domain.member.controller;

import com.auth.domain.member.dto.request.JoinReq;
import com.auth.domain.member.service.MemberService;
import com.auth.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
