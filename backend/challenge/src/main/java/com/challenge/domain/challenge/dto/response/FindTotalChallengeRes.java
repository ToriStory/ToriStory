package com.challenge.domain.challenge.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FindTotalChallengeRes {

    private FindRandomRes randomRes;

    private List<FindCustomRes> customResList;

}
