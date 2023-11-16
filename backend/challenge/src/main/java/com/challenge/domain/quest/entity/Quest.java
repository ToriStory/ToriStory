package com.challenge.domain.quest.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quest {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private BigInteger questId;

    @Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
    private byte questNo;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Long memberId;

    @Column(columnDefinition = "tinyint(1) DEFAULT 0")
    private boolean compFlag;

    @Column(columnDefinition = "tinyint(1) DEFAULT 0")
    private boolean rewardFlag;

    @Builder
    public Quest(byte questNo, Long memberId) {
        this.questNo = questNo;
        this.memberId = memberId;
    }

    public void setRewardFlag(boolean rewardFlag) {
        this.rewardFlag = rewardFlag;
    }

}
