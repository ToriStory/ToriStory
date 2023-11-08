package com.tori.domain.collection.repository;

import com.tori.domain.collection.entity.MemberCollection;
import com.tori.domain.collection.entity.ToriCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberCollectionRepository extends JpaRepository<MemberCollection, Long> {

    Optional<MemberCollection> findMemberCollectionByMemberIdAndToriCollection(Long memberId, ToriCollection toriCollection);

}
