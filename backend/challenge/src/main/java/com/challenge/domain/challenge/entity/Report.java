package com.challenge.domain.challenge.entity;

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
    @Column(columnDefinition = "INT UNSIGNED")
    private Long reportId;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Long reporterId;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Long reportedId;

    @Column(nullable = false, columnDefinition = "TINYINT UNSIGNED")
    private byte reason;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="custom_challenge_id", nullable = false)
    private CustomChallenge customChallenge;

    @Builder
    public Report(Long reporterId, Long reportedId, byte reason, CustomChallenge customChallenge) {
        this.reporterId = reporterId;
        this.reportedId = reportedId;
        this.reason = reason;
        this.customChallenge = customChallenge;
    }

}
