package com.tori.domain.totori.entity;

import javax.persistence.*;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "acorn")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Acorn {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "TINYINT UNSIGNED")
	private Byte acornId;

	@Column(nullable = false, columnDefinition = "SMALLINT UNSIGNED")
	private int cnt;

	@Column(nullable = false)
	private float percent;

}
