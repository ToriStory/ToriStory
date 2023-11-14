package com.challenge.domain.challenge.service;

import com.challenge.domain.asset.entity.MemberAsset;
import com.challenge.domain.asset.repository.AssetRepository;
import com.challenge.domain.asset.repository.MemberAssetRepository;
import com.challenge.domain.challenge.dto.response.FindRandomRes;
import com.challenge.domain.challenge.entity.Category;
import com.challenge.domain.challenge.entity.PhotoChallenge;
import com.challenge.domain.challenge.entity.PlaceChallenge;
import com.challenge.domain.challenge.entity.RandomChallenge;
import com.challenge.domain.challenge.repository.PhotoChallengeRepository;
import com.challenge.domain.challenge.repository.PlaceChallengeRepository;
import com.challenge.domain.challenge.repository.RandomChallengeRepository;
import com.challenge.domain.challenge.util.CertUtil;
import com.challenge.global.exception.ChallengeException;
import com.challenge.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RandomChallengeServiceImpl implements RandomChallengeService {

    //랜덤 도전과제 달성시 받는 도토리 수
    private final int RANDOM_CHALLENGE_COMPLETE_COUNT = 10;

    private final AssetRepository assetRepository;
    private final MemberAssetRepository memberAssetRepository;
    private final RandomChallengeRepository randomChallengeRepository;
    private final PhotoChallengeRepository photoChallengeRepository;
    private final PlaceChallengeRepository placeChallengeRepository;
    private final CertUtil certUtil;

    @Override
    public FindRandomRes findRandomChallenge(Long memberId) {
        Optional<RandomChallenge> randomChallenge = randomChallengeRepository.findByMemberIdAndChallengeDt(memberId, LocalDate.now());

        if (randomChallenge.isEmpty()) {
            addRandomChallenge(memberId);
            randomChallenge = randomChallengeRepository.findByMemberIdAndChallengeDt(memberId, LocalDate.now());
        }

        RandomChallenge challenge = randomChallenge.get();

        Optional<PlaceChallenge> placeChallenge = Optional.empty();
        if (challenge.getCategory().toString().equals("PLACE")) {
            placeChallenge = Optional.of(placeChallengeRepository.findById(challenge.getChallengeId())
                .orElseThrow(() -> new ChallengeException(ErrorCode.PLACE_CHALLENGE_NOT_FOUND)));
        }

        return FindRandomRes.builder()
                .id(challenge.getRandomChallengeId())
                .content(getChallengeContent(challenge.getCategory().toString(), challenge.getChallengeId()))
                .compFlag(challenge.isCompFlag())
                .category(challenge.getCategory().toString())
                .keyword(placeChallenge.isPresent() ? placeChallenge.get().getKeyword() : "")
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
    public FindRandomRes modifyRandomId(Long memberId) {

        MemberAsset memberAsset = memberAssetRepository.findByMemberIdAndAsset(memberId, assetRepository.findByAssetNm("RANDOM_TICKET")
                        .orElseThrow(() -> new ChallengeException(ErrorCode.ASSET_NOT_FOUND)))
                .orElseThrow(() -> new ChallengeException(ErrorCode.MEMBER_ASSET_NOT_FOUND));

        if(memberAsset.getAssetCnt() < 1) {
            throw new ChallengeException(ErrorCode.ASSET_NOT_ENOUGH);
        }

        // 티켓 1개 차감
        memberAsset.pay(1);

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

        Optional<PlaceChallenge> placeChallenge = Optional.empty();
        if (challenge.getCategory().toString().equals("PLACE")) {
            placeChallenge = Optional.of(placeChallengeRepository.findById(challenge.getChallengeId())
                .orElseThrow(() -> new ChallengeException(ErrorCode.PLACE_CHALLENGE_NOT_FOUND)));
        }

        return FindRandomRes.builder()
                .id(challenge.getRandomChallengeId())
                .content(getChallengeContent(challenge.getCategory().toString(), challenge.getChallengeId()))
                .compFlag(challenge.isCompFlag())
                .category(challenge.getCategory().toString())
                .keyword(placeChallenge.isPresent() ? placeChallenge.get().getKeyword() : "")
                .build();
    }

    @Override
    public void modifyRandomCompFlag(Long memberId) {
        Optional<RandomChallenge> randomChallenge = randomChallengeRepository.findByMemberIdAndChallengeDt(memberId, LocalDate.now());
        if (randomChallenge.isEmpty()) {
            throw new ChallengeException(ErrorCode.RANDOM_CHALLENGE_NOT_FOUND);
        }

        RandomChallenge challenge = randomChallenge.get();
        challenge.complete();

        memberAssetRepository.findByMemberIdAndAsset(memberId, assetRepository.findByAssetNm("DOTORI")
                        .orElseThrow(() -> new ChallengeException(ErrorCode.ASSET_NOT_FOUND)))
                .orElseThrow(() -> new ChallengeException(ErrorCode.MEMBER_ASSET_NOT_FOUND))
                .plus(RANDOM_CHALLENGE_COMPLETE_COUNT);
    }

    @Override
    public boolean findRandomCertAi(Long memberId, BigInteger challengeId, MultipartFile image) {

        RandomChallenge randomChallenge = randomChallengeRepository.findById(challengeId)
            .orElseThrow(() -> new ChallengeException(ErrorCode.RANDOM_CHALLENGE_NOT_FOUND));

        if (randomChallenge.getMemberId() != memberId) {
            throw new ChallengeException(ErrorCode.RANDOM_MEMBER_NOT_MATCH);
        }

        PhotoChallenge photoChallenge = photoChallengeRepository.findById(randomChallenge.getChallengeId())
            .orElseThrow(() -> new ChallengeException(ErrorCode.PHOTO_CHALLENGE_NOT_FOUND));

        return certUtil.certAiUtil(image).equals(photoChallenge.getKeyword());
    }

}
