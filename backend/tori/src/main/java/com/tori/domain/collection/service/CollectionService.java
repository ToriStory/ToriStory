package com.tori.domain.collection.service;

import com.tori.domain.collection.dto.response.FindCollectionRes;

import java.util.List;

public interface CollectionService {

    List<FindCollectionRes> findCollection(Long memberId);

}
