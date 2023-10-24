package com.challenge.domain.challenge.service;

import java.util.NoSuchElementException;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
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
    public void addCustom(AddCustomReq addCustomReq) {

        if (addCustomReq.getContent().length() > 20) {
            throw new ChallengeException(ErrorCode.CONTENT_LENGTH_OVER);
        }

        CustomChallenge savedCustomChallenge = customChallengeRepository.save(CustomChallenge.builder()
                        .memberId(1L)
                        .content(addCustomReq.getContent())
                        .displayFlag(addCustomReq.isDisplayFlag())
                .build());

        if (savedCustomChallenge == null) {
            throw new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_SAVED);
        }

        customEntryRepository.save(CustomEntry.builder()
                        .memberId(1L)
                        .customChallenge(savedCustomChallenge)
                        .endDt(addCustomReq.getEndDt())
                .build());
    }

}
