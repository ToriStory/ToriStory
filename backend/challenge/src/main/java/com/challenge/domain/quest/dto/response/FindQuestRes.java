package com.challenge.domain.quest.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindQuestRes {

    private int questNo;

    private String questTitle;

    private boolean compFlag;

    private boolean rewardFlag;

}
