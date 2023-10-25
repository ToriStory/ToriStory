package com.challenge.domain.challenge.service;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.response.FindCustomRes;

import java.util.List;

public interface CustomChallengeService {

    void addCustom(String accessToken, AddCustomReq addCustomReq);

    List<FindCustomRes> findMyCustomChallenge(String accessToken);

}
