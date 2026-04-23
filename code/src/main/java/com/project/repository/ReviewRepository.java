package com.project.repository;

import com.project.entities.Review;
import com.project.entities.ReviewProjection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<ReviewProjection> findByGameId(Long gameId);
}
