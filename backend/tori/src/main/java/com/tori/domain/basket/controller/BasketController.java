package com.tori.domain.basket.controller;

import com.tori.domain.basket.dto.response.FindLetterRes;
import com.tori.domain.basket.service.BasketService;
import com.tori.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/basket")
public class BasketController {

    private final BasketService basketService;

    @GetMapping
    public ResponseEntity<EnvelopRes<Byte>> checkBasket(@RequestHeader("memberId") Long memberId) {
        byte response = basketService.findBasket(memberId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<Byte>builder()
                        .data(response)
                        .build());
    }

    @PostMapping("/feed")
    public ResponseEntity<EnvelopRes> feed(@RequestHeader("memberId") Long memberId) {
        basketService.feed(memberId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(EnvelopRes.builder()
                        .code(201)
                        .build());
    }

    @GetMapping("/letter")
    public ResponseEntity<EnvelopRes<FindLetterRes>> findLetter(@RequestHeader("memberId") Long memberId) {
        FindLetterRes findLetterRes = basketService.findLetter(memberId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<FindLetterRes>builder()
                        .data(findLetterRes).build());
    }

}
