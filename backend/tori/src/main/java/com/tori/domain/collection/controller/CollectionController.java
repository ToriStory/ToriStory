package com.tori.domain.collection.controller;

import com.tori.domain.collection.dto.response.FindCollectionRes;
import com.tori.domain.collection.service.CollectionService;
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

}
