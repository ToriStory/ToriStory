package com.challenge.domain.challenge.repository;

import com.challenge.domain.challenge.entity.CustomChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface CustomChallengeRepository extends JpaRepository<CustomChallenge, BigInteger> {
}
