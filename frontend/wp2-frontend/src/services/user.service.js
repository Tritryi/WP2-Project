export async function createUser(user){
    const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers : {"Content-type" : "application/json"},
        body: JSON.stringify(user)
    });
    return response;
}

export async function loginUser(user){
    const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers : {"Content-type": "application/json"},
        body: JSON.stringify(user)
    });
    return response;
}

export async function getUserByName(username){
    const response = await fetch(`http://localhost:8080/api/user/getUserByName?username=${username}`);
    return response.json();
}

export async function updateUser(newSettings){
    return await fetch("http://localhost:8080/api/user/updateUser", {
        method: "PUT",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSettings)
    });
}