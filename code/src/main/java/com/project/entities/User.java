package com.project.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // to create an account
    private String username;
    private String email;
    private String password;

    private String profilPicture;
    private String bio;
    private String computerSpecs;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToMany
    private List<Game> favoriteGames = new ArrayList<>();
}
