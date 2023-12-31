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

    @Query("select c from CustomChallenge c where c.content like %:keyword% and c.displayFlag = true order by c.scrapCnt desc, c.customChallengeId asc")
    List<CustomChallenge> findAllByScrapCntWithCursor(String keyword, Pageable pageable);

    @Query("select c from CustomChallenge c where c.content like %:keyword% and c.displayFlag = true order by c.regDtm desc, c.customChallengeId asc")
    List<CustomChallenge> findAllByRegDtmWithCursor(String keyword, Pageable pageable);

}
