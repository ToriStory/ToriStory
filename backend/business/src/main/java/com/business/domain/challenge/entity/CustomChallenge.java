package com.business.domain.challenge.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomChallenge {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customChallengeId;

    @Column(length = 20, nullable = false)
    private Integer memberId;

    @Column(length = 20, nullable = false)
    private String content;

    @Column(nullable = false)
    private int scrapCnt;

    @Column(nullable = false)
    private int reportCnt;

    @Builder
    public CustomChallenge(Integer memberId, String content) {
        this.memberId = memberId;
        this.content = content;
    }

}
