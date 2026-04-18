package com.project.service;


import com.project.entities.Role;
import com.project.entities.User;
import com.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

    public User updateUser(User incomingUser, Long currentId){
        if (currentId == null) return null;
        return userRepository.findById(currentId).map(existingUser -> {
            if(incomingUser.getUsername() != null) existingUser.setUsername(incomingUser.getUsername());
            if(incomingUser.getBio() != null) existingUser.setBio(incomingUser.getBio());
            if(incomingUser.getComputerSpecs() != null) existingUser.setComputerSpecs(incomingUser.getComputerSpecs());

            return userRepository.save(existingUser);
        }).orElse(null);
    }
}
