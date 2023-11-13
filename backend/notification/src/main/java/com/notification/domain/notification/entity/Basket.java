package com.notification.domain.notification.entity;
import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "basket")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long basketId;

    private Long memberId;

    private LocalDateTime sendDtm;

    private boolean openFlag;

}
