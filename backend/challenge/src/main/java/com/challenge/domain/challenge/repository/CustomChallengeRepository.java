package com.challenge.domain.challenge.repository;

import com.challenge.domain.challenge.entity.CustomChallenge;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface CustomChallengeRepository extends JpaRepository<CustomChallenge, BigInteger> {

    @Query("select c from CustomChallenge c where c.content like %:keyword% order by c.scrapCnt desc")
    List<CustomChallenge> findAllByScrapCntWithCursor(String keyword, Pageable pageable);

    @Query("select c from CustomChallenge c where c.content like %:keyword% order by c.regDtm desc")
    List<CustomChallenge> findAllByRegDtmWithCursor(String keyword, Pageable pageable);

}
