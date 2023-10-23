package com.tori.domain.basket.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "basket")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Basket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "INT UNSIGNED")
	private Long basketId;

	@Column(nullable = false, columnDefinition = "INT UNSIGNED")
	private Long memberId;

	@OneToOne(fetch = FetchType.LAZY)
	private Letter letter;

	@OneToOne(fetch = FetchType.LAZY)
	private Gift gift;

	@Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
	private byte giftCnt;

	@Column(nullable = false)
	private LocalDate sendDt;

	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private boolean openFlag;

	@Builder
	public Basket(Long memberId, byte giftCnt, LocalDate sendDt) {
		this.memberId = memberId;
		this.giftCnt = giftCnt;
		this.sendDt = sendDt;
	}

}
