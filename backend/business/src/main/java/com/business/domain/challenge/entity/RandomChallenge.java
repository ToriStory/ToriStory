package com.business.domain.challenge.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RandomChallenge {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer randomChallengeId;

    @Column(nullable = false)
    private Integer memberId;

    @Column(nullable = false)
    private Integer challengeId;

    @CreatedDate
    @Column(nullable = false)
    private LocalDate challengeDt;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean compFlag;

    @Column(length = 5, nullable = false)
    private Category category;

    @Builder
    public RandomChallenge(Integer memberId, Integer challengeId, Category category) {
        this.memberId = memberId;
        this.challengeId = challengeId;
        this.category = category;
    }

}
