package com.tori.domain.collection.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tori.domain.collection.dto.response.CollectionDTO;
import com.tori.domain.collection.dto.response.CollectionRes;
import com.tori.domain.collection.entity.QMemberCollection;
import com.tori.domain.collection.entity.QToriCollection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
public class ToriCollectionRepositoryImpl  implements ToriCollectionRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<CollectionRes> findAllByMemberId(Long memberId) {
        QToriCollection toriCollection = QToriCollection.toriCollection;
        QMemberCollection memberCollection = QMemberCollection.memberCollection;

        List<CollectionDTO> results = queryFactory
                .select(Projections.constructor(CollectionDTO.class,
                        toriCollection.toriCollectionId,
                        toriCollection.toriNm,
                        toriCollection.price,
                        toriCollection.imgUrl,
                        toriCollection.limitedFlag,
                        memberCollection
                        ))
                .from(memberCollection)
                .rightJoin(memberCollection.toriCollection, toriCollection)
                .fetchJoin()
                .fetch();

        log.info(results.toString());

        return results.stream()
                .map(mc -> new CollectionRes(
                        mc.getId(),
                        mc.getToriName(),
                        mc.getPrice(),
                        mc.getImgUrl(),
                        mc.isLimitedFlag(),
                        mc.getMemberCollection() != null && mc.getMemberCollection().getMemberId().equals(memberId)
                ))
                .collect(Collectors.toList());
    }

}
