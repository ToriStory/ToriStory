package com.tori.domain.asset.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "asset")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Asset {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Byte assetId;

	@Column(length = 10, unique = true, nullable = false)
	private String assetNm;

}
