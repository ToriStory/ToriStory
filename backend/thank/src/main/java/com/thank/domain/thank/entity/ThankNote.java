package com.thank.domain.thank.entity;

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
public class ThankNote {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private BigInteger thankNoteId;

    @Column(length = 2100, nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDate createDt;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private long memberId;

    @Column(nullable = false, columnDefinition = "SMALLINT UNSIGNED")
    private int continueCnt;

    @PrePersist
    public void initCreateDt() {
        this.createDt = LocalDate.now();
    }

    @Builder
    public ThankNote(String content, long memberId, int continueCnt) {
        this.content = content;
        this.memberId = memberId;
        this.continueCnt = continueCnt;
    }

}
