package com.challenge.domain.challenge.controller;

import javax.validation.Valid;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.service.CustomChallengeService;
import com.challenge.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping
@RequiredArgsConstructor
public class CustomController {

    private final CustomChallengeService customService;

    @PostMapping("/custom")
    public EnvelopRes addCustom(@RequestBody @Valid AddCustomReq addCustomReq) {

        customService.addCustom(addCustomReq);

        return EnvelopRes.builder().code(201).build();
    }

}
