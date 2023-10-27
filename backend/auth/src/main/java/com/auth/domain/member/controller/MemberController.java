package com.auth.domain.member.controller;

import com.auth.domain.member.dto.request.CheckEmailReq;
import com.auth.domain.member.dto.request.JoinReq;
import com.auth.domain.member.dto.request.LoginReq;
import com.auth.domain.member.dto.response.FindIdRes;
import com.auth.domain.member.dto.response.LoginRes;
import com.auth.domain.member.service.MemberService;
import com.auth.global.jwt.JwtProvider;
import com.auth.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<EnvelopRes> join(@Valid @RequestBody JoinReq joinReq) {

        log.debug("Member Controller: join() method called.........");

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
                .body(EnvelopRes.<LoginRes>builder()
                        .code(200)
                        .data(memberService.login(loginReq))
                        .build());
    }

    @PostMapping("/logout")
    public ResponseEntity<EnvelopRes> logout(@ApiIgnore @RequestHeader("Authorization") String accessToken) {

        log.debug("Member Controller: logout() method called.........");

        memberService.logout(accessToken);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.builder()
                        .code(200)
                        .build());
    }

    @PostMapping("/id")
    public ResponseEntity<EnvelopRes<FindIdRes>> findId(@ApiIgnore @RequestHeader("Authorization") String accessToken){

        log.debug("Member Controller: test() method called.........");

        String email = jwtProvider.extractEmail(accessToken);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<FindIdRes>builder()
                        .code(200)
                        .data(memberService.findId(email))
                        .build());
    }

    @PostMapping("/checkEmail")
    public ResponseEntity<EnvelopRes> checkEmail(@RequestBody CheckEmailReq checkEmailReq){

        log.debug("Member Controller: checkEmail() method called.........");

        memberService.checkEmail(checkEmailReq.getEmail());

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.builder()
                        .code(200)
                        .build());
    }

}
