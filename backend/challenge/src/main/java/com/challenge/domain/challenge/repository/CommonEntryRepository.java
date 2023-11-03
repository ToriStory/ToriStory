package com.challenge.domain.challenge.repository;

import java.math.BigInteger;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.challenge.domain.challenge.entity.CommonEntry;

@Repository
public interface CommonEntryRepository extends JpaRepository<CommonEntry, BigInteger> {

	@Query("select ce from CommonEntry ce join fetch ce.commonChallenge where ce.memberId = :memberId and ce.challengeDt = current_date")
	Optional<CommonEntry> findByMemberId(Long memberId);

	@Query("select count(ce) from CommonEntry ce where ce.compFlag = true and ce.challengeDt = current_date")
	int countAllByChallengeDtAndCompFlagIsTrue();

}
