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
    private Long memberId;

    @Column(nullable = false, unique = true, length = 320)
    private String email;

    @Column(nullable = false)
    private String pw;

    @Column(nullable = false, length = 8)
    private String nickname;

    @Column(nullable = false, length = 2048)
    private String imgUrl;

    @Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
    private Byte profile;

    @Builder
    public Member(String email, String pw, String nickname, String imgUrl, Byte profile) {
        this.email = email;
        this.pw = pw;
        this.nickname = nickname;
        this.imgUrl = imgUrl;
        this.profile = profile;
    }

    public void changePassword(String pw) {
        this.pw = pw;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changeProfile(String imgUrl, Byte profile) {
        this.imgUrl = imgUrl;
        this.profile = profile;
    }

}
