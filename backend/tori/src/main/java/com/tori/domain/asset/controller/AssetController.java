package com.tori.domain.asset.controller;

import com.tori.domain.asset.dto.response.FindAssetRes;
import com.tori.domain.asset.service.AssetService;
import com.tori.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/asset")
public class AssetController {

    private final AssetService assetService;

    @GetMapping
    public ResponseEntity<EnvelopRes<List<FindAssetRes>>> findAssetCnt(@RequestHeader("memberId") Long memberId) {
        List<FindAssetRes> findAssetResList = assetService.findAssetCnt(memberId);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(EnvelopRes.<List<FindAssetRes>>builder()
                .data(findAssetResList)
                .build());
    }

}
