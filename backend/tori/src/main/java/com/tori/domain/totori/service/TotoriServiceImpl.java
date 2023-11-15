package com.tori.domain.totori.service;

import com.tori.domain.asset.entity.MemberAsset;
import com.tori.domain.asset.repository.MemberAssetRepository;
import com.tori.domain.collection.entity.MemberCollection;
import com.tori.domain.collection.entity.ToriCollection;
import com.tori.domain.collection.repository.MemberCollectionRepository;
import com.tori.domain.collection.repository.ToriCollectionRepository;
import com.tori.domain.totori.dto.response.TotoriResponse;
import com.tori.domain.totori.entity.Acorn;
import com.tori.domain.totori.entity.Totori;
import com.tori.domain.totori.repository.AcornRepository;
import com.tori.domain.totori.repository.TotoriRepository;
import com.tori.global.exception.ErrorCode;
import com.tori.global.exception.handler.ToriException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TotoriServiceImpl implements TotoriService {

    private final TotoriRepository totoriRepository;
    private final AcornRepository acornRepository;
    private final MemberAssetRepository memberAssetRepository;
    private final ToriCollectionRepository toriCollectionRepository;
    private final MemberCollectionRepository memberCollectionRepository;

    @Override
    public TotoriResponse<?> totori(Long memberId) {

        MemberAsset totoriTicket = memberAssetRepository.findMemberAssetByMemberIdAndAsset(memberId, "DAILY_TOTORI_TICKET");
        if (totoriTicket.getAssetCnt() < 1) {
            totoriTicket = memberAssetRepository.findMemberAssetByMemberIdAndAsset(memberId, "TOTORI_TICKET");
            if (totoriTicket.getAssetCnt() < 1) {
                throw new ToriException(ErrorCode.TOTORI_TICKET_NOT_ENOUGH);
            }
        }

        totoriTicket.pay(1);

        List<Totori> totoriList = totoriRepository.findAll();

        double random = Math.random();
        float percent = 0;
        int totoriCnt = 1;

        for (Totori totori : totoriList) {
            percent += totori.getPercent();
            if (random <= percent) {
                switch (totori.getContent()) {
                    case "TORI":
                        ToriCollection tori = toriCollectionRepository.findToriCollectionByLimitedFlagIsFalse();
                        getTori(memberId, tori);
                        return TotoriResponse.<ToriCollection>builder()
                                .totoriNm("TORI")
                                .item(tori)
                                .totoriCnt(totoriCnt)
                                .build();
                    case "DOTORI":
                        totoriCnt = getDotori();
                    default:
                        MemberAsset memberAsset = memberAssetRepository.findMemberAssetByMemberIdAndAsset(memberId, totori.getContent());
                        memberAsset.plus(totoriCnt);

                        return TotoriResponse.builder()
                                .totoriNm(totori.getContent())
                                .totoriCnt(totoriCnt)
                                .build();
                }
            }
        }

        throw new ToriException(ErrorCode.TOTORI_ERROR);
    }

    private int getDotori() {
        List<Acorn> acornList = acornRepository.findAll();

        double random = Math.random();
        float percent = 0;

        for (Acorn acorn : acornList) {
            percent += acorn.getPercent();
            if (random <= percent) {
                return acorn.getCnt();
            }
        }
        return 0;
    }

    private void getTori(Long memberId, ToriCollection toriCollection) {
        if (memberCollectionRepository.findMemberCollectionByMemberIdAndToriCollection(memberId, toriCollection).isEmpty()) {
            memberCollectionRepository.save(new MemberCollection(memberId, toriCollection));
        }
    }

}
