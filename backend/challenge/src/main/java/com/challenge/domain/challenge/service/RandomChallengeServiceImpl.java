package com.challenge.domain.challenge.service;

import com.challenge.domain.challenge.dto.response.FindRandomRes;
import com.challenge.domain.challenge.entity.Category;
import com.challenge.domain.challenge.entity.PhotoChallenge;
import com.challenge.domain.challenge.entity.PlaceChallenge;
import com.challenge.domain.challenge.entity.RandomChallenge;
import com.challenge.domain.challenge.repository.PhotoChallengeRepository;
import com.challenge.domain.challenge.repository.PlaceChallengeRepository;
import com.challenge.domain.challenge.repository.RandomChallengeRepository;
import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RandomChallengeServiceImpl implements RandomChallengeService {

    private final RandomChallengeRepository randomChallengeRepository;
    private final PhotoChallengeRepository photoChallengeRepository;
    private final PlaceChallengeRepository placeChallengeRepository;

    @Override
    public FindRandomRes findRandomChallenge(String accessToken) {
        // 사용자 아이디 가져오는 것으로 수정하기!!
        long memberId = 3;

        Optional<RandomChallenge> randomChallenge = randomChallengeRepository.findByMemberIdAndChallengeDt(memberId, LocalDate.now());

        if (randomChallenge.isEmpty()) {
            addRandomChallenge(memberId);
            randomChallenge = randomChallengeRepository.findByMemberIdAndChallengeDt(memberId, LocalDate.now());
        }

        RandomChallenge challenge = randomChallenge.get();

        return FindRandomRes.builder()
                .id(challenge.getRandomChallengeId())
                .content(getChallengeContent(challenge.getCategory().toString(), challenge.getChallengeId()))
                .compFlag(challenge.isCompFlag())
                .category(challenge.getCategory().toString())
                .build();
    }

    private String getChallengeContent(String category, Long challengeId) {
        String content = null;
        switch (category) {
            case "PHOTO":
                PhotoChallenge photoChallenge = photoChallengeRepository.findById(challengeId).orElseThrow(() -> new ChallengeException(ErrorCode.RANDOM_CHALLENGE_NOT_FOUND));
                content = photoChallenge.getContent();
                break;
            case "PLACE":
                PlaceChallenge placeChallenge = placeChallengeRepository.findById(challengeId).orElseThrow(() -> new ChallengeException(ErrorCode.RANDOM_CHALLENGE_NOT_FOUND));
                content = placeChallenge.getContent();
                break;
            default:
                throw new ChallengeException(ErrorCode.CATEGORY_NOT_FOUND);
        }
        return content;
    }

    private BigInteger addRandomChallenge(long memberId) {
        Map<Category, Long> challengeInfo = getRandomChallenge();

        List<Category> key = new ArrayList<>(challengeInfo.keySet());

        return randomChallengeRepository.save(RandomChallenge.builder()
                        .memberId(memberId)
                        .challengeId(challengeInfo.get(key.get(0)))
                        .category(key.get(0))
                .build()).getRandomChallengeId();
    }

    private Map<Category, Long> getRandomChallenge() {
        Category[] categories = Category.values();
        int randomIdx = new Random().nextInt(categories.length);
        Category category = categories[randomIdx];

        long challengeId = 0;
        switch (category.toString()) {
            case "PHOTO":
                challengeId = photoChallengeRepository.findByRandom().getPhotoChallengeId();
                break;
            case "PLACE":
                challengeId = placeChallengeRepository.findByRandom().getPlaceChallengeId();
                break;
        }

        Map<Category, Long> map = new HashMap<>();
        map.put(category, challengeId);

        return map;
    }

    @Override
    public FindRandomRes modifyRandomId(String accessToken) {
        // 사용자 아이디 가져오는 것으로 수정하기!!
        long memberId = 3;

        Optional<RandomChallenge> randomChallenge = randomChallengeRepository.findByMemberIdAndChallengeDt(memberId, LocalDate.now());
        if (randomChallenge.isEmpty()) {
            throw new ChallengeException(ErrorCode.RANDOM_CHALLENGE_NOT_FOUND);
        }

        RandomChallenge challenge = randomChallenge.get();

        Map<Category, Long> newChallenge;
        Category category;
        long newChallengeId;
        do {
            newChallenge = getRandomChallenge();
            List<Category> key = new ArrayList<>(newChallenge.keySet());
            category = key.get(0);
            newChallengeId = newChallenge.get(category);
        } while(Objects.equals(category, challenge.getCategory()) && Objects.equals(newChallengeId, challenge.getChallengeId()));

        challenge.renewal(category, newChallengeId);

        return FindRandomRes.builder()
                .id(challenge.getRandomChallengeId())
                .content(getChallengeContent(challenge.getCategory().toString(), challenge.getChallengeId()))
                .compFlag(challenge.isCompFlag())
                .category(challenge.getCategory().toString())
                .build();
    }

    @Override
    public void modifyRandomCompFlag(String accessToken) {
        // 사용자 아이디 가져오는 것으로 수정하기!!
        long memberId = 3;

        Optional<RandomChallenge> randomChallenge = randomChallengeRepository.findByMemberIdAndChallengeDt(memberId, LocalDate.now());
        if (randomChallenge.isEmpty()) {
            throw new ChallengeException(ErrorCode.RANDOM_CHALLENGE_NOT_FOUND);
        }

        RandomChallenge challenge = randomChallenge.get();
        challenge.complete();
    }

}
