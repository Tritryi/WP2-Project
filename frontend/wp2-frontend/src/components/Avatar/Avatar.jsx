function Avatar({imageLink, owner, size = "250px"}){
    return(
        <img 
        src={imageLink} 
        alt={owner} 
        className="rounded border shadow-sm"
        style={{width: size, height: size, objectFit: 'cover', display: 'inline-block'}}/>
    )
}
export default Avatar;