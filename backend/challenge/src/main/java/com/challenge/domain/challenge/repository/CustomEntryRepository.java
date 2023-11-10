package com.challenge.domain.challenge.repository;

import com.challenge.domain.challenge.entity.CustomEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface CustomEntryRepository extends JpaRepository<CustomEntry, BigInteger> {

    @Query("select ce from CustomEntry ce join fetch ce.customChallenge where ce.memberId = :memberId and ce.delFlag = false order by ce.endDt desc")
    List<CustomEntry> findAllByMemberId(Long memberId);

    @Query("select ce from CustomEntry ce join fetch ce.customChallenge where ce.memberId = :memberId and ce.delFlag = false and ce.compFlag = true and ce.compDt = :date order by ce.endDt desc")
    List<CustomEntry> findAllByMemberIdAndDate(Long memberId, LocalDate date);

    @Query("select ce from CustomEntry ce join fetch ce.customChallenge where ce.memberId = :memberId and ce.delFlag = false and ((ce.startDt <= current_date and ce.endDt >= current_date) or ce.endDt is null) order by ce.endDt nulls first, ce.endDt desc")
    List<CustomEntry> findAllByMemberIdAndEndDt(Long memberId);

    @Query("select distinct ce.compDt from CustomEntry ce where ce.memberId = :memberId and ce.delFlag = false and ce.compFlag = true and extract(year from ce.compDt) = :year and extract(month from ce.compDt) = :month order by ce.compDt")
    List<LocalDate> findByCompDt(Long memberId, int year, int month);

    int countByMemberIdAndCompDt(Long memberId, LocalDate now);

}
