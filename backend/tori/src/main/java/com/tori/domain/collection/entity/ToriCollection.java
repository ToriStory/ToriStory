package com.tori.domain.collection.entity;

import javax.persistence.*;

import com.tori.domain.collection.dto.response.CollectionRes;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@SqlResultSetMapping(
		name = "CollectionResMapping",
		classes = @ConstructorResult(
				targetClass = CollectionRes.class,
				columns = {
						@ColumnResult(name = "id", type = Byte.class),
						@ColumnResult(name = "toriName", type = String.class),
						@ColumnResult(name = "price", type = Integer.class),
						@ColumnResult(name = "imgUrl", type = String.class),
						@ColumnResult(name = "limitedFlag", type = Boolean.class),
						@ColumnResult(name = "collectionFlag", type = Boolean.class)
				}
		)
)
@NamedNativeQuery(
		name = "ToriCollection.findAllByMemberId",
		query = "SELECT t.tori_collection_id as id, t.tori_nm as toriName, t.price as price, t.img_url as imgUrl, t.limited_flag as limitedFlag, " +
				"(m.member_collection_id IS NOT NULL) as collectionFlag " +
				"FROM tori_collection t " +
				"LEFT JOIN member_collection m ON t.tori_collection_id = m.tori_collection_id AND m.member_id = :memberId " +
				"ORDER BY collectionFlag DESC, t.tori_collection_id",
		resultSetMapping = "CollectionResMapping"
)
@Table(name = "tori_collection")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ToriCollection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "TINYINT UNSIGNED")
	private Byte toriCollectionId;

	@Column(length = 10, unique = true, nullable = false)
	private String toriNm;

	@Column(nullable = false, columnDefinition = "SMALLINT UNSIGNED")
	private int price;

	@Column(length = 2048, nullable = false)
	private String imgUrl;

	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private boolean limitedFlag;

}
