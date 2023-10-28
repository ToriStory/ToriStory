package com.challenge.domain.challenge.service;

import com.challenge.domain.challenge.dto.response.FindRandomRes;

public interface RandomChallengeService {

    FindRandomRes findRandomChallenge(Long memberId);

    FindRandomRes modifyRandomId(Long memberId);

    void modifyRandomCompFlag(Long memberId);

}
