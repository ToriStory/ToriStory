package com.tori.domain.collection.service;

import com.tori.domain.collection.dto.response.FindCollectionRes;
import com.tori.domain.collection.repository.ToriCollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CollectionServiceImpl implements CollectionService {

    private final ToriCollectionRepository toriCollectionRepository;

    @Override
    public List<FindCollectionRes> findCollection(Long memberId) {
        return toriCollectionRepository.findAllByMemberId(memberId);
    }
    
}
