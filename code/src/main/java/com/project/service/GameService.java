package com.project.service;


import com.project.entities.Game;
import com.project.entities.Genre;
import com.project.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public void save(Game game) {
        gameRepository.save(game);
    }

    public void deleteAll() {
        gameRepository.deleteAllInBatch();
    }

    public Game findById(Long id){
        return gameRepository.findById(id).orElse(null);
    }

    public List<Game> findThreeByGenre(Genre genre) {
        return gameRepository.findTop3ByGenre(genre);
    }

    public List<Game> findGamesByName(String keyword){
        return gameRepository.findByNameContainingIgnoreCase(keyword);
    }
}
