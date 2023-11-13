package com.challenge.domain.quest.service;

import com.challenge.domain.asset.entity.MemberAsset;
import com.challenge.domain.asset.repository.AssetRepository;
import com.challenge.domain.asset.repository.MemberAssetRepository;
import com.challenge.domain.challenge.repository.CustomEntryRepository;
import com.challenge.domain.quest.dto.response.FindQuestRes;
import com.challenge.domain.quest.dto.response.FindRewardRes;
import com.challenge.domain.quest.entity.Quest;
import com.challenge.domain.quest.model.QuestEnum;
import com.challenge.domain.quest.repository.QuestRepository;
import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class QuestServiceImpl implements QuestService {

    private final QuestRepository questRepository;
    private final CustomEntryRepository customEntryRepository;
    private final MemberAssetRepository memberAssetRepository;
    private final AssetRepository assetRepository;

    private final static int REWARD_ACORN = 2;

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
                    .compCnt(quest.getQuestNo() == 3 ? customEntryRepository.countByMemberIdAndCompDt(memberId, LocalDate.now()) : -1)
                    .rewardFlag(quest.isRewardFlag())
                    .build()
            );
        }

        return findQuestResList;
    }

    @Override
    public FindRewardRes checkReward(Long memberId) {
        return FindRewardRes.builder()
                .unclaimedRewards(questRepository.existsByMemberIdAndCompFlagAndRewardFlag(memberId, true, false))
                .build();
    }

    @Override
    public void receiveReward(Long memberId, byte questNo) {

        Quest quest = questRepository.findByMemberIdAndQuestNo(memberId, questNo)
                .orElseThrow(() -> new ChallengeException(ErrorCode.QUEST_NOT_FOUND));

        // 퀘스트 미달성
        if (!quest.isCompFlag()) {
            throw new ChallengeException(ErrorCode.QUEST_NOT_COMPLETE);
        }

        // 이미 수령한 보상
        if (quest.isRewardFlag()) {
            throw new ChallengeException(ErrorCode.REWARD_ALREADY_RECEIVED);
        }

        quest.setRewardFlag(true);

        // 보상 지급
        MemberAsset memberAsset = memberAssetRepository.findByMemberIdAndAsset(memberId, assetRepository.findByAssetNm("DOTORI")
                        .orElseThrow(() -> new ChallengeException(ErrorCode.ASSET_NOT_FOUND)))
                .orElseThrow(() -> new ChallengeException(ErrorCode.MEMBER_ASSET_NOT_FOUND));
        memberAsset.plus(REWARD_ACORN);
    }

    private void createQuest(Long memberId) {

        for (int i = 1; i <= 5; i++) {
            questRepository.save(Quest.builder()
                    .memberId(memberId)
                    .questNo((byte) i)
                    .build());
        }

    }

    @Scheduled(cron = "0 0 0 * * *")
    public void resetQuest(){
        questRepository.setCompFlagAndRewardFlagFalse();
    }

}
