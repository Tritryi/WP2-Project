

function Profil(){
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if(!user){
        window.location.href = "/login";
        return null;
    }
    document.title = user.username+"'s profile"
    return(
        <div className="container">
            <h1>{user.username}</h1>
        </div>
    )
}

export default Profil;