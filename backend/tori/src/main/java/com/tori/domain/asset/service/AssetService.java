package com.tori.domain.asset.service;

import com.tori.domain.asset.dto.response.FindAssetRes;

import java.util.List;

public interface AssetService {

    List<FindAssetRes> findAssetCnt(Long memberId);

}
