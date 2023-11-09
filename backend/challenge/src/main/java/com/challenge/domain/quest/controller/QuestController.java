package com.challenge.domain.quest.controller;

import com.challenge.domain.quest.dto.response.FindQuestRes;
import com.challenge.domain.quest.service.QuestService;
import com.challenge.global.response.EnvelopRes;
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
@RequestMapping("/quest")
public class QuestController {

    private final QuestService questService;

    @GetMapping
    public ResponseEntity<EnvelopRes<List<FindQuestRes>>> findTotalQuest(@RequestHeader("memberId") Long memberId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<List<FindQuestRes>>builder()
                        .data(questService.findTotalQuest(memberId))
                        .build());
    }

}
