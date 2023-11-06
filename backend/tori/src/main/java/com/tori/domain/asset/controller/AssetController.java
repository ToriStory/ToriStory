package com.tori.domain.asset.controller;

import com.tori.domain.asset.service.AssetService;
import com.tori.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/asset")
public class AssetController {

    private final AssetService assetService;

    @GetMapping("/dotori")
    public ResponseEntity<EnvelopRes<Integer>> findDotoriCnt(@RequestHeader("memberId") Long memberId) {
        int dotoriCnt = assetService.findDotoriCnt(memberId);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(EnvelopRes.<Integer>builder()
                .data(dotoriCnt)
                .build());
    }

}
