package com.auth.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginRes {

    private String accessToken;
    private String refreshToken;

    @Builder
    public LoginRes(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
