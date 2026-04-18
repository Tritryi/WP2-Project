export async function getOneGame(gameId){
    const response = await fetch(`http://localhost:8080/api/game/get?gameId=${gameId}`);
    return response.json();
}

export async function getThreeGames(genre) {
    const response = await fetch(`http://localhost:8080/api/game/getThreeByGenre?genre=${genre}`);
    return response.json();
}

export async function getGamesByName(keyword){
    const response = await fetch(`http://localhost:8080/api/game/getByName?keyword=${keyword}`);
    return response.json();
}