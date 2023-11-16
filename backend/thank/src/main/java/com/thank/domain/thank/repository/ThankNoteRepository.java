package com.thank.domain.thank.repository;

import com.thank.domain.thank.dto.response.FindThankNoteStatisticsRes;
import com.thank.domain.thank.entity.ThankNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ThankNoteRepository extends JpaRepository<ThankNote, BigInteger> {

    @Query("select distinct tn.createDt from ThankNote tn where tn.memberId = :memberId and YEAR(tn.createDt) = YEAR(:date) and MONTH(tn.createDt) = MONTH(:date) order by tn.createDt")
    List<LocalDate> findCreateDtByCreateDt(Long memberId, LocalDate date);

    Optional<ThankNote> findByMemberIdAndCreateDt(Long memberId, LocalDate createDt);

    int countAllByMemberId(Long memberId);

    Optional<ThankNote> findDistinctByMemberIdAndCreateDt(Long memberId, LocalDate createDt);

}
