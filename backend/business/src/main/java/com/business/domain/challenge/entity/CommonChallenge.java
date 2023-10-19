package com.business.domain.challenge.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class CommonChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commonChallengeId;

    @Column(nullable = false, length = 20)
    private String content;

    @Column(length = 5, nullable = false)
    private Category category;

    @Column(nullable = false, columnDefinition = "tinyint(1)")
    private boolean todayFlag;

}
