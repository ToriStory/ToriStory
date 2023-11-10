package com.challenge.domain.quest.repository;

import com.challenge.domain.quest.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuestRepository extends JpaRepository<Quest, BigInteger> {

    List<Quest> findAllByMemberId(Long memberId);

    boolean existsByMemberIdAndCompFlagAndRewardFlag(Long memberId, boolean compFlag, boolean rewardFlag);

    Optional<Quest> findByMemberIdAndQuestNo(Long memberId, byte questNo);

}
