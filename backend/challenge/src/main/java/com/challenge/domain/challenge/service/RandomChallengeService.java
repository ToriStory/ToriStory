package com.challenge.domain.challenge.service;

import com.challenge.domain.challenge.dto.response.FindRandomRes;
import com.challenge.domain.challenge.dto.response.FindTotalChallengeRes;

import java.math.BigInteger;

public interface RandomChallengeService {

    FindRandomRes findRandomChallenge(String accessToken);

    FindRandomRes modifyRandomId(String accessToken);

    void modifyRandomCompFlag(String accessToken);

}
