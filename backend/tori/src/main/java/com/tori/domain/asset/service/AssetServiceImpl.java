package com.tori.domain.asset.service;

import com.tori.domain.asset.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;

    @Override
    public int findDotoriCnt(Long memberId) {
        return assetRepository.findDotoriCntByMemberId(memberId);
    }

}
