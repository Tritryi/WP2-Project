package com.project.entities;

public interface GameListProjection {
    Long getId();
    String getComment();
    int getGrade();
    GameSummary getGame();

    public interface GameSummary {
        Long getId();
        String getName();
        String getIllustration();
    }
}
