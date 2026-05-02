package com.project.repository;

import com.project.entities.Game;
import com.project.entities.Genre;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    @Query("SELECT g FROM Game g JOIN g.genres genre WHERE genre = :genre")
    List<Game> findTop3ByGenre(@Param("genre") Genre genre);

    @Query("SELECT DISTINCT g FROM Game g LEFT JOIN g.genres gen " +
            "WHERE LOWER(g.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(gen) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Game> findGamesByNameOrGenre(@Param ("keyword") String keyword, Pageable pageable);
}
