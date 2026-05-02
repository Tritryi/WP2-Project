package com.project.service;


import com.project.entities.Game;
import com.project.entities.Genre;
import com.project.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final String uploadDir = "/home/tritri/Documents/WP2/ProjectImages/gameIllus/";


    public Game save(Game game, MultipartFile image) {
        if(image!=null){
            try{
                String uid = UUID.randomUUID().toString();

                String originalFilename = image.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));

                String filename = uid+extension;
                Path path = Paths.get(uploadDir,filename);

                Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                game.setIllustration(filename);
            }catch(Exception e){
                throw new RuntimeException(e);
            }
        }
        return gameRepository.save(game);
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

    public List<Game> findGamesByNameOrGenre(String keyword){
        return gameRepository.findGamesByNameOrGenre(keyword, PageRequest.of(0, 10));
    }

    public void deleteById(Long id){
        gameRepository.deleteById(id);
    }

    public Game updateGame(Game updatedGame, MultipartFile image) {
        Game existingGame = gameRepository.findById(updatedGame.getId()).orElseThrow(() ->
                new RuntimeException("Game not found"));

        existingGame.setName(updatedGame.getName());
        existingGame.setSynopsis(updatedGame.getSynopsis());
        existingGame.setStudio(updatedGame.getStudio());
        existingGame.setAverageTimeToFinish(updatedGame.getAverageTimeToFinish());
        existingGame.setEngine(updatedGame.getEngine());
        existingGame.setGenres(updatedGame.getGenres());

        if(image!=null && !image.isEmpty()){
            try{
                Path existingImagePath = Paths.get(uploadDir+existingGame.getIllustration());
                Files.deleteIfExists(existingImagePath);

                String uid = UUID.randomUUID().toString();
                String originalFilename = image.getOriginalFilename();
                String extension = (originalFilename != null && originalFilename.contains("."))
                        ? originalFilename.substring(originalFilename.lastIndexOf('.'))
                        : ".jpg";

                String filename = uid+extension;
                Path path = Paths.get(uploadDir,filename);

                Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                existingGame.setIllustration(filename);

            }catch(IOException e){
                throw new RuntimeException(e);
            }
        }
        return gameRepository.save(existingGame);

    }
}
