package com.project.controller;


import com.project.entities.Game;
import com.project.entities.Review;
import com.project.service.GameService;
import com.project.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class GameController {

    @Autowired
    private GameService gameService;
    @Autowired
    private ReviewService reviewService;
    @GetMapping("/game/{id}")
    public String gameDetails(@PathVariable Long id, Model model){
        Game game = gameService.findById(id);
        List<Review> all_reviews = reviewService.findByGameId(id);
        model.addAttribute("game", game);
        model.addAttribute("reviews", all_reviews);
        return "games/gameDetails";
    }
}
