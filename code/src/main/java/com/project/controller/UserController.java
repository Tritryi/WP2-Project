package com.project.controller;


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

        @PostMapping("/register")
        public User register(@RequestBody User user){
            return userService.createNewUser(user);
        }

        @PostMapping("/login")
        public ResponseEntity<User> login(@RequestBody User user){
            User auth =  userService.loginUser(user);
            if(auth != null){
                return ResponseEntity.ok(auth);
            }else{
                return ResponseEntity.status(401).build();
            }
        }
    }
