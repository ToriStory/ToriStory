package com.challenge.domain.challenge.service;

import com.challenge.domain.challenge.dto.response.AddAttendRes;
import com.challenge.domain.challenge.dto.response.FindCommonRes;

public interface CommonChallengeService {

	FindCommonRes findCommonChallenge(Long memberId);

	AddAttendRes addCommonAttend(Long memberId);

}
