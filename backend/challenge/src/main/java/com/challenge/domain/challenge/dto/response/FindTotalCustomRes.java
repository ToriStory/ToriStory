package com.challenge.domain.challenge.dto.response;

import java.math.BigInteger;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class FindTotalCustomRes {

	List<TotalCustomDto> totalCustomChallengeList;

	BigInteger nextCursor;

	int nextPage;

	boolean hasNext;

}
