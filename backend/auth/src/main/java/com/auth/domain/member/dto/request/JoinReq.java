package com.auth.domain.member.dto.request;

import lombok.Getter;

@Getter
public class JoinReq {

    private String email;
    private String nickname;
    private String password;

}
