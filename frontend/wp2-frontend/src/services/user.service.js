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
        body: newSettings
    });
}

export async function addFriend(addFriendData){
    return await fetch("http://localhost:8080/api/user/addFriend", {
        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(addFriendData)
    })
}

export async function getFriendList(userId){
    const response = await fetch (`http://localhost:8080/api/user/getFriendList?userId=${userId}`);
    return response.json();
}