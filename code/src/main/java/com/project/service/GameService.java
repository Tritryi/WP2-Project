package com.project.service;


import com.project.entities.Game;
import com.project.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
