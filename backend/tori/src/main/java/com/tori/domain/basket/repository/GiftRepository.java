package com.tori.domain.basket.repository;

import com.tori.domain.basket.entity.Gift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GiftRepository extends JpaRepository<Gift, Byte> {

    @Query(value = "select * from gift order by rand() limit 1", nativeQuery = true)
    Gift findGiftByRandom();

}
