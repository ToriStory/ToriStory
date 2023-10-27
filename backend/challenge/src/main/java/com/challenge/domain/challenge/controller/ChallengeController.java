package com.challenge.domain.challenge.controller;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.response.FindCustomRes;
import com.challenge.domain.challenge.dto.request.AddScrapCustomReq;
import com.challenge.domain.challenge.dto.response.FindMemoryRes;
import com.challenge.domain.challenge.dto.request.FindCustomSearchReq;
import com.challenge.domain.challenge.dto.response.FindRandomRes;
import com.challenge.domain.challenge.dto.response.FindTotalChallengeRes;
import com.challenge.domain.challenge.dto.response.FindTotalCustomRes;
import com.challenge.domain.challenge.service.CustomChallengeService;
import com.challenge.domain.challenge.service.RandomChallengeService;
import com.challenge.global.response.EnvelopRes;

import feign.Response;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<EnvelopRes<FindTotalChallengeRes>> findTotalChallenge(@RequestHeader("Authorization") String accessToken, @RequestHeader("userId") Long memberId) {
        FindRandomRes randomRes = randomChallengeService.findRandomChallenge(memberId);
        List<FindCustomRes> customResList = customChallengeService.findMyCustomChallenge(accessToken);

        FindTotalChallengeRes response = FindTotalChallengeRes.builder()
                .randomRes(randomRes)
                .customResList(customResList)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindTotalChallengeRes>builder()
                .data(response)
                .build());
    }

    @GetMapping("/random")
    public ResponseEntity<EnvelopRes<FindRandomRes>> findRandomChallenge(@RequestHeader("Authorization") String accessToken) {
        FindRandomRes response = randomChallengeService.findRandomChallenge(accessToken);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindRandomRes>builder()
                .data(response)
                .build());
    }

    @PatchMapping("/renewal")
    public ResponseEntity<EnvelopRes<FindRandomRes>> renewalRandomChallenge(@RequestHeader("Authorization") String accessToken) {
        FindRandomRes response = randomChallengeService.modifyRandomId(accessToken);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindRandomRes>builder()
                .data(response)
                .build());
    }

    @PatchMapping("/comp")
    public ResponseEntity<EnvelopRes> completeRandomChallenge(@RequestHeader("Authorization") String accessToken) {
        randomChallengeService.modifyRandomCompFlag(accessToken);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }

    @PostMapping("/custom")
    public ResponseEntity<EnvelopRes> addCustom(@RequestHeader("Authorization") String accessToken, @RequestBody @Valid AddCustomReq addCustomReq) {

        customChallengeService.addCustom(accessToken, addCustomReq);

        return ResponseEntity.status(HttpStatus.CREATED).body(EnvelopRes.builder().code(201).build());
    }

    @PostMapping("/scrap/{customChallengeId}")
    public ResponseEntity<EnvelopRes> addScrapCustom(@RequestHeader("Authorization") String accessToken, @PathVariable BigInteger customChallengeId, @RequestBody AddScrapCustomReq addScrapCustomReq) {

        customChallengeService.addScrapCustom(accessToken, customChallengeId, addScrapCustomReq);

        return ResponseEntity.status(HttpStatus.CREATED).body(EnvelopRes.builder().code(201).build());
    }

    @GetMapping("/custom")
    public ResponseEntity<EnvelopRes<List<FindCustomRes>>> findMyCustomChallenge(@RequestHeader("Authorization") String accessToken) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<FindCustomRes>>builder()
                .data(customChallengeService.findMyCustomChallenge(accessToken))
                .build());
    }

    @GetMapping("/custom/all")
    public ResponseEntity<EnvelopRes<FindTotalCustomRes>> findAllCustomChallenge(@Valid FindCustomSearchReq findCustomSearchReq) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindTotalCustomRes>builder()
                .data(customChallengeService.findAllCustomChallenge(findCustomSearchReq))
                .build());
    }

    @GetMapping("/custom/my")
    public ResponseEntity<EnvelopRes<List<FindCustomRes>>> findMyTodayCustomChallenge(@RequestHeader("Authorization") String accessToken) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<FindCustomRes>>builder()
            .data(customChallengeService.findMyTodayCustomChallenge(accessToken))
            .build());
    }

    @PatchMapping("/comp/{customEntryId}")
    public ResponseEntity<EnvelopRes> completeCustomChallenge(@RequestHeader("Authorization") String accessToken, @PathVariable BigInteger customEntryId) {

        customChallengeService.modifyCustomCompFlag(accessToken, customEntryId);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }

    @DeleteMapping("/custom/{customEntryId}")
    public ResponseEntity<EnvelopRes> removeCustom(@RequestHeader("Authorization") String accessToken, @PathVariable BigInteger customEntryId) {

        customChallengeService.removeCustom(accessToken, customEntryId);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }

    @GetMapping("/memory")
    public ResponseEntity<EnvelopRes<List<FindMemoryRes>>> findMemoryCustom(@RequestHeader("Authorization") String accessToken) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<FindMemoryRes>>builder()
                .data(customChallengeService.findMemoryCustom(accessToken))
                .build());
    }

    @PatchMapping("/memory/{customEntryId}")
    public ResponseEntity<EnvelopRes> modifyCustomImage(@RequestHeader("Authorization") String accessToken, @PathVariable BigInteger customEntryId, @RequestPart(required = false) MultipartFile image) {

        customChallengeService.modifyCustomImage(accessToken, customEntryId, image);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }
}
