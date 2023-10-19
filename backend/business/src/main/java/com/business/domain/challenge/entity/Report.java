package com.business.domain.challenge.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reportId;

    @Column(nullable = false)
    private Integer reporterId;

    @Column(nullable = false)
    private Integer reportedId;

    @Column(nullable = false)
    private int reason;

    @Column(nullable = false)
    private Integer challengeId;

    @Builder
    public Report(Integer reporterId, Integer reportedId, int reason, Integer challengeId) {
        this.reporterId = reporterId;
        this.reportedId = reportedId;
        this.reason = reason;
        this.challengeId = challengeId;
    }

}
