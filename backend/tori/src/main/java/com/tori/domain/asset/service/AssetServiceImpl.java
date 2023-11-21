package com.tori.domain.asset.service;

import com.tori.domain.asset.dto.response.FindAssetRes;
import com.tori.domain.asset.entity.MemberAsset;
import com.tori.domain.asset.repository.MemberAssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AssetServiceImpl implements AssetService {

    private final MemberAssetRepository memberAssetRepository;

    @Override
    public List<FindAssetRes> findAssetCnt(Long memberId) {
        List<MemberAsset> memberAssetList = memberAssetRepository.findAllByMemberId(memberId);

        return memberAssetList.stream().map(
                memberAsset -> FindAssetRes.builder()
                            .AssetNm(memberAsset.getAsset().getAssetNm())
                            .AssetCnt(memberAsset.getAssetCnt())
                            .build()
        ).collect(Collectors.toList());
    }

    @Scheduled(cron = "0 0 0 * * SUN-FRI", zone = "Asia/Seoul")
    public void sendDailyTotoriTicket() {
        memberAssetRepository.setDailyAssetCntByAssetNm();
    }

    @Scheduled(cron = "0 0 0 * * SAT", zone = "Asia/Seoul")
    public void sendSatTotoriTicket() {
        memberAssetRepository.setSatAssetCntByAssetNm();
    }

}
