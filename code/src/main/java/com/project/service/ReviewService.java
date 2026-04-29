package com.project.service;


import com.project.entities.*;
import com.project.repository.GameRepository;
import com.project.repository.ReviewRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    public Review addReview(Long author_id, Long game_id,
                            Review review) {
        User author = userRepository.findById(author_id).orElseThrow();
        Game game = gameRepository.findById(game_id).orElseThrow();

        review.setAuthor(author);
        review.setGame(game);
        return  reviewRepository.save(review);
    }

    public List<ReviewProjection> findByGameId(Long gameId){
        return reviewRepository.findByGameId(gameId);
    }

    public List<GameListProjection> findByAuthorId(Long authorId){
        return reviewRepository.findByAuthorIdOrderByGradeDesc(authorId);
    }
}
