package com.challenge.domain.challenge.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class CommonChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private BigInteger commonChallengeId;

    @Column(nullable = false, length = 20)
    private String content;

    @Column(nullable = false, columnDefinition = "tinyint(1)")
    private boolean todayFlag;

    @Column(nullable = false, length = 20)
    private String unit;

    public void renewal() {
        this.todayFlag = !this.todayFlag;
    }

}
