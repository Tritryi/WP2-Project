package com.project.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String synopsis;

    @Enumerated(EnumType.STRING)
    private Studio studio;
    private Double averageTimeToFinish;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Enumerated(EnumType.STRING)
    private GraphicEngine engine;

    @OneToMany(mappedBy = "game")
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();
}
