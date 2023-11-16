package com.tori.domain.basket.repository;

import com.tori.domain.basket.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Byte> {

    @Query(value = "select * from letter order by rand() limit 1", nativeQuery = true)
    Letter findLetterByRandom();

}
