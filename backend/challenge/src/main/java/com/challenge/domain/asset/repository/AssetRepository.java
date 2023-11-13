package com.challenge.domain.asset.repository;

import com.challenge.domain.asset.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssetRepository extends JpaRepository<Asset, Byte> {

    Optional<Asset> findByAssetNm(String assetNm);

}
