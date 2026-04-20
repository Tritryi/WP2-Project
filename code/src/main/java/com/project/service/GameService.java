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
                File uploadFolder = new File(uploadDir);

                String originalFilename = image.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));

                String filename = uid+extension;
                Path path = Paths.get(uploadDir+filename);

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

    public List<Game> findGamesByName(String keyword){
        return gameRepository.findTop10ByNameContainingIgnoreCase(keyword);
    }
}
