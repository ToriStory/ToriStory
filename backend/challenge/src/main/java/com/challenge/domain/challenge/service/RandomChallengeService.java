package com.challenge.domain.challenge.service;

import com.challenge.domain.challenge.dto.response.FindRandomRes;

import java.math.BigInteger;

import org.springframework.web.multipart.MultipartFile;

public interface RandomChallengeService {

    FindRandomRes findRandomChallenge(Long memberId);

    FindRandomRes modifyRandomId(Long memberId);

    void modifyRandomCompFlag(Long memberId);

    boolean findRandomCertAi(Long memberId, BigInteger challengeId, MultipartFile image);

}
