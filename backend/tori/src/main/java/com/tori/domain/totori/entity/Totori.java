package com.tori.domain.totori.entity;

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
@Table(name = "totori")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Totori {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Byte totoriId;

	@Column(length = 10, nullable = false)
	private String content;

	@Column(nullable = false)
	private float percent;

}
