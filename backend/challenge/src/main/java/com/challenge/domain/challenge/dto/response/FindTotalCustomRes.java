package com.challenge.domain.challenge.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class FindTotalCustomRes {

	List<TotalCustomDto> totalCustomChallengeList;

	int nextCursor;

}
