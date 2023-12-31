package com.challenge.domain.challenge.service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.challenge.domain.asset.entity.MemberAsset;
import com.challenge.domain.asset.repository.AssetRepository;
import com.challenge.domain.asset.repository.MemberAssetRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.challenge.domain.challenge.dto.response.FindCommonEntryRes;
import com.challenge.domain.challenge.dto.response.AddAttendRes;
import com.challenge.domain.challenge.dto.response.FindCommonCompRes;
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
	private final AwsS3Service awsS3Service;

	private final AssetRepository assetRepository;
	private final MemberAssetRepository memberAssetRepository;

	private final int COMMON_ACORN = 5;

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
				.attendCnt(commonEntryRepository.countAllByChallengeDt())
				.compFlag(false)
				.compCnt(compCnt)
				.unit(parseUnit(commonChallenge.getUnit()))
				.build();
		}

		return FindCommonRes.builder()
			.commonChallengeId(commonEntry.get().getCommonChallenge().getCommonChallengeId())
			.content(commonEntry.get().getCommonChallenge().getContent())
			.attendFlag(true)
			.attendCnt(commonEntryRepository.countAllByChallengeDt())
			.compFlag(commonEntry.get().isCompFlag())
			.compCnt(compCnt)
			.unit(parseUnit(commonEntry.get().getCommonChallenge().getUnit()))
			.build();
	}

	@Override
	public FindCommonEntryRes findCommonEntryChallenge(Long memberId, BigInteger commonChallengeId) {

		CommonChallenge commonChallenge = commonChallengeRepository.findByTodayFlagIsTrue()
			.orElseThrow(() -> new ChallengeException(ErrorCode.TODAY_COMMON_CHALLENGE_NOT_FOUND));

		List<String> imgUrlList = commonEntryRepository.findAllByImgUrlIsNotEmptyAndCompFlagIsTrue();

		return FindCommonEntryRes.builder()
			.commonChallengeId(commonChallengeId)
			.content(commonChallenge.getContent())
			.imgUrlList(imgUrlList)
			.build();
	}


	@Override
	@Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
	public void receiveCommonReward() {
		// 오늘 공동 도전 과제 unit 값 가져오기
		CommonChallenge todayChallenge = commonChallengeRepository.findByTodayFlagIsTrue().
				orElseThrow(() -> new ChallengeException(ErrorCode.TODAY_COMMON_CHALLENGE_NOT_FOUND));

		List<Integer> unitList = parseUnit(todayChallenge.getUnit());

		// 공동 도전 과제 달성 참여자 수 카운트 <-> unit 값으로 도토리 개수 정하기
		int totalCompCnt = commonEntryRepository.countAllByChallengeDtAndCompFlagIsTrue();
		int commonAcorn = calCommonAcorn(unitList, totalCompCnt);

		// 오늘 공동 도전 과제 참여자 memberId 리스트
		if (commonAcorn != 0) {
			List<Long> memberIdList = commonEntryRepository.findMemberIdByChallengeDt(LocalDate.now());
			for (Long memberId : memberIdList) {
				rewardAcorn(memberId, commonAcorn);
			}
		}
	}

	@Override
	@Scheduled(cron = "0 1 0 * * *", zone = "Asia/Seoul")
	public void renewalCommonChallenge() {
		CommonChallenge todayCommon = commonChallengeRepository.findByTodayFlagIsTrue()
			.orElseThrow(() -> new ChallengeException(ErrorCode.TODAY_COMMON_CHALLENGE_NOT_FOUND));

		CommonChallenge randomCommon = commonChallengeRepository.findCommonChallengeByLimited()
			.orElseThrow(() -> new ChallengeException(ErrorCode.COMMON_CHALLENGE_NOT_FOUND));

		todayCommon.renewal();
		randomCommon.renewal();
	}

	@Override
	public FindCommonCompRes modifyCommonCompFlag(Long memberId, BigInteger commonChallengeId) {

		CommonEntry commonEntry = commonEntryRepository.findByMemberIdAndChallengeDtAndCommonChallenge(memberId, commonChallengeId)
			.orElseThrow(() -> new ChallengeException(ErrorCode.ATTEND_COMMON_CHALLENGE_NOT_FOUND));

		if (commonEntry.isCompFlag()) {
			throw new ChallengeException(ErrorCode.COMMON_CHALLENGE_ALREADY_COMPLETE);
		}

		commonEntry.complete();

		// 보상
		rewardAcorn(memberId, COMMON_ACORN);

		return FindCommonCompRes.builder()
			.compCnt(commonEntryRepository.countAllByChallengeDtAndCompFlagIsTrue())
			.compFlag(true)
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

	@Override
	public void modifyCommonImage(Long memberId, BigInteger commonChallengeId, MultipartFile image) {
		CommonEntry commonEntry = commonEntryRepository.findByMemberIdAndChallengeDtAndCommonChallenge(memberId, commonChallengeId)
			.orElseThrow(() -> new ChallengeException(ErrorCode.ATTEND_COMMON_CHALLENGE_NOT_FOUND));

		if (!commonEntry.isCompFlag()) {
			throw new ChallengeException(ErrorCode.COMMON_CHALLENGE_NOT_COMPLETE);
		}

		commonEntry.review(awsS3Service.uploadFile(image));
	}

	private List<Integer> parseUnit(String unit) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.readValue(unit, new TypeReference<List<Integer>>() {});
		} catch (Exception e) {
			throw new ChallengeException(ErrorCode.JSON_PARSE_ERROR);
		}
	}

	private int calCommonAcorn(List<Integer> unitList, int totalCompCnt) {
		int commonAcorn = 0;
		for (int unit : unitList) {
			if (totalCompCnt < unit) {
				break;
			}
			commonAcorn+= COMMON_ACORN;
		}
		return commonAcorn;
	}

	private void rewardAcorn(Long memberId, int acornCnt) {
		MemberAsset memberAsset = memberAssetRepository.findByMemberIdAndAsset(memberId, assetRepository.findByAssetNm("DOTORI")
						.orElseThrow(() -> new ChallengeException(ErrorCode.ASSET_NOT_FOUND)))
				.orElseThrow(() -> new ChallengeException(ErrorCode.MEMBER_ASSET_NOT_FOUND));
		memberAsset.plus(acornCnt);
	}

}
