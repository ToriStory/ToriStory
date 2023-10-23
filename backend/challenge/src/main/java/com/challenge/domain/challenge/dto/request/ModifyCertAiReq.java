package com.challenge.domain.challenge.dto.request;

import java.math.BigInteger;

import lombok.Data;

@Data
public class ModifyCertAiReq {

	private String imgUrl;

	private String challengeType;

	private BigInteger challengeId;

}
