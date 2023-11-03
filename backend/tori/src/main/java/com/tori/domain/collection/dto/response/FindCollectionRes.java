package com.tori.domain.collection.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FindCollectionRes {

    private Byte id;

    private String toriName;

    private int price;

    private String imgUrl;

    private boolean limitedFlag;

    private boolean collectionFlag;

}
