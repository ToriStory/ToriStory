package com.tori.domain.collection.service;

import com.tori.domain.collection.dto.response.CollectionRes;
import com.tori.domain.collection.dto.response.FindCollectionRes;

import java.util.List;

public interface CollectionService {

    FindCollectionRes findCollection(Long memberId);

    void addTori(Long memberId, Byte toriId);

}
