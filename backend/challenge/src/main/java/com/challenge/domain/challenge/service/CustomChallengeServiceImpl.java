package com.challenge.domain.challenge.service;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.response.FindCustomRes;
import com.challenge.domain.challenge.dto.request.FindCustomSearchReq;
import com.challenge.domain.challenge.dto.response.FindTotalCustomRes;
import com.challenge.domain.challenge.dto.response.TotalCustomDto;
import com.challenge.domain.challenge.dto.request.AddScrapCustomReq;
import com.challenge.domain.challenge.dto.response.FindMemoryRes;
import com.challenge.domain.challenge.entity.CustomChallenge;
import com.challenge.domain.challenge.entity.CustomEntry;
import com.challenge.domain.challenge.repository.CustomChallengeRepository;
import com.challenge.domain.challenge.repository.CustomEntryRepository;
import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CustomChallengeServiceImpl implements CustomChallengeService {

    private final CustomChallengeRepository customChallengeRepository;
    private final CustomEntryRepository customEntryRepository;
    private final AwsS3Service awsS3Service;

    @Override
    public void addCustom(String accessToken, AddCustomReq addCustomReq) {
        Long memberId = 1L;

        if (addCustomReq.getContent().length() > 20) {
            throw new ChallengeException(ErrorCode.CONTENT_LENGTH_OVER);
        }

        CustomChallenge savedCustomChallenge = customChallengeRepository.save(CustomChallenge.builder()
                        .memberId(memberId)
                        .content(addCustomReq.getContent())
                        .displayFlag(addCustomReq.isDisplayFlag())
                .build());

        if (savedCustomChallenge == null) {
            throw new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_SAVED);
        }

        customEntryRepository.save(CustomEntry.builder()
                        .memberId(memberId)
                        .customChallenge(savedCustomChallenge)
                        .endDt(addCustomReq.getEndDt())
                .build());
    }

    public List<FindCustomRes> findMyCustomChallenge(String accessToken) {
        Long memberId = 1L;

        List<CustomEntry> customEntryList = customEntryRepository.findAllByMemberId(memberId);

        return customEntryList.stream()
                .map(customEntry -> {
                    return FindCustomRes.builder()
                        .id(customEntry.getCustomEntryId())
                        .content(customEntry.getCustomChallenge().getContent())
                        .startDt(customEntry.getStartDt())
                        .endDt(customEntry.getEndDt())
                        .compFlag(customEntry.isCompFlag())
                        .imgUrl(customEntry.getImgUrl())
                        .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public FindTotalCustomRes findAllCustomChallenge(FindCustomSearchReq findCustomSearchReq) {
        List<CustomChallenge> customChallengeList = new ArrayList<>();

        switch (findCustomSearchReq.getSort()) {
            case 0:
                customChallengeList = customChallengeRepository.findAllByRegDtmWithCursor(
                        findCustomSearchReq.getKeyword(),
                        PageRequest.of(findCustomSearchReq.getPage(), findCustomSearchReq.getLimit())
                );
                break;
            case 1:
                customChallengeList = customChallengeRepository.findAllByScrapCntWithCursor(
                        findCustomSearchReq.getKeyword(),
                        PageRequest.of(findCustomSearchReq.getPage(), findCustomSearchReq.getLimit())
                );
                break;
            default:
                throw new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_SEARCH_ERROR);
        }

        List<TotalCustomDto> totalCustomDtoList = customChallengeList.stream()
                .map(customChallenge -> {
                    return TotalCustomDto.builder()
                            .id(customChallenge.getCustomChallengeId())
                            .content(customChallenge.getContent())
                            .scrapCnt(customChallenge.getScrapCnt())
                            .reportCnt(customChallenge.getReportCnt())
                            .regDtm(customChallenge.getRegDtm())
                            .build();
                })
                .collect(Collectors.toList());

        return FindTotalCustomRes.builder()
                .totalCustomChallengeList(totalCustomDtoList)
                .nextCursor(totalCustomDtoList.size() != 0 ? totalCustomDtoList.get(totalCustomDtoList.size() - 1).getId() : BigInteger.ZERO)
                .nextPage(findCustomSearchReq.getPage() + 1)
                .hasNext(totalCustomDtoList.size() >= findCustomSearchReq.getLimit() ? true : false)
                .build();
    }

    @Override
    public List<FindCustomRes> findMyTodayCustomChallenge(String accessToken) {
        Long memberId = 1L;

        List<CustomEntry> customEntryList = customEntryRepository.findAllByMemberIdAndEndDt(memberId);

        return customEntryList.stream()
            .map(customEntry -> {
                return FindCustomRes.builder()
                    .id(customEntry.getCustomEntryId())
                    .content(customEntry.getCustomChallenge().getContent())
                    .startDt(customEntry.getStartDt())
                    .endDt(customEntry.getEndDt())
                    .compFlag(customEntry.isCompFlag())
                    .imgUrl(customEntry.getImgUrl())
                    .build();
            })
            .collect(Collectors.toList());
    }

    @Override
    public void addScrapCustom(String accessToken, BigInteger customChallengeId, AddScrapCustomReq addScrapCustomReq) {
        Long memberId = 2L;

        customEntryRepository.save(CustomEntry.builder()
                .memberId(memberId)
                .customChallenge(customChallengeRepository.findById(customChallengeId).orElseThrow(() -> new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_FOUND)))
                .endDt(addScrapCustomReq.getEndDt())
                .build());
    }


    @Override
    public void modifyCustomCompFlag(String accessToken, BigInteger customEntryId) {
        Long memberId = 1L;

        CustomEntry customEntry = customEntryRepository.findById(customEntryId)
                .orElseThrow(() -> new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_FOUND));

        if (customEntry.getMemberId() != memberId) {
            throw new ChallengeException(ErrorCode.CUSTOM_MEMBER_NOT_MATCH);
        }

        customEntry.complete();
    }

    @Override
    public void removeCustom(String accessToken, BigInteger customEntryId) {
        Long memberId = 1L;

        CustomEntry customEntry = customEntryRepository.findById(customEntryId)
                .orElseThrow(() -> new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_FOUND));

        if (customEntry.getMemberId() != memberId) {
            throw new ChallengeException(ErrorCode.CUSTOM_MEMBER_NOT_MATCH);
        }

        customEntryRepository.deleteById(customEntryId);
    }

    @Override
    public List<FindMemoryRes> findMemoryCustom(String accessToken) {
        Long memberId = 1L;

        List<CustomEntry> customEntryList = customEntryRepository.findAllByMemberId(memberId);

        return customEntryList.stream()
                .map(customEntry -> {
                    return FindMemoryRes.builder()
                            .id(customEntry.getCustomEntryId())
                            .content(customEntry.getCustomChallenge().getContent())
                            .imgUrl(customEntry.getImgUrl())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public void modifyCustomImage(String accessToken, BigInteger customEntryId, MultipartFile image) {
        Long memberId = 1L;

        CustomEntry customEntry = customEntryRepository.findById(customEntryId)
                .orElseThrow(() -> new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_FOUND));

        if (customEntry.getMemberId() != memberId) {
            throw new ChallengeException(ErrorCode.CUSTOM_MEMBER_NOT_MATCH);
        }

        if (image != null) {
            String savedUrl = awsS3Service.uploadFile(image);

            customEntry.modifyImage(savedUrl);
        }
    }

}
