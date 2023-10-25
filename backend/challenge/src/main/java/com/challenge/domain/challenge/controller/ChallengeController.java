package com.challenge.domain.challenge.controller;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.response.FindCustomRes;
import com.challenge.domain.challenge.dto.request.AddScrapCustomReq;
import com.challenge.domain.challenge.dto.response.FindRandomRes;
import com.challenge.domain.challenge.dto.response.FindTotalChallengeRes;
import com.challenge.domain.challenge.service.CustomChallengeService;
import com.challenge.domain.challenge.service.RandomChallengeService;
import com.challenge.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping()
public class ChallengeController {

    private final RandomChallengeService randomChallengeService;
    private final CustomChallengeService customChallengeService;

    @GetMapping
    public EnvelopRes<FindTotalChallengeRes> findTotalChallenge(@RequestHeader("Authorization") String accessToken) {
        FindRandomRes randomRes = randomChallengeService.findRandomChallenge(accessToken);
        List<FindCustomRes> customResList = customChallengeService.findMyCustomChallenge(accessToken);

        FindTotalChallengeRes response = FindTotalChallengeRes.builder()
                .randomRes(randomRes)
                .customResList(customResList)
                .build();

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
    public EnvelopRes addCustom(@RequestHeader("Authorization") String accessToken, @RequestBody @Valid AddCustomReq addCustomReq) {

        customChallengeService.addCustom(accessToken, addCustomReq);

        return EnvelopRes.builder().code(201).build();
    }

    @PostMapping("/scrap/{customChallengeId}")
    public EnvelopRes addScrapCustom(@RequestHeader("Authorization") String accessToken, @PathVariable BigInteger customChallengeId, @RequestBody AddScrapCustomReq addScrapCustomReq) {

        customChallengeService.addScrapCustom(accessToken, customChallengeId, addScrapCustomReq);

        return EnvelopRes.builder().code(201).build();
    }

    @GetMapping("/custom")
    public EnvelopRes<List<FindCustomRes>> findMyCustomChallenge(@RequestHeader("Authorization") String accessToken) {

        return EnvelopRes.<List<FindCustomRes>>builder()
                .code(200)
                .data(customChallengeService.findMyCustomChallenge(accessToken))
                .build();
    }

    @PatchMapping("/comp/{customEntryId}")
    public EnvelopRes completeCustomChallenge(@RequestHeader("Authorization") String accessToken, @PathVariable BigInteger customEntryId) {

        customChallengeService.modifyCustomCompFlag(accessToken, customEntryId);

        return EnvelopRes.builder().build();
    }

    @DeleteMapping("/custom/{customEntryId}")
    public EnvelopRes removeCustom(@RequestHeader("Authorization") String accessToken, @PathVariable BigInteger customEntryId) {

        customChallengeService.removeCustom(accessToken, customEntryId);

        return EnvelopRes.builder().build();
    }

}
