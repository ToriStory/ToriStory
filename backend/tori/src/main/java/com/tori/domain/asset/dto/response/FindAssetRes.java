package com.tori.domain.asset.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindAssetRes {

    private String AssetNm;

    private int AssetCnt;

}
