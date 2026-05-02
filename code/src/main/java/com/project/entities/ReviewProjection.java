package com.project.entities;

public interface ReviewProjection {
    Long getId();
    String getComment();
    int getGrade();
    AuthorSummary getAuthor();

    public interface AuthorSummary {
        Long getId();
        String getUsername();
        String getProfilPicture();
    }
}
