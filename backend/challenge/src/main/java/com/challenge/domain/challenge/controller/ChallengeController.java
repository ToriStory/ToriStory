package com.challenge.domain.challenge.controller;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.request.AddReportReq;
import com.challenge.domain.challenge.dto.response.AddAttendRes;
import com.challenge.domain.challenge.dto.response.FindCertRes;
import com.challenge.domain.challenge.dto.response.FindCommonCompRes;
import com.challenge.domain.challenge.dto.response.FindCommonEntryRes;
import com.challenge.domain.challenge.dto.response.FindCommonRes;
import com.challenge.domain.challenge.dto.response.FindCustomRes;
import com.challenge.domain.challenge.dto.request.AddScrapCustomReq;
import com.challenge.domain.challenge.dto.response.FindMemoryRes;
import com.challenge.domain.challenge.dto.request.FindCustomSearchReq;
import com.challenge.domain.challenge.dto.response.FindRandomRes;
import com.challenge.domain.challenge.dto.response.FindTotalChallengeRes;
import com.challenge.domain.challenge.dto.response.FindTotalCustomRes;
import com.challenge.domain.challenge.service.CommonChallengeService;
import com.challenge.domain.challenge.service.CustomChallengeService;
import com.challenge.domain.challenge.service.RandomChallengeService;
import com.challenge.global.response.EnvelopRes;

import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping()
public class ChallengeController {

    private final RandomChallengeService randomChallengeService;
    private final CustomChallengeService customChallengeService;
    private final CommonChallengeService commonChallengeService;

    @GetMapping
    public ResponseEntity<EnvelopRes<FindTotalChallengeRes>> findTotalChallenge(@RequestHeader("memberId") Long memberId) {
        FindRandomRes randomRes = randomChallengeService.findRandomChallenge(memberId);
        List<FindCustomRes> customResList = customChallengeService.findMyCustomChallenge(memberId);

        FindTotalChallengeRes response = FindTotalChallengeRes.builder()
                .randomRes(randomRes)
                .customResList(customResList)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindTotalChallengeRes>builder()
                .data(response)
                .build());
    }

    @GetMapping("/random")
    public ResponseEntity<EnvelopRes<FindRandomRes>> findRandomChallenge(@RequestHeader("memberId") Long memberId) {
        FindRandomRes response = randomChallengeService.findRandomChallenge(memberId);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindRandomRes>builder()
                .data(response)
                .build());
    }

    @PatchMapping("/renewal")
    public ResponseEntity<EnvelopRes<FindRandomRes>> renewalRandomChallenge(@RequestHeader("memberId") Long memberId) {
        FindRandomRes response = randomChallengeService.modifyRandomId(memberId);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindRandomRes>builder()
                .data(response)
                .build());
    }

    @PatchMapping("/comp")
    public ResponseEntity<EnvelopRes> completeRandomChallenge(@RequestHeader("memberId") Long memberId) {
        randomChallengeService.modifyRandomCompFlag(memberId);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }

    @PostMapping("/custom")
    public ResponseEntity<EnvelopRes> addCustom(@RequestHeader("memberId") Long memberId, @RequestBody @Valid AddCustomReq addCustomReq) {

        customChallengeService.addCustom(memberId, addCustomReq);

        return ResponseEntity.status(HttpStatus.CREATED).body(EnvelopRes.builder().code(201).build());
    }

    @PostMapping("/scrap/{customChallengeId}")
    public ResponseEntity<EnvelopRes> addScrapCustom(@RequestHeader("memberId") Long memberId, @PathVariable BigInteger customChallengeId, @RequestBody AddScrapCustomReq addScrapCustomReq) {

        customChallengeService.addScrapCustom(memberId, customChallengeId, addScrapCustomReq);

        return ResponseEntity.status(HttpStatus.CREATED).body(EnvelopRes.builder().code(201).build());
    }

    @GetMapping("/custom")
    public ResponseEntity<EnvelopRes<List<LocalDate>>> findMyCustomChallenge(@RequestHeader("memberId") Long memberId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate date) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<LocalDate>>builder()
            .data(customChallengeService.findMyMonthCustomChallenge(memberId, date))
            .build());
    }

    @GetMapping("/custom/detail")
    public ResponseEntity<EnvelopRes<List<FindCustomRes>>> findMyCompCustomChallenge(@RequestHeader("memberId") Long memberId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate date) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<FindCustomRes>>builder()
                .data(customChallengeService.findMyCompCustomChallenge(memberId, date))
                .build());
    }

    @GetMapping("/custom/all")
    public ResponseEntity<EnvelopRes<FindTotalCustomRes>> findAllCustomChallenge(@Valid FindCustomSearchReq findCustomSearchReq) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindTotalCustomRes>builder()
                .data(customChallengeService.findAllCustomChallenge(findCustomSearchReq))
                .build());
    }

    @GetMapping("/custom/my")
    public ResponseEntity<EnvelopRes<List<FindCustomRes>>> findMyTodayCustomChallenge(@RequestHeader("memberId") Long memberId) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<FindCustomRes>>builder()
            .data(customChallengeService.findMyTodayCustomChallenge(memberId))
            .build());
    }

    @PatchMapping("/comp/{customEntryId}")
    public ResponseEntity<EnvelopRes> completeCustomChallenge(@RequestHeader("memberId") Long memberId, @PathVariable BigInteger customEntryId) {

        customChallengeService.modifyCustomCompFlag(memberId, customEntryId);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }

    @DeleteMapping("/custom/{customEntryId}")
    public ResponseEntity<EnvelopRes> removeCustom(@RequestHeader("memberId") Long memberId, @PathVariable BigInteger customEntryId) {

        customChallengeService.removeCustom(memberId, customEntryId);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }

    @GetMapping("/memory")
    public ResponseEntity<EnvelopRes<List<FindMemoryRes>>> findMemoryCustom(@ApiIgnore @RequestHeader("memberId") Long memberId) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<FindMemoryRes>>builder()
                .data(customChallengeService.findMemoryCustom(memberId))
                .build());
    }

    @PatchMapping("/memory/{customEntryId}")
    public ResponseEntity<EnvelopRes> modifyCustomImage(@RequestHeader("memberId") Long memberId, @PathVariable BigInteger customEntryId, @RequestPart(required = false) MultipartFile image) {

        customChallengeService.modifyCustomImage(memberId, customEntryId, image);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }

    @PostMapping(value = "/cert/random/ai")
    public ResponseEntity<EnvelopRes<FindCertRes>> certAIChallenge(@RequestHeader("memberId") Long memberId, @RequestParam BigInteger challengeId, @RequestParam MultipartFile image) {

        return ResponseEntity.status(HttpStatus.OK).body(
            EnvelopRes.<FindCertRes>builder()
                .data(
                    FindCertRes.builder()
                        .result(randomChallengeService.findRandomCertAi(memberId, challengeId, image))
                        .build()
                ).build());
    }

    @PostMapping("/report")
    public ResponseEntity<EnvelopRes> reportChallenge(@RequestHeader("memberId") Long memberId, @RequestBody
        AddReportReq addReportReq) {

        customChallengeService.addReportCustom(memberId, addReportReq);

        return ResponseEntity.status(HttpStatus.CREATED).body(
            EnvelopRes.builder()
                .code(201)
                .build()
        );
    }

    @GetMapping("/common")
    public ResponseEntity<EnvelopRes<FindCommonRes>> findCommonChallenge(@RequestHeader("memberId") Long memberId) {

        return ResponseEntity.status(HttpStatus.OK).body(
            EnvelopRes.<FindCommonRes>builder()
                .data(commonChallengeService.findCommonChallenge(memberId))
                .build()
        );
    }

    @PostMapping("/common/attend")
    public ResponseEntity<EnvelopRes<AddAttendRes>> addCommonAttend(@RequestHeader("memberId") Long memberId) {

        return ResponseEntity.status(HttpStatus.CREATED).body(
            EnvelopRes.<AddAttendRes>builder()
                .code(201)
                .data(commonChallengeService.addCommonAttend(memberId))
                .build()
        );
    }

    @PatchMapping("/common/comp/{commonChallengeId}")
    public ResponseEntity<EnvelopRes<FindCommonCompRes>> modifyCommonComp(@RequestHeader("memberId") Long memberId, @PathVariable BigInteger commonChallengeId) {

        return ResponseEntity.status(HttpStatus.OK).body(
            EnvelopRes.<FindCommonCompRes>builder()
                .data(commonChallengeService.modifyCommonCompFlag(memberId, commonChallengeId))
                .build()
        );
    }

    @PatchMapping("/common/review/{commonChallengeId}")
    public ResponseEntity<EnvelopRes> modifyCommonImage(@RequestHeader("memberId") Long memberId, @PathVariable BigInteger commonChallengeId, @RequestPart MultipartFile image) {

        commonChallengeService.modifyCommonImage(memberId, commonChallengeId, image);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.builder().build());
    }

    @GetMapping("/common/{commonChallengeId}")
    public ResponseEntity<EnvelopRes<FindCommonEntryRes>> findCommonEntryChallenge(@RequestHeader("memberId") Long memberId, @PathVariable BigInteger commonChallengeId) {

        return ResponseEntity.status(HttpStatus.OK).body(
            EnvelopRes.<FindCommonEntryRes>builder()
                .data(commonChallengeService.findCommonEntryChallenge(memberId, commonChallengeId))
                .build()
        );
    }

}
