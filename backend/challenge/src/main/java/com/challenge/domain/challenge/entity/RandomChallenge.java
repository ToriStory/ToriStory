package com.challenge.domain.challenge.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RandomChallenge {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private BigInteger randomChallengeId;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Long memberId;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Long challengeId;

    @CreatedDate
    @Column(nullable = false)
    private LocalDate challengeDt;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean compFlag;

    @Enumerated(EnumType.STRING)
    @Column(length = 5, nullable = false)
    private Category category;

    @PrePersist
    public void prePersist() {
        this.challengeDt = LocalDate.now();
    }

    @Builder
    public RandomChallenge(Long memberId, Long challengeId, Category category) {
        this.memberId = memberId;
        this.challengeId = challengeId;
        this.category = category;
    }

    public void renewal(Category category, Long challengeId) {
        this.category = category;
        this.challengeId = challengeId;
    }

    public void complete() {
        this.compFlag = true;
    }

}
