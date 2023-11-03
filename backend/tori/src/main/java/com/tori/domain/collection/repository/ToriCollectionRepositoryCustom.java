package com.tori.domain.collection.repository;

import com.tori.domain.collection.dto.response.FindCollectionRes;

import java.util.List;

public interface ToriCollectionRepositoryCustom {

    List<FindCollectionRes> findAllByMemberId(Long memberId);

}
