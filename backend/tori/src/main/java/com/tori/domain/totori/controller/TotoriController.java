package com.tori.domain.totori.controller;

import com.tori.domain.totori.dto.response.TotoriResponse;
import com.tori.domain.totori.service.TotoriService;
import com.tori.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/totori")
public class TotoriController {

    private final TotoriService totoriService;

    @PostMapping
    public ResponseEntity<EnvelopRes<TotoriResponse<?>>> totori(@RequestHeader("memberId") Long memberId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<TotoriResponse<?>>builder()
                        .data(totoriService.totori(memberId))
                        .build());
    }

}
