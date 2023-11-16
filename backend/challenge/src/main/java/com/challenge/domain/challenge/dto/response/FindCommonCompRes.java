package com.challenge.domain.challenge.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindCommonCompRes {

	private boolean compFlag;

	private int compCnt;

}
