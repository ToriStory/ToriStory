package com.auth.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginRes {

    private String accessToken;

    @Builder
    public LoginRes(String accessToken) {
        this.accessToken = accessToken;
    }

}
