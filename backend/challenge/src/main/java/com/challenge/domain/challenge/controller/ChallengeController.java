package com.challenge.domain.challenge.controller;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.response.FindRandomRes;
import com.challenge.domain.challenge.dto.response.FindTotalChallengeRes;
import com.challenge.domain.challenge.entity.RandomChallenge;
import com.challenge.domain.challenge.service.CustomChallengeService;
import com.challenge.domain.challenge.service.RandomChallengeService;
import com.challenge.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping()
public class ChallengeController {

    private final RandomChallengeService randomChallengeService;
    private final CustomChallengeService customChallengeService;

    @GetMapping
    public EnvelopRes<FindTotalChallengeRes> findTotalChallenge(@RequestHeader("Authorization") String accessToken) {
        FindTotalChallengeRes response = null;

        return EnvelopRes.<FindTotalChallengeRes>builder()
                .data(response)
                .build();
    }

    @GetMapping("/random")
    public EnvelopRes<FindRandomRes> findRandomChallenge(@RequestHeader("Authorization") String accessToken) {
        FindRandomRes response = randomChallengeService.findRandomChallenge(accessToken);

        return EnvelopRes.<FindRandomRes>builder()
                .data(response)
                .build();
    }

    @PatchMapping("/renewal")
    public EnvelopRes<FindRandomRes> renewalRandomChallenge(@RequestHeader("Authorization") String accessToken) {
        FindRandomRes response = randomChallengeService.modifyRandomId(accessToken);

        return EnvelopRes.<FindRandomRes>builder()
                .data(response)
                .build();
    }

    @PatchMapping("/comp")
    public EnvelopRes completeRandomChallenge(@RequestHeader("Authorization") String accessToken) {
        randomChallengeService.modifyRandomCompFlag(accessToken);

        return EnvelopRes.builder().build();
    }

    @PostMapping("/custom")
    public EnvelopRes addCustom(@RequestBody @Valid AddCustomReq addCustomReq) {

        customChallengeService.addCustom(addCustomReq);

        return EnvelopRes.builder().code(201).build();
    }

}
