package com.tori.domain.basket.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindLetterRes {

    String letter;

    String gift;

    byte giftCnt;

}
