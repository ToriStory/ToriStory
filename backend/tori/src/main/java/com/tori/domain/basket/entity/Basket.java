package com.tori.domain.basket.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
	private LocalDateTime sendDtm;

	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private boolean openFlag;

	@Builder
	public Basket(Long memberId, Letter letter, Gift gift, byte giftCnt, LocalDateTime sendDtm) {
		this.memberId = memberId;
		this.letter = letter;
		this.gift = gift;
		this.giftCnt = giftCnt;
		this.sendDtm = sendDtm;
	}

}
