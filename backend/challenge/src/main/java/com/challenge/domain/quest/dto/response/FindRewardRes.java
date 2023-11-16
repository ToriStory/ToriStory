package com.challenge.domain.quest.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindRewardRes {

    private boolean unclaimedRewards;

}
