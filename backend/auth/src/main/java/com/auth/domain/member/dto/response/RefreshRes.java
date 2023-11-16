package com.auth.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RefreshRes {

    private String accessToken;

    @Builder
    public RefreshRes(String accessToken) {
        this.accessToken = accessToken;
    }

}
