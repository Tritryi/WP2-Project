import { Link } from "react-router-dom";
import Avatar from "../Avatar";

function Friend({userId, username, userPfp}){
    return(
        <Link className="d-flex flex-column align-items-center text-light" to={`/profile/${userId}`} style={{textDecoration: "none"}}>
            <Avatar imageLink={userPfp} owner={username} size="6em"/>
            <span>{username}</span>
        </Link>
    )
}

export default Friend;