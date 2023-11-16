package com.challenge.domain.quest.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindTotalQuestDto {

    private boolean compFlag;

    private boolean rewardFlag;

}
