package com.challenge.domain.challenge.repository;

import com.challenge.domain.challenge.entity.RandomChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface RandomChallengeRepository extends JpaRepository<RandomChallenge, BigInteger> {

    Optional<RandomChallenge> findByMemberIdAndChallengeDt(long memberId, LocalDate localDate);

}
