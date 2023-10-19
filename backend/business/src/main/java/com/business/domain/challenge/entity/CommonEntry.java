package com.business.domain.challenge.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class CommonEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commonEntryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "common_challenge_id", nullable = false)
    private CommonChallenge commonChallenge;

    @Column(nullable = false)
    private int memberId;

    @Column(nullable = false, columnDefinition = "tinyint(1)")
    private boolean compFlag;

    @Column(nullable = false)
    @CreatedDate
    private LocalDate challengeDt;

    @Builder
    public CommonEntry(CommonChallenge commonChallenge, Integer memberId, boolean compFlag) {
        this.commonChallenge = commonChallenge;
        this.memberId = memberId;
        this.compFlag = compFlag;
    }

}
