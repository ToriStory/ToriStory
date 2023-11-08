package com.challenge.domain.challenge.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class CommonEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private BigInteger commonEntryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "common_challenge_id", nullable = false)
    private CommonChallenge commonChallenge;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Long memberId;

    @Column(nullable = false, columnDefinition = "tinyint(1)")
    private boolean compFlag;

    @Column(nullable = false)
    @CreatedDate
    private LocalDate challengeDt;

    @Column(length = 2048)
    private String imgUrl;

    @PrePersist
    public void prePersist() {
        this.challengeDt = LocalDate.now();
    }

    @Builder
    public CommonEntry(CommonChallenge commonChallenge, Long memberId, boolean compFlag) {
        this.commonChallenge = commonChallenge;
        this.memberId = memberId;
        this.compFlag = compFlag;
    }

    public void complete() {
        this.compFlag = true;
    }

    public void review(String imgUrl) {
        this.imgUrl = imgUrl;
    }

}
