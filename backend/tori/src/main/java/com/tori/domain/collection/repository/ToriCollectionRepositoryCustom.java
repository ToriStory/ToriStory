package com.tori.domain.collection.repository;

import com.tori.domain.collection.dto.response.CollectionRes;

import java.util.List;

public interface ToriCollectionRepositoryCustom {

    List<CollectionRes> findAllByMemberId(Long memberId);

}
