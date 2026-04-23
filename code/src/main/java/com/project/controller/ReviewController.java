package com.project.controller;

import com.project.entities.Review;
import com.project.entities.Status;
import com.project.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/addReview")
    public Review addReview(
            @RequestParam(value = "author_id") Long author_id,
            @RequestParam(value = "game_id") Long game_id,
            @RequestParam(value = "status") String status,
            @RequestParam(value = "grade") int grade,
            @RequestParam(value = "review") String review
    ) {
        Review newReview = new Review();
        newReview.setGrade(grade);
        newReview.setStatus(Status.valueOf(status));
        newReview.setComment(review);
        return reviewService.addReview(author_id, game_id, newReview);
    }
}
