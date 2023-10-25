package com.challenge.domain.challenge.service;

import java.util.List;
import java.util.stream.Collectors;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.response.FindCustomRes;
import com.challenge.domain.challenge.entity.CustomChallenge;
import com.challenge.domain.challenge.entity.CustomEntry;
import com.challenge.domain.challenge.repository.CustomChallengeRepository;
import com.challenge.domain.challenge.repository.CustomEntryRepository;
import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CustomChallengeServiceImpl implements CustomChallengeService {

    private final CustomChallengeRepository customChallengeRepository;
    private final CustomEntryRepository customEntryRepository;

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

}
