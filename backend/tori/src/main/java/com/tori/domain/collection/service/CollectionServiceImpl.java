package com.tori.domain.collection.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tori.domain.asset.entity.MemberAsset;
import com.tori.domain.asset.repository.MemberAssetRepository;
import com.tori.domain.collection.dto.response.CollectionRes;
import com.tori.domain.collection.dto.response.FindCollectionRes;
import com.tori.domain.collection.entity.MemberCollection;
import com.tori.domain.collection.entity.ToriCollection;
import com.tori.domain.collection.repository.MemberCollectionRepository;
import com.tori.domain.collection.repository.ToriCollectionRepository;
import com.tori.global.exception.ErrorCode;
import com.tori.global.exception.handler.ToriException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CollectionServiceImpl implements CollectionService {

    private final ToriCollectionRepository toriCollectionRepository;
    private final MemberCollectionRepository memberCollectionRepository;
    private final MemberAssetRepository memberAssetRepository;

    @Override
    public FindCollectionRes findCollection(Long memberId) {
        Byte profile = null;

        if (memberId != null) {
            String url = "https://tori-story.com/api/member/profile/" + memberId;
            WebClient webClient = WebClient.create(url);
            String res = webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(res);
            profile = element.getAsJsonObject().get("data").getAsByte();
        }

        return FindCollectionRes.builder()
                .collectionResList(toriCollectionRepository.findAllByMemberId(memberId))
                .profile(profile)
                .build();
    }

    @Override
    public void addTori(Long memberId, Byte toriId) {
        ToriCollection toriCollection = toriCollectionRepository.findById(toriId).orElseThrow(() -> new ToriException(ErrorCode.TORI_NOT_FOUND));

        // 토리 입양 여부 확인
        if (memberCollectionRepository.findMemberCollectionByMemberIdAndToriCollection(memberId, toriCollection).isPresent()) {
            throw new ToriException(ErrorCode.TORI_ALREADY_ADOPT);
        }

        // 도토리 확인
        MemberAsset memberAsset = memberAssetRepository.findMemberAssetByMemberIdAndAsset(memberId, "DOTORI");
        if (memberAsset.getAssetCnt() < toriCollection.getPrice()) {
            throw new ToriException(ErrorCode.DOTORI_NOT_ENOUGH);
        }

        memberAsset.pay(toriCollection.getPrice());

        memberCollectionRepository.save(new MemberCollection(memberId, toriCollection));
    }

}
