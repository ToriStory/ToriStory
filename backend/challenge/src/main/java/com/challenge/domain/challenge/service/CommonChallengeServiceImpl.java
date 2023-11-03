package com.challenge.domain.challenge.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.challenge.domain.challenge.dto.response.AddAttendRes;
import com.challenge.domain.challenge.dto.response.FindCommonRes;
import com.challenge.domain.challenge.entity.CommonChallenge;
import com.challenge.domain.challenge.entity.CommonEntry;
import com.challenge.domain.challenge.repository.CommonChallengeRepository;
import com.challenge.domain.challenge.repository.CommonEntryRepository;
import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommonChallengeServiceImpl implements CommonChallengeService {

	private final CommonChallengeRepository commonChallengeRepository;
	private final CommonEntryRepository commonEntryRepository;

	@Override
	public FindCommonRes findCommonChallenge(Long memberId) {
		int compCnt = commonEntryRepository.countAllByChallengeDtAndCompFlagIsTrue();

		Optional<CommonEntry> commonEntry = commonEntryRepository.findByMemberIdAndChallengeDt(memberId);

		if (commonEntry.isEmpty()) {
			CommonChallenge commonChallenge = commonChallengeRepository.findByTodayFlagIsTrue()
				.orElseThrow(() -> new ChallengeException(ErrorCode.TODAY_COMMON_CHALLENGE_NOT_FOUND));

			return FindCommonRes.builder()
				.commonChallengeId(commonChallenge.getCommonChallengeId())
				.content(commonChallenge.getContent())
				.attendFlag(false)
				.compFlag(false)
				.compCnt(compCnt)
				.unit(parseUnit(commonChallenge.getUnit()))
				.build();
		}

		return FindCommonRes.builder()
			.commonChallengeId(commonEntry.get().getCommonChallenge().getCommonChallengeId())
			.content(commonEntry.get().getCommonChallenge().getContent())
			.attendFlag(true)
			.compFlag(commonEntry.get().isCompFlag())
			.compCnt(compCnt)
			.unit(parseUnit(commonEntry.get().getCommonChallenge().getUnit()))
			.build();
	}

	@Override
	public AddAttendRes addCommonAttend(Long memberId) {

		CommonChallenge commonChallenge = commonChallengeRepository.findByTodayFlagIsTrue()
			.orElseThrow(() -> new ChallengeException(ErrorCode.TODAY_COMMON_CHALLENGE_NOT_FOUND));

		Optional<CommonEntry> savedCommonEntry = commonEntryRepository.findByMemberIdAndChallengeDt(memberId);

		if (savedCommonEntry.isPresent()) {
			throw new ChallengeException(ErrorCode.DUPLICATE_COMMON_CHALLENGE);
		}

		Optional<CommonEntry> commonEntry = Optional.of(commonEntryRepository.save(
			CommonEntry.builder()
				.compFlag(false)
				.memberId(memberId)
				.commonChallenge(commonChallenge)
				.build()
		));

		if (commonEntry.isEmpty()) {
			return AddAttendRes.builder().attendFlag(false).build();
		}

		return AddAttendRes.builder().attendFlag(true).build();
	}

	private List<Integer> parseUnit(String unit) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.readValue(unit, new TypeReference<List<Integer>>() {});
		} catch (Exception e) {
			throw new ChallengeException(ErrorCode.JSON_PARSE_ERROR);
		}
	}

}
