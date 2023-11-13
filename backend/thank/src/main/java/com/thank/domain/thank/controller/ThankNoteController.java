package com.thank.domain.thank.controller;

import com.thank.domain.thank.dto.request.AddThankNotesReq;
import com.thank.domain.thank.dto.response.FindThankNoteRes;
import com.thank.domain.thank.dto.response.FindThankNoteStatisticsRes;
import com.thank.domain.thank.service.ThankNoteService;
import com.thank.global.response.EnvelopRes;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class ThankNoteController {

    private final ThankNoteService thankNoteService;

    @GetMapping
    public ResponseEntity<EnvelopRes<FindThankNoteStatisticsRes>> findThankNoteStatistics(@RequestHeader("memberId") Long memberId) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindThankNoteStatisticsRes> builder()
                .data(thankNoteService.findThankNoteStatistics(memberId))
                .build());
    }

    @GetMapping("/monthly")
    public ResponseEntity<EnvelopRes<List<LocalDate>>> findMonthlyThankNote(@RequestHeader("memberId") Long memberId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<List<LocalDate>>builder().data(thankNoteService.findMonthlyThankNote(memberId, date)).build());
    }

    @GetMapping("/daily")
    public ResponseEntity<EnvelopRes<FindThankNoteRes>> findDailyThankNote(@RequestHeader("memberId") Long memberId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {

        return ResponseEntity.status(HttpStatus.OK).body(EnvelopRes.<FindThankNoteRes> builder()
                .data(thankNoteService.findDailyThankNote(memberId, date))
                .build());
    }

    @PostMapping
    public ResponseEntity<EnvelopRes> addThankNote(@RequestHeader("memberId") Long memberId, @RequestBody @Valid AddThankNotesReq addThankNotesReq){
        thankNoteService.addThankNotes(memberId, addThankNotesReq);

        return ResponseEntity.status(HttpStatus.CREATED).body(EnvelopRes.builder().code(201).build());
    }

}
