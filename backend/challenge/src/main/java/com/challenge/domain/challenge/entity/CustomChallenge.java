package com.challenge.domain.challenge.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomChallenge {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private BigInteger customChallengeId;

    @Column(length = 20, nullable = false, columnDefinition = "INT UNSIGNED")
    private Long memberId;

    @Column(length = 20, nullable = false)
    private String content;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private long scrapCnt;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private long reportCnt;

    @Column(nullable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date regDtm;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean displayFlag;

    @Builder
    public CustomChallenge(Long memberId, String content) {
        this.memberId = memberId;
        this.content = content;
    }

}
