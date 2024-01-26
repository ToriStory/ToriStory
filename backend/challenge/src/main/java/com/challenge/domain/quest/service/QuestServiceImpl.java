package com.challenge.domain.quest.service;

import com.challenge.domain.asset.entity.MemberAsset;
import com.challenge.domain.asset.repository.AssetRepository;
import com.challenge.domain.asset.repository.MemberAssetRepository;
import com.challenge.domain.challenge.repository.CustomEntryRepository;
import com.challenge.domain.quest.dto.response.FindQuestDto;
import com.challenge.domain.quest.dto.response.FindRewardRes;
import com.challenge.domain.quest.dto.response.FindTotalQuestDto;
import com.challenge.domain.quest.entity.Quest;
import com.challenge.domain.quest.model.QuestEnum;
import com.challenge.domain.quest.repository.QuestRepository;
import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
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

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public List<FindQuestDto> findAllQuest(Long memberId) {
        // member_id로 quest 조회
        List<Quest> questList = questRepository.findAllByMemberId(memberId);

        // 생성된 것이 없으면 생성
        if (questList.isEmpty()) {
            createQuest(memberId);
            questList = questRepository.findAllByMemberId(memberId);
        }

        // Dto에 담기
        List<FindQuestDto> findQuestDtoList = new ArrayList<>();
        for (Quest quest : questList) {
            findQuestDtoList.add(FindQuestDto.builder()
                    .questNo(quest.getQuestNo())
                    .questTitle(QuestEnum.findByQuestId(quest.getQuestNo()).getQuestTitle())
                    .compFlag(quest.isCompFlag())
                    .compCnt(quest.getQuestNo() == 3 ? customEntryRepository.countByMemberIdAndCompDt(memberId, LocalDate.now()) : -1)
                    .rewardFlag(quest.isRewardFlag())
                    .build()
            );
        }

        return findQuestDtoList;
    }

    @Override
    public FindRewardRes checkReward(Long memberId) {
        boolean unclaimedRewards = questRepository.existsByMemberIdAndCompFlagIsTrueAndRewardFlagIsFalse(memberId);

        // 받지 않은 보상이 없고 모든 퀘스트를 완료했을 때
        if (!unclaimedRewards && questRepository.countByMemberIdAndCompFlagIsTrue(memberId) == questRepository.countByMemberId(memberId)) {
            // 전체 퀘스트 보상도 받았는지 확인
            if (redisTemplate.hasKey("TotalReward:" + memberId)) {
                if (!redisTemplate.opsForValue().get("TotalReward:" + memberId).equals(LocalDate.now().toString())) {
                    unclaimedRewards = true;
                }
            }
        }

        return FindRewardRes.builder()
                .unclaimedRewards(unclaimedRewards)
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

    @Override
    public int findCompCnt(Long memberId) {
        return questRepository.countByMemberIdAndCompFlagIsTrue(memberId);
    }

    @Override
    public void receiveTotalReward(Long memberId) {
        // 퀘스트 전체 달성 여부 확인
        if (findCompCnt(memberId) != questRepository.countByMemberId(memberId))
            throw new ChallengeException(ErrorCode.QUEST_NOT_COMPLETE);

        // 오늘 이미 퀘스트 전체 달성 보상 받았는지 확인
        if (redisTemplate.hasKey("TotalReward:" + memberId)) {
            if (redisTemplate.opsForValue().get("TotalReward:" + memberId).equals(LocalDate.now().toString())) {
                throw new ChallengeException(ErrorCode.REWARD_ALREADY_RECEIVED);
            }
        }

        // 토토리 티켓 1장 지급
        memberAssetRepository.findByMemberIdAndAsset(memberId, assetRepository.findByAssetNm("TOTORI_TICKET")
                        .orElseThrow(() -> new ChallengeException(ErrorCode.ASSET_NOT_FOUND)))
                .orElseThrow(() -> new ChallengeException(ErrorCode.MEMBER_ASSET_NOT_FOUND))
                .plus(1);

        // Redis에 보상 여부 업데이트
        redisTemplate.opsForValue().set("TotalReward:" + memberId, LocalDate.now().toString());
    }

    @Override
    public FindTotalQuestDto findTotalQuest(Long memberId) {
        boolean compFlag = questRepository.countByMemberIdAndCompFlagIsTrue(memberId) == questRepository.countByMemberId(memberId);
        boolean rewardFlag = false;

        if (redisTemplate.hasKey("TotalReward:" + memberId)) {
            rewardFlag = redisTemplate.opsForValue().get("TotalReward:" + memberId).equals(LocalDate.now().toString());
        }

        return FindTotalQuestDto.builder()
                .compFlag(compFlag)
                .rewardFlag(rewardFlag)
                .build();
    }

    private void createQuest(Long memberId) {
        for (int i = 1; i <= 5; i++) {
            questRepository.save(Quest.builder()
                    .memberId(memberId)
                    .questNo((byte) i)
                    .build());
        }
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void resetQuest() {
        questRepository.setCompFlagAndRewardFlagFalse();
        redisTemplate.delete("TotalReward:*");
    }

}
