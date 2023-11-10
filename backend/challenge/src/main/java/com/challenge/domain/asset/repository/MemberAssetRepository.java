package com.challenge.domain.asset.repository;

import com.challenge.domain.asset.entity.MemberAsset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberAssetRepository extends JpaRepository<MemberAsset, Long> {

    Optional<MemberAsset> findByMemberId(Long memberId);

}
