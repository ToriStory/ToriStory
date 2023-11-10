package com.challenge.domain.quest.controller;

import com.challenge.domain.quest.dto.response.FindQuestRes;
import com.challenge.domain.quest.dto.response.FindRewardRes;
import com.challenge.domain.quest.service.QuestService;
import com.challenge.global.response.EnvelopRes;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/quest")
public class QuestController {

    private final QuestService questService;

    @GetMapping
    @ApiOperation(value = "내 퀘스트 전체 조회", notes = "내 퀘스트 전체 조회")
    public ResponseEntity<EnvelopRes<List<FindQuestRes>>> findTotalQuest(@RequestHeader("memberId") Long memberId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<List<FindQuestRes>>builder()
                        .data(questService.findTotalQuest(memberId))
                        .build());
    }

    @GetMapping("/rewards")
    @ApiOperation(value = "수령할 보상 여부 확인", notes = "수령할 보상 여부 확인")
    public ResponseEntity<EnvelopRes<FindRewardRes>> findReward(@RequestHeader("memberId") Long memberId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.<FindRewardRes>builder()
                        .data(questService.checkReward(memberId))
                        .build());
    }

    @PostMapping("/rewards/{questNo}")
    @ApiOperation(value = "보상 수령", notes = "보상 수령")
    public ResponseEntity<EnvelopRes> receiveReward(@RequestHeader("memberId") Long memberId,
                                                            @PathVariable("questNo") byte questNo) {
        questService.receiveReward(memberId, questNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(EnvelopRes.builder()
                        .build());
    }

}
