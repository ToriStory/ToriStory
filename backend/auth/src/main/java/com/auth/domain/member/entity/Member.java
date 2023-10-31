package com.auth.domain.member.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Integer memberId;

    @Column(nullable = false, unique = true, length = 320)
    private String email;

    @Column(nullable = false)
    private String pw;

    @Column(nullable = false, length = 8)
    private String nickname;

    @Column(nullable = false, length = 2048)
    private String imgUrl;

    @Builder
    public Member(String email, String pw, String nickname, String imgUrl) {
        this.email = email;
        this.pw = pw;
        this.nickname = nickname;
        // TODO: 추후 기본 이미지 경로 수정
        this.imgUrl = (imgUrl != null) ? imgUrl : "/img/default_profile.png";
    }

    public void changePassword(String pw) {
        this.pw = pw;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

}
