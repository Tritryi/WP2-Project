package com.project.controller;


import com.project.config.AuthResponse;
import com.project.config.JwUtils;
import com.project.entities.User;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api/user")
    @CrossOrigin(origins = "http://localhost:5173")
    public class UserController {
        @Autowired
        private UserService userService;
        @Autowired
        private JwUtils jwUtils;

        @PostMapping("/register")
        public User register(@RequestBody User user){
            return userService.createNewUser(user);
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody User user){
            System.out.println("I received : "+user.getEmail());
            User auth =  userService.loginUser(user);
            if(auth != null){
                String token = jwUtils.generateToken(auth.getUsername());
                return ResponseEntity.ok(new AuthResponse(token, auth));
            }else{
                return ResponseEntity.status(401).body("Invalid authentication");
            }
        }

        @GetMapping("/getUserByName")
        public User getUserByName(@RequestParam(name = "username") String username){
            return userService.getByUsername(username);
        }

        @PutMapping("/updateUser")
        public User updateUser(@RequestBody User user){
            return userService.updateUser(user, user.getId());
        }
    }
