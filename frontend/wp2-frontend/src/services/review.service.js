export async function addReview(review){
    const response = await fetch("http://localhost:8080/api/review/addReview", {
        method: "POST",
        body: review
    });
    return response;
}

export async function getReviewsOnGame(gameId){
    const response = await fetch(`http://localhost:8080/api/review/getByGame?gameId=${gameId}`);
    return response.json();
}