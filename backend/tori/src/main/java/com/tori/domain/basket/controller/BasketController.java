package com.tori.domain.basket.controller;

import com.tori.domain.basket.service.BasketService;
import com.tori.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/basket")
public class BasketController {

    private final BasketService basketService;

    @PostMapping("/feed")
    public ResponseEntity<EnvelopRes> feed(@RequestHeader("memberId") Long memberId) {
        basketService.feed(memberId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(EnvelopRes.builder().build());
    }

}
