# Project : ViGamesList
This is a repository for an academic web programming project. The goal was to use a Spring Boot backend and any frontend technology to build a web application.
This project is finished since May 2026. For the frontend I chose to use React.

This project aims to create a web app that allows users to search and rate video games they played or want to play. Basically it takes the concept of IMDb but with video games. A user can add a game to his list, rate it, upload a review. Users can also customize their profile once they are logged in. Admins can add new games to the website. Anyone can search for games based on name/genres.

It is a forum about video games where user can search for information and interact with each others. I also added a "following" system.

Note : most of the css style was done with AI. The rest was built on my own.

# Project structure 
```
/code/ => all the Spring Boot backend code
/frontend/wp2-frontend/ => all the React frontend code
/task2/ => academic stuff (personas)
.gitignore => basic gitignore for unrelevant stuff

```

# Issues that I'm aware of 
- Security is not well configured, every user can make any type of request
- Variables are sometimes not relevant of their use
- Some optimization problems such as unused functions or components
- I should add comments









# Academic stuff
## User stories
- Any user can add a game to his personal list, give it a grade out of 10, write a review about this game and select a status (finished, plan to play, etc).
- An admin can add, delete or update games without having to deal with code, a specific page allows them to do that.
- Any user can search a game by its name or genres to access its page and see what other users wrote about it.
- Any user can customize his profile : picture, bio, display his reviews or keep it private.

## Wireframe
The wireframe for my project is accessible at [this address](https://www.figma.com/design/5f4VAA7yVJm3lzK4ta7qPX/WP2-Project?node-id=0-1&t=Wdugx0VIEvO5B8x1-1)

## Planning
The planning for the project is on Trello at [this address](https://trello.com/invite/b/69c5236e69b18c36bf2eeeb3/ATTI2c884a08a2a4d00051163e83125f91ccD9768621/wp2-planning)
