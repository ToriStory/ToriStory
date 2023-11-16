package com.challenge.domain.asset.entity;

import javax.persistence.*;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member_asset")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long memberAssetId;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Long memberId;

    @Column(nullable = false, columnDefinition = "SMALLINT UNSIGNED")
    private int assetCnt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    @Builder
    public MemberAsset(Long memberId, int assetCnt) {
        this.memberId = memberId;
        this.assetCnt = assetCnt;
    }

    public void pay(int price) {
        this.assetCnt -= price;
    }

    public void plus(int cnt) {
        this.assetCnt += cnt;
    }

}

