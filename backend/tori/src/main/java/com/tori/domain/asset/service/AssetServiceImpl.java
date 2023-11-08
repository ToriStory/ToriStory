package com.tori.domain.asset.service;

import com.tori.domain.asset.repository.MemberAssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AssetServiceImpl implements AssetService {

    private final MemberAssetRepository memberAssetRepository;

    @Override
    public int findDotoriCnt(Long memberId) {
        return memberAssetRepository.findDotoriCntByMemberId(memberId);
    }

}
