package com.challenge.domain.challenge.entity;

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
public class CustomEntry {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customEntryId;

    @Column(nullable = false)
    private Integer memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="custom_challenge_id", nullable = false)
    private CustomChallenge customChallenge;

    @CreatedDate
    @Column(nullable = false)
    private LocalDate startDt;

    private LocalDate endDt;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean compFlag;

    @Column(length = 2048)
    private String imgUrl;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean delFlage;

    @Builder
    public CustomEntry(Integer memberId, CustomChallenge customChallenge, LocalDate endDt) {
        this.memberId = memberId;
        this.customChallenge = customChallenge;
        this.endDt = endDt;
    }

}
