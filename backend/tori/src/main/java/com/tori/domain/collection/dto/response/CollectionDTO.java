package com.tori.domain.collection.dto.response;

import com.tori.domain.collection.entity.MemberCollection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CollectionDTO {

    private Byte id;

    private String toriName;

    private int price;

    private String imgUrl;

    private boolean limitedFlag;

    private MemberCollection memberCollection;

}
