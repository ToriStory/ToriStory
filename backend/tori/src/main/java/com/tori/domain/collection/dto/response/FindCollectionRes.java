package com.tori.domain.collection.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FindCollectionRes {

    private List<CollectionRes> collectionResList;

    private Byte profile;

}
