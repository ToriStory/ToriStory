package com.tori.domain.asset.repository;

import com.tori.domain.asset.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Byte> {

}
