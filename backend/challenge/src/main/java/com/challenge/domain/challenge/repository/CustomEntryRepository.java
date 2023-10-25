package com.challenge.domain.challenge.repository;

import com.challenge.domain.challenge.entity.CustomEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface CustomEntryRepository extends JpaRepository<CustomEntry, BigInteger> {

    @Query("select ce from CustomEntry ce join fetch ce.customChallenge where ce.memberId = :memberId order by ce.endDt")
    List<CustomEntry> findAllByMemberId(Long memberId);

    @Query("select ce from CustomEntry ce join fetch ce.customChallenge where ce.memberId = :memberId and ce.startDt <= current_date and ce.endDt >= current_date order by ce.endDt")
    List<CustomEntry> findAllByMemberIdAndEndDt(Long memberId);

}
