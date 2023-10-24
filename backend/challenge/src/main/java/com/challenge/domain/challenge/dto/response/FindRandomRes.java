package com.challenge.domain.challenge.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigInteger;

@Data
@Builder
public class FindRandomRes {

    private BigInteger id;

    private String content;

    private boolean compFlag;

    private String category;

}
