package com.challenge.domain.challenge.service;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.request.AddReportReq;
import com.challenge.domain.challenge.dto.response.FindCustomRes;

import java.time.LocalDate;
import java.util.List;
import com.challenge.domain.challenge.dto.request.FindCustomSearchReq;
import com.challenge.domain.challenge.dto.response.FindTotalCustomRes;
import com.challenge.domain.challenge.dto.request.AddScrapCustomReq;

import java.math.BigInteger;

import com.challenge.domain.challenge.dto.response.FindMemoryRes;
import org.springframework.web.multipart.MultipartFile;

public interface CustomChallengeService {

    void addCustom(Long memberId, AddCustomReq addCustomReq);

    List<FindCustomRes> findMyCustomChallenge(Long memberId);

    List<LocalDate> findMyMonthCustomChallenge(Long memberId, LocalDate date);

    List<FindCustomRes> findMyCompCustomChallenge(Long memberId, LocalDate date);

    FindTotalCustomRes findAllCustomChallenge(FindCustomSearchReq findCustomSearchReq);

    List<FindCustomRes> findMyTodayCustomChallenge(Long memberId);

    void addScrapCustom(Long memberId, BigInteger customChallengeId, AddScrapCustomReq addScrapCustomReq);

    void modifyCustomCompFlag(Long memberId, BigInteger customEntryId);

    void removeCustom(Long memberId, BigInteger customEntryId);

    List<FindMemoryRes> findMemoryCustom(Long memberId);

    void modifyCustomImage(Long memberId, BigInteger customEntryId, MultipartFile image);

    void addReportCustom(Long memberId, AddReportReq addReportReq);

}
