package com.tori.domain.basket.entity;

import java.time.LocalDate;

import javax.persistence.*;

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
	@JoinColumn(name = "letter_id", nullable = false)
	private Letter letter;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gift_id", nullable = false)
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
