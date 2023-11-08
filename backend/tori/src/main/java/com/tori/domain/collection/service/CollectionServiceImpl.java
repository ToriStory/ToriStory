package com.tori.domain.collection.service;

import com.tori.domain.asset.entity.MemberAsset;
import com.tori.domain.asset.repository.MemberAssetRepository;
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

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CollectionServiceImpl implements CollectionService {

    private final ToriCollectionRepository toriCollectionRepository;
    private final MemberCollectionRepository memberCollectionRepository;
    private final MemberAssetRepository memberAssetRepository;

    @Override
    public List<FindCollectionRes> findCollection(Long memberId) {
        return toriCollectionRepository.findAllByMemberId(memberId);
    }

    @Override
    public void addTori(Long memberId, Byte toriId) {
        ToriCollection toriCollection = toriCollectionRepository.findById(toriId).orElseThrow(() -> new ToriException(ErrorCode.TORI_NOT_FOUND));

        // 토리 입양 여부 확인
        if (memberCollectionRepository.findMemberCollectionByMemberIdAndToriCollection(memberId, toriCollection).isPresent()) {
            throw new ToriException(ErrorCode.TORI_ALREADY_ADOPT);
        }

        // 도토리 확인
        MemberAsset memberAsset = memberAssetRepository.findMemberAssetByAsset(memberId);
        if (memberAsset.getAssetCnt() < toriCollection.getPrice()) {
            throw new ToriException(ErrorCode.DOTORI_NOT_ENOUGH);
        }

        memberAsset.pay(toriCollection.getPrice());

        memberCollectionRepository.save(new MemberCollection(memberId, toriCollection));
    }

}
