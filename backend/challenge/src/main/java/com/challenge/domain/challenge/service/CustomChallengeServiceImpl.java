package com.challenge.domain.challenge.service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

import com.challenge.domain.challenge.dto.request.AddCustomReq;
import com.challenge.domain.challenge.dto.request.AddReportReq;
import com.challenge.domain.challenge.dto.response.FindCustomRes;
import com.challenge.domain.challenge.dto.request.FindCustomSearchReq;
import com.challenge.domain.challenge.dto.response.FindTotalCustomRes;
import com.challenge.domain.challenge.dto.response.TotalCustomDto;
import com.challenge.domain.challenge.dto.request.AddScrapCustomReq;
import com.challenge.domain.challenge.dto.response.FindMemoryRes;
import com.challenge.domain.challenge.entity.CustomChallenge;
import com.challenge.domain.challenge.entity.CustomEntry;
import com.challenge.domain.challenge.entity.Report;
import com.challenge.domain.challenge.repository.CustomChallengeRepository;
import com.challenge.domain.challenge.repository.CustomEntryRepository;
import com.challenge.domain.challenge.repository.ReportRepository;
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
    private final ReportRepository reportRepository;

    @Override
    public void addCustom(Long memberId, AddCustomReq addCustomReq) {
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

    public List<FindCustomRes> findMyCustomChallenge(Long memberId) {
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
    public List<LocalDate> findMyMonthCustomChallenge(Long memberId, LocalDate date) {
        // 년 월 가져오기
        return customEntryRepository.findByCompDt(memberId, date.getYear(), date.getMonthValue());
    }

    @Override
    public List<FindCustomRes> findMyCompCustomChallenge(Long memberId, LocalDate date) {
        List<CustomEntry> customEntryList = customEntryRepository.findAllByMemberIdAndDate(memberId, date);

        return customEntryList.stream()
            .map(customEntry -> {
                return FindCustomRes.builder()
                    .id(customEntry.getCustomEntryId())
                    .content(customEntry.getCustomChallenge().getContent())
                    .startDt(customEntry.getStartDt())
                    .endDt(customEntry.getEndDt())
                    .imgUrl(customEntry.getImgUrl())
                    .compFlag(customEntry.isCompFlag())
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
    public List<FindCustomRes> findMyTodayCustomChallenge(Long memberId) {
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
    public void addScrapCustom(Long memberId, BigInteger customChallengeId, AddScrapCustomReq addScrapCustomReq) {
        CustomChallenge customChallenge = customChallengeRepository.findById(customChallengeId)
            .orElseThrow(() -> new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_FOUND));

        customEntryRepository.save(CustomEntry.builder()
                .memberId(memberId)
                .customChallenge(customChallenge)
                .endDt(addScrapCustomReq.getEndDt())
                .build());

        customChallenge.scrap();

    }


    @Override
    public void modifyCustomCompFlag(Long memberId, BigInteger customEntryId) {
        CustomEntry customEntry = customEntryRepository.findById(customEntryId)
                .orElseThrow(() -> new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_FOUND));

        if (customEntry.getMemberId() != memberId) {
            throw new ChallengeException(ErrorCode.CUSTOM_MEMBER_NOT_MATCH);
        }

        customEntry.complete();
    }

    @Override
    public void removeCustom(Long memberId, BigInteger customEntryId) {
        CustomEntry customEntry = customEntryRepository.findById(customEntryId)
                .orElseThrow(() -> new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_FOUND));

        if (customEntry.getMemberId() != memberId) {
            throw new ChallengeException(ErrorCode.CUSTOM_MEMBER_NOT_MATCH);
        }

        customEntry.remove();
    }

    @Override
    public List<FindMemoryRes> findMemoryCustom(Long memberId) {
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
    public void modifyCustomImage(Long memberId, BigInteger customEntryId, MultipartFile image) {
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

    @Override
    public void addReportCustom(Long memberId, AddReportReq addReportReq) {

        Optional<Report> report = reportRepository.findByReporterIdAndCustomChallengeId(memberId, addReportReq.getCustomChallengeId());

        if (report.isPresent()) {
            throw new ChallengeException(ErrorCode.ALREADY_REPORT_CHALLENGE);
        }

        CustomChallenge customChallenge = customChallengeRepository.findById(addReportReq.getCustomChallengeId())
            .orElseThrow(() -> new ChallengeException(ErrorCode.CUSTOM_CHALLENGE_NOT_FOUND));

        reportRepository.save(Report.builder()
                .reportedId(customChallenge.getMemberId())
                .reporterId(memberId)
                .customChallenge(customChallenge)
                .reason(addReportReq.getReason())
            .build());

        customChallenge.report();

        if (customChallenge.getReportCnt() >= 3) {
            customChallenge.blur();
        }

    }

}
