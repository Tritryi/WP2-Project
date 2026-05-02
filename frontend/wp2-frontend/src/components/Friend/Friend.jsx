import Avatar from "../Avatar";

function Friend({username, userPfp}){
    return(
        <div className="d-flex flex-column align-items-center">
            <Avatar imageLink={userPfp} owner={username} size="6em"/>
            <span>{username}</span>
        </div>
    )
}

export default Friend;