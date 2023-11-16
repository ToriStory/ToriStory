package com.challenge.domain.challenge.repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.challenge.domain.challenge.entity.CommonEntry;

@Repository
public interface CommonEntryRepository extends JpaRepository<CommonEntry, BigInteger> {

	@Query("select ce from CommonEntry ce join fetch ce.commonChallenge where ce.memberId = :memberId and ce.challengeDt = current_date")
	Optional<CommonEntry> findByMemberIdAndChallengeDt(Long memberId);

	@Query("select ce from CommonEntry ce join fetch ce.commonChallenge where ce.memberId = :memberId and ce.challengeDt = current_date and ce.commonChallenge.commonChallengeId = :commonChallengeId")
	Optional<CommonEntry> findByMemberIdAndChallengeDtAndCommonChallenge(Long memberId, BigInteger commonChallengeId);

	@Query("select count(ce) from CommonEntry ce where ce.compFlag = true and ce.challengeDt = current_date")
	int countAllByChallengeDtAndCompFlagIsTrue();

	@Query("select count(ce) from CommonEntry ce where ce.challengeDt = current_date")
	int countAllByChallengeDt();

	@Query("select ce.imgUrl from CommonEntry ce where ce.challengeDt = current_date and ce.imgUrl is not null and ce.compFlag = true")
	List<String> findAllByImgUrlIsNotEmptyAndCompFlagIsTrue();

	@Query("select ce.memberId from CommonEntry ce where ce.challengeDt = :date")
	List<Long> findMemberIdByChallengeDt(LocalDate date);

}
