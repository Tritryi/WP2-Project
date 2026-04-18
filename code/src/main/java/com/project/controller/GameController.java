package com.project.controller;


import com.project.entities.Game;
import com.project.entities.Genre;
import com.project.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {
    @Autowired
    private GameService gameService;

    @GetMapping("/get")
    public Game getGameById(@RequestParam(name = "gameId") Long id) {
        return gameService.findById(id);
    }

    @GetMapping("/getThreeByGenre")
    public List<Game> getThreeByGenre(@RequestParam(name = "genre") Genre genre) {
        return gameService.findThreeByGenre(genre);
    }

    @GetMapping("/getByName")
    public List<Game> getByName(@RequestParam(name = "keyword") String keyword) {
        return gameService.findGamesByName(keyword);
    }
}
