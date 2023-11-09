package com.challenge.domain.quest.repository;

import com.challenge.domain.quest.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, BigInteger> {

    List<Quest> findAllByMemberId(Long memberId);

}
