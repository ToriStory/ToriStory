package com.tori.domain.collection.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member_collection")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberCollection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "INT UNSIGNED")
	private Long memberCollectionId;

	@Column(nullable = false, columnDefinition = "INT UNSIGNED")
	private Long memberId;

	@ManyToOne(fetch = FetchType.LAZY)
	private ToriCollection toriCollection;

}
