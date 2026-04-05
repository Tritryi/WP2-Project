package com.project.service;


import com.project.entities.Review;
import com.project.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public void save(Review review){
        reviewRepository.save(review);
    }

    public List<Review> findByGameId(Long gameId){
        return reviewRepository.findByGameId(gameId);
    }
}
