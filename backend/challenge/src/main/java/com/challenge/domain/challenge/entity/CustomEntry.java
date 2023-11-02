package com.challenge.domain.challenge.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomEntry {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private BigInteger customEntryId;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="custom_challenge_id", nullable = false)
    private CustomChallenge customChallenge;

    @Column(nullable = false)
    private LocalDate startDt;

    private LocalDate endDt;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean compFlag;

    @Column(length = 2048)
    private String imgUrl;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean delFlag;

    @PrePersist
    public void initStartDt() {
        this.startDt = LocalDate.now();
    }

    @Builder
    public CustomEntry(Long memberId, CustomChallenge customChallenge, LocalDate endDt) {
        this.memberId = memberId;
        this.customChallenge = customChallenge;
        this.endDt = endDt;
    }

    public void complete() {
        this.compFlag = true;
    }

    public void modifyImage(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void remove() {
        this.delFlag = true;
    }

}
