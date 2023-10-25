package com.challenge.domain.challenge.service;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.response.FindCustomRes;

import java.util.List;
import com.challenge.domain.challenge.dto.request.AddScrapCustomReq;

import java.math.BigInteger;

public interface CustomChallengeService {

    void addCustom(String accessToken, AddCustomReq addCustomReq);

    List<FindCustomRes> findMyCustomChallenge(String accessToken);

    void addScrapCustom(String accessToken, BigInteger customChallengeId, AddScrapCustomReq addScrapCustomReq);

    void modifyCustomCompFlag(String accessToken, BigInteger customEntryId);

}
