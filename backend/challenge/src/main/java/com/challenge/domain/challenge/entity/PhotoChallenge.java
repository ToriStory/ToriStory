package com.challenge.domain.challenge.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoChallenge {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer photoChallengeId;

    @Column(length = 20, nullable = false)
    private String content;

    @Column(length = 10, nullable = false)
    private String keyword;

}
