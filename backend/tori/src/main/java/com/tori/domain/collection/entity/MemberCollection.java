package com.tori.domain.collection.entity;

import javax.persistence.*;

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
	@JoinColumn(name = "tori_collection_id", nullable = false)
	private ToriCollection toriCollection;

}
