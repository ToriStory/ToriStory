package com.challenge.domain.challenge.repository;

import java.math.BigInteger;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.challenge.domain.challenge.entity.CommonChallenge;

@Repository
public interface CommonChallengeRepository extends JpaRepository<CommonChallenge, BigInteger> {

	Optional<CommonChallenge> findByTodayFlagIsTrue();

	@Query(value = "select * from common_challenge c where c.today_flag = false order by rand() limit 1", nativeQuery = true)
	Optional<CommonChallenge> findCommonChallengeByLimited();
}
