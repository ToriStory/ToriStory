package com.tori.domain.collection.repository;


import com.tori.domain.collection.entity.ToriCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToriCollectionRepository extends JpaRepository<ToriCollection, Byte>, ToriCollectionRepositoryCustom {

}
