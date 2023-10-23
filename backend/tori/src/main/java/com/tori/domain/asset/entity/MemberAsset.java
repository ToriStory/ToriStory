package com.tori.domain.asset.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
	private Asset asset;

	@Builder
	public MemberAsset(Long memberId, int assetCnt) {
		this.memberId = memberId;
		this.assetCnt = assetCnt;
	}

}
