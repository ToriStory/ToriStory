package com.tori.domain.basket.repository;

import com.tori.domain.basket.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {

    Optional<Basket> findByMemberIdAndOpenFlagIsFalse(Long memberId);

}
