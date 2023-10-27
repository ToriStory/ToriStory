package com.challenge.domain.challenge.repository;

import com.challenge.domain.challenge.entity.PhotoChallenge;
import com.challenge.domain.challenge.entity.PlaceChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoChallengeRepository extends JpaRepository<PhotoChallenge, Long> {

    @Query(value = "select * from photo_challenge order by rand() limit 1", nativeQuery = true)
    PhotoChallenge findByRandom();

}
