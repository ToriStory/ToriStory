package com.tori.domain.basket.service;

import com.tori.domain.asset.entity.MemberAsset;
import com.tori.domain.asset.repository.MemberAssetRepository;
import com.tori.domain.basket.dto.response.FindLetterRes;
import com.tori.domain.basket.entity.Basket;
import com.tori.domain.basket.entity.Gift;
import com.tori.domain.basket.entity.Letter;
import com.tori.domain.basket.repository.BasketRepository;
import com.tori.domain.basket.repository.GiftRepository;
import com.tori.domain.basket.repository.LetterRepository;
import com.tori.global.exception.ErrorCode;
import com.tori.global.exception.handler.ToriException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BasketServiceImpl implements BasketService {

    private final BasketRepository basketRepository;
    private final MemberAssetRepository memberAssetRepository;
    private final LetterRepository letterRepository;
    private final GiftRepository giftRepository;

    final int feedPrice = 2;    // 먹이 가격
    final int[] hours = {2, 3, 5};  // 여우 다녀가는 시간

    @Override
    public byte findBasket(Long memberId) {
        Optional<Basket> basket = basketRepository.findByMemberIdAndOpenFlagIsFalse(memberId);

        // 먹이 X
        if (basket.isEmpty()) {
            return 0;
        }

        // 먹이 O
        if (basket.get().getSendDtm().isAfter((LocalDateTime.now()))) {
            return 1;
        }

        // 편지/선물
        return 2;
    }

    @Override
    public void feed(Long memberId) {
        Optional<Basket> basket = basketRepository.findByMemberIdAndOpenFlagIsFalse(memberId);

        // 먹이 존재 여부 확인
        if (basket.isPresent()) {
            throw new ToriException(ErrorCode.FEED_ALREADY_EXIST);
        }

        // 도토리 확인
        MemberAsset memberAsset = memberAssetRepository.findMemberAssetByMemberIdAndAsset(memberId, "DOTORI");
        if (memberAsset.getAssetCnt() < feedPrice) {
            throw new ToriException(ErrorCode.DOTORI_NOT_ENOUGH);
        }

        memberAsset.pay(feedPrice);

        Letter letter = letterRepository.findLetterByRandom();

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime sendDtm = now.plusHours(hours[(int) (Math.random() * hours.length)])
                .withMinute(0)
                .withSecond(0)
                .withNano(0);

        if (Math.random() <= 0.8) {
            basketRepository.save(Basket.builder()
                            .memberId(memberId)
                            .letter(letter)
                            .sendDtm(sendDtm).
                            build());
            return;
        }

        Gift gift = giftRepository.findGiftByRandom();

        byte cnt = 1;

        if (gift.getContent().equals("DOTORI")) {
            double random = Math.random();
            if (random <= 0.5) {
                cnt = 3;
            } else if (random <= 0.8) {
                cnt = 5;
            } else {
                cnt = 10;
            }
        }

        basketRepository.save(Basket.builder()
                        .memberId(memberId)
                        .letter(letter)
                        .gift(gift)
                        .giftCnt(cnt)
                        .sendDtm(sendDtm)
                        .build());
    }

    @Override
    public FindLetterRes findLetter(Long memberId) {
        Basket basket = basketRepository.findByMemberIdAndOpenFlagIsFalse(memberId).orElseThrow(() -> new ToriException(ErrorCode.LETTER_NOT_FOUND));

        if (basket.getSendDtm().isAfter(LocalDateTime.now())) {
            throw new ToriException(ErrorCode.LETTER_NOT_FOUND);
        }

        basket.read();

        Gift gift = basket.getGift();

        if (gift != null) {
            MemberAsset memberAsset = memberAssetRepository.findMemberAssetByMemberIdAndAsset(memberId, gift.getContent());
            memberAsset.plus(basket.getGiftCnt());

            return FindLetterRes.builder()
                    .letter(basket.getLetter().getContent())
                    .gift(gift.getContent())
                    .giftCnt(basket.getGiftCnt()).build();
        }

        return FindLetterRes.builder()
                .letter(basket.getLetter().getContent()).build();
    }

}
