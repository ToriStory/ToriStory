package com.challenge.domain.challenge.service;

import java.math.BigInteger;

import com.challenge.domain.challenge.dto.response.FindCommonEntryRes;
import com.challenge.domain.challenge.dto.response.AddAttendRes;

import org.springframework.web.multipart.MultipartFile;

import com.challenge.domain.challenge.dto.response.FindCommonCompRes;
import com.challenge.domain.challenge.dto.response.FindCommonRes;

public interface CommonChallengeService {

	FindCommonRes findCommonChallenge(Long memberId);

	AddAttendRes addCommonAttend(Long memberId);

	FindCommonCompRes modifyCustomCompFlag(Long memberId, BigInteger commonChallengeId, MultipartFile image);

	FindCommonEntryRes findCommonEntryChallenge(Long memberId, BigInteger commonChallengeId);

}
