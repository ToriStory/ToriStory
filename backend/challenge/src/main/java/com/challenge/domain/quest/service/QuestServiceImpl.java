package com.challenge.domain.quest.service;

import com.challenge.domain.quest.dto.response.FindQuestRes;
import com.challenge.domain.quest.entity.Quest;
import com.challenge.domain.quest.model.QuestEnum;
import com.challenge.domain.quest.repository.QuestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class QuestServiceImpl implements QuestService {

    private final QuestRepository questRepository;

    @Override
    public List<FindQuestRes> findTotalQuest(Long memberId) {

        // member_id로 quest 조회
        List<Quest> questList = questRepository.findAllByMemberId(memberId);

        // 생성된 것이 없으면 생성
        if (questList.isEmpty()) {
            createQuest(memberId);
            questList = questRepository.findAllByMemberId(memberId);
        }

        // Dto에 담기
        List<FindQuestRes> findQuestResList = new ArrayList<>();
        for (Quest quest : questList) {
            findQuestResList.add(FindQuestRes.builder()
                    .questNo(quest.getQuestNo())
                    .questTitle(QuestEnum.findByQuestId(quest.getQuestNo()).getQuestTitle())
                    .compFlag(quest.isCompFlag())
                    .rewardFlag(quest.isRewardFlag())
                    .build()
            );
        }

        return findQuestResList;
    }

    private void createQuest(Long memberId) {

        for (int i = 1; i <= 5; i++) {
            questRepository.save(Quest.builder()
                    .memberId(memberId)
                    .questNo((byte) i)
                    .compFlag(false)
                    .rewardFlag(false)
                    .build());
        }

    }
}