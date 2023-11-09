package com.challenge.domain.quest.service;

import com.challenge.domain.quest.dto.response.FindQuestRes;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestService {

    List<FindQuestRes> findTotalQuest(Long memberId);

}
