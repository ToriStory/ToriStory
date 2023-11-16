package com.tori.domain.totori.repository;

import com.tori.domain.totori.entity.Acorn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcornRepository extends JpaRepository<Acorn, Byte> {

}
