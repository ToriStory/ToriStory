package com.tori.domain.asset.repository;

import com.tori.domain.asset.entity.MemberAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<MemberAsset, Long> {

    @Query("select ma.assetCnt from MemberAsset ma join ma.asset a where ma.memberId = :memberId and a.assetNm = 'DOTORI'")
    int findDotoriCntByMemberId(Long memberId);

    @Query("select ma from MemberAsset  ma join fetch ma.asset a where a.assetNm = 'DOTORI'")
    MemberAsset findMemberAssetByAsset(Long memberId);

}
