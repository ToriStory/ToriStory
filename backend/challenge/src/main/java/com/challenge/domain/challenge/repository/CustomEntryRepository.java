package com.challenge.domain.challenge.repository;

import com.challenge.domain.challenge.entity.CustomEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface CustomEntryRepository extends JpaRepository<CustomEntry, BigInteger> {

    @Query("select ce from CustomEntry ce join fetch ce.customChallenge where ce.memberId = :memberId and ce.delFlag = false order by ce.endDt desc")
    List<CustomEntry> findAllByMemberId(Long memberId);

    @Query("select ce from CustomEntry ce join fetch ce.customChallenge where ce.memberId = :memberId and ce.delFlag = false and ((ce.startDt <= current_date and ce.endDt >= current_date) or ce.endDt is null) order by ce.endDt nulls first, ce.endDt desc")
    List<CustomEntry> findAllByMemberIdAndEndDt(Long memberId);

}
