package com.tori.domain.basket.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindLetterRes {

    private String letter;

    private String gift;

    private byte giftCnt;

}
