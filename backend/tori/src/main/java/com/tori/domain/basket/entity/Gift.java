package com.tori.domain.basket.entity;

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
@Table(name = "gift")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Gift {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Byte giftId;

	@Column(nullable = false)
	private String content;

}
