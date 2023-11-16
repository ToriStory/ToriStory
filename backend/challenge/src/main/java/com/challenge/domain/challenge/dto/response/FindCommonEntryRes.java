package com.challenge.domain.challenge.dto.response;

import java.math.BigInteger;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindCommonEntryRes {

	private BigInteger commonChallengeId;

	private String content;

	private List<String> imgUrlList;

}
