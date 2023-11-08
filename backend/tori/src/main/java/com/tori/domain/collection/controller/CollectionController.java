package com.tori.domain.collection.controller;

import com.tori.domain.collection.dto.response.FindCollectionRes;
import com.tori.domain.collection.service.CollectionService;
import com.tori.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/collection")
public class CollectionController {

    private final CollectionService collectionService;

    @GetMapping
    public ResponseEntity<EnvelopRes<List<FindCollectionRes>>> findCollection(@RequestHeader(value = "memberId", required = false) Long memberId) {
        List<FindCollectionRes> collectionResList = collectionService.findCollection(memberId);

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<FindCollectionRes>>builder()
                .data(collectionResList)
                .build());
    }

    @PostMapping("/{toriId}")
    public ResponseEntity<EnvelopRes> adoptTori(@RequestHeader("memberId") Long memberId, @PathVariable Byte toriId) {

        collectionService.addTori(memberId, toriId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(EnvelopRes.builder().build());
    }

}
