package com.tori.domain.collection.repository;


import com.tori.domain.collection.dto.response.CollectionRes;
import com.tori.domain.collection.entity.ToriCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToriCollectionRepository extends JpaRepository<ToriCollection, Byte> {

    @Query(name = "ToriCollection.findAllByMemberId", nativeQuery = true)
    List<CollectionRes> findAllByMemberId(Long memberId);


}
