package com.tori.domain.totori.repository;

import com.tori.domain.totori.entity.Totori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TotoriRepository extends JpaRepository<Totori, Byte> {

}
