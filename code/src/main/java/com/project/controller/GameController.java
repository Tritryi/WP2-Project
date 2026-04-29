package com.project.controller;


import com.project.entities.Game;
import com.project.entities.Genre;
import com.project.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(value = "/addGame", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Game addGame(
            @ModelAttribute Game game,
            @RequestParam(value = "imageFile", required = false)MultipartFile image) {
        return gameService.save(game, image);
    }

    @DeleteMapping("/deleteGame")
    public void deleteGame(@RequestParam(name = "gameId") Long id) {
        gameService.deleteById(id);
    }
}
