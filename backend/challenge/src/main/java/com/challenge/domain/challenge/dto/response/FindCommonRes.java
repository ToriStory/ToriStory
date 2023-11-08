package com.challenge.domain.challenge.dto.response;

import java.math.BigInteger;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindCommonRes {

	private BigInteger commonChallengeId;

	private String content;

	private boolean attendFlag;

	private int attendCnt;

	private boolean compFlag;

	private int compCnt;

	private List<Integer> unit;

}
