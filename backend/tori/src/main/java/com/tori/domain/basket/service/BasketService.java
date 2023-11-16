package com.tori.domain.basket.service;

import com.tori.domain.basket.dto.response.FindLetterRes;

public interface BasketService {

    byte findBasket(Long memberId);

    void feed(Long memberId);

    FindLetterRes findLetter(Long memberId);

}
