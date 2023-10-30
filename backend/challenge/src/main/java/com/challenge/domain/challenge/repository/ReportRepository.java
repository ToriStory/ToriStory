package com.challenge.domain.challenge.repository;

import java.math.BigInteger;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.challenge.domain.challenge.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {

	@Query("select r from Report r join fetch r.customChallenge where r.reporterId = :repoterId and r.customChallenge.customChallengeId = :customChallengeId")
	Optional<Report> findByReporterIdAndCustomChallengeId(Long repoterId, BigInteger customChallengeId);

}
