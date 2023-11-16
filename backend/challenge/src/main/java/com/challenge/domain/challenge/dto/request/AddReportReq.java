package com.challenge.domain.challenge.dto.request;

import java.math.BigInteger;

import javax.validation.constraints.NotNull;

import lombok.Getter;

@Getter
public class AddReportReq {

	@NotNull
	private BigInteger customChallengeId;

	@NotNull
	private byte reason;

}
