package com.tori.domain.collection.entity;

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
@Table(name = "tori_collection")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ToriCollection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Byte toriCollectionId;

	@Column(length = 10, unique = true, nullable = false)
	private String toriNm;

	@Column(nullable = false)
	private short price;

	@Column(length = 2048, nullable = false)
	private String imgUrl;

	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private boolean limitedFlag;

}
