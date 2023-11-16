package com.challenge.domain.quest.service;

import com.challenge.domain.quest.dto.response.FindQuestDto;
import com.challenge.domain.quest.dto.response.FindRewardRes;
import com.challenge.domain.quest.dto.response.FindTotalQuestDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestService {

    List<FindQuestDto> findAllQuest(Long memberId);

    FindRewardRes checkReward(Long memberId);

    void receiveReward(Long memberId, byte questNo);

    int findCompCnt(Long memberId);

    void receiveTotalReward(Long memberId);

    FindTotalQuestDto findTotalQuest(Long memberId);

}
