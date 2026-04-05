package com.project.config;

import com.project.entities.*;
import com.project.repository.UserRepository;
import com.project.service.GameService;
import com.project.service.ReviewService;
import com.project.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class Initializer implements CommandLineRunner {
    private final GameService gameService;
    private final UserService userService;
    private final ReviewService reviewService;

    public Initializer(GameService gs,  UserService us, ReviewService rs) {
        this.gameService = gs;
        this.userService = us;
        this.reviewService = rs;
    }

    @Override
    public void run(String... args) throws Exception {
        gameService.deleteAll();
        Game g1 = new Game();
        g1.setName("Elden Ring");
        g1.setStudio(Studio.FROM_SOFTWARE);
        g1.setSynopsis("Fight great ennemies, level up, become the elden lord");
        g1.setAverageTimeToFinish(80.0);
        g1.setEngine(GraphicEngine.UNREAL_ENGINE_5);
        gameService.save(g1);

        Game g2 = new Game();
        g2.setName("Far Cry 5");
        g2.setStudio(Studio.UBISOFT);
        g2.setSynopsis("Explore american Texas under a drug dealer dictature, free the land");
        g2.setAverageTimeToFinish(40.0);
        g2.setEngine(GraphicEngine.PROPRIETARY);
        gameService.save(g2);

        User u1 = new User();
        u1.setUsername("Loxo");
        u1.setBio("hello world");
        userService.save(u1);

        Review r1 = new Review();
        r1.setGame(g1);
        r1.setAuthor(u1);
        r1.setComment("Nice game");
        r1.setGrade(10);
        reviewService.save(r1);


    }
}
