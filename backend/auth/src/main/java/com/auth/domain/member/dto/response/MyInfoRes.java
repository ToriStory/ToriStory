package com.auth.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MyInfoRes {

    private String nickname;
    private String email;
    private String imgUrl;

    @Builder
    public MyInfoRes(String nickname, String email, String imgUrl) {
        this.nickname = nickname;
        this.email = email;
        this.imgUrl = imgUrl;
    }

}
