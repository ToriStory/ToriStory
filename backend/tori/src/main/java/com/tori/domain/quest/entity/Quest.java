package com.tori.domain.quest.entity;

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
@Table(name = "quest")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
	private Byte questId;

	@Column(nullable = false, columnDefinition = "INT UNSIGNED")
	private Long memberId;

	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private boolean compFlag;

}
