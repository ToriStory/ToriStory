package com.tori.domain.totori.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "acorn")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Acorn {

	@Id
	@GeneratedValue
	private Byte acornId;

	@Column(nullable = false)
	private byte cnt;

	@Column(nullable = false)
	private float percent;

}
