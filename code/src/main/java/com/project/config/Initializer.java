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
        g1.setName("Clair Obscur");
        g1.setStudio(Studio.SANDFALL);
        g1.setSynopsis("Dive into the city of Lumière and find out the secrets behind the Gommage event");
        g1.setAverageTimeToFinish(30.0);
        g1.setEngine(GraphicEngine.UNREAL_ENGINE_5);
        g1.setGenre(Genre.RPG);
        gameService.save(g1);

        Game g2 = new Game();
        g2.setName("Far Cry 5");
        g2.setStudio(Studio.UBISOFT);
        g2.setSynopsis("Explore american Texas under a drug dealer dictature, free the land");
        g2.setAverageTimeToFinish(40.0);
        g2.setEngine(GraphicEngine.PROPRIETARY);
        g2.setGenre(Genre.RPG);
        gameService.save(g2);

        Game g3 = new Game();
        g3.setName("The Elder Scrolls V : Skyrim");
        g3.setStudio(Studio.BETHESDA);
        g3.setSynopsis("");
        g3.setAverageTimeToFinish(100.0);
        g3.setEngine(GraphicEngine.PROPRIETARY);
        g3.setGenre(Genre.RPG);
        gameService.save(g3);

        Game g4 = new Game();
        g4.setName("Overwatch");
        g4.setStudio(Studio.BLIZZARD);
        g4.setSynopsis("Select a role and fight other players, master your favorite character");
        g4.setAverageTimeToFinish(0.0);
        g4.setEngine(GraphicEngine.PROPRIETARY);
        g4.setGenre(Genre.FPS);
        gameService.save(g4);

        Game cs = new Game();
        cs.setName("Counter-Strike");
        cs.setStudio(Studio.VALVE);
        cs.setSynopsis("A tactical first-person shooter where two teams, Terrorists and Counter-Terrorists, compete in objective-based game modes.");
        cs.setAverageTimeToFinish(0.0);
        cs.setEngine(GraphicEngine.PROPRIETARY);
        cs.setGenre(Genre.FPS);
        gameService.save(cs);

        Game val = new Game();
        val.setName("Valorant");
        val.setStudio(Studio.RIOT_GAMES);
        val.setSynopsis("A character-based 5v5 tactical shooter set on a near-future Earth, combining precise gunplay with unique agent abilities.");
        val.setAverageTimeToFinish(0.0);
        val.setEngine(GraphicEngine.UNREAL_ENGINE_5);
        val.setGenre(Genre.FPS);
        gameService.save(val);


    }
}
