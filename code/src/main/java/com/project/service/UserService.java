package com.project.service;


import com.project.entities.Game;
import com.project.entities.Role;
import com.project.entities.User;
import com.project.repository.GameRepository;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final String uploadDir = "/home/tritri/Documents/WP2/ProjectImages/avatars/";

    public User createNewUser(User user){
        String hashedPwd = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPwd);
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    public User loginUser(User user){
        User userbymail  = userRepository.findByEmail(user.getEmail());
        if(userbymail != null && passwordEncoder.matches(user.getPassword(),userbymail.getPassword())){
            return userbymail;
        }
        return null;
    }

    public User getByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User updateUser(User incomingUser, Long currentId, MultipartFile avatar, List<Long> favoriteGamesIds){
        return userRepository.findById(currentId).map(existingUser -> {
            existingUser.setUsername(incomingUser.getUsername());
            existingUser.setBio(incomingUser.getBio());
            existingUser.setComputerSpecs(incomingUser.getComputerSpecs());

            if(favoriteGamesIds != null){
                List <Game> favorites = new ArrayList<>();
                for(Long favoriteGameId : favoriteGamesIds){
                    Game g =  gameRepository.findById(favoriteGameId).orElse(null);
                    if(g != null){
                        favorites.add(g);
                    }
                }
                existingUser.setFavoriteGames(favorites);
            }

            if (avatar != null && !avatar.isEmpty()) {
                try{
                    File uploadFolder = new File(uploadDir);

                    String filename = existingUser.getId() + "_avatar_" + avatar.getOriginalFilename();
                    Path path = Paths.get(uploadDir + filename);

                    Files.copy(avatar.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                    existingUser.setProfilPicture(filename);
                }catch (Exception e){
                    throw new RuntimeException(e);
                }
            }
            return userRepository.save(existingUser);

        }).orElse(null);
    }
}
