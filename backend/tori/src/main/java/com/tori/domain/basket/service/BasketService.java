package com.tori.domain.basket.service;

public interface BasketService {

    byte findBasket(Long memberId);

    void feed(Long memberId);

}
