package com.thank.domain.thank.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindThankNoteStatisticsRes {

    private int totalCnt;

    private int continueCnt;

}
