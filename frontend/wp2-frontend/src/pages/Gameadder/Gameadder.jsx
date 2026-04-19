function Gameadder(){
    document.title = "Add a game";

    return (
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
        
        <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "400px" }}>
            
            <h2 className="text-center mb-4 fw-bold">Add a Game</h2>

            <form className="d-flex flex-column gap-3">
                
                {/* Name */}
                <div className="d-flex flex-column">
                    <label htmlFor="email" className="form-label small fw-bold">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Game name"
                        className="form-control border-secondary-subtle"
                    />
                </div>

                {/* Synopsis */}
                <div className="d-flex flex-column">
                    <label htmlFor="synopsis" className="form-label small fw-bold">Synopsis</label>
                    <textarea name="synopsis" 
                    id="synopsis"
                    className="form-control border-secondary-subtle"
                    />
                </div>

                {/* Studio */}
                <div className="d-flex flex-column">
                    <label htmlFor="studio" className="form-label small fw-bold">Studio</label>
                    <select name="studio" id="studio">
                        <option value="" selected="true">Select a studio</option>
                        <option value="UBISOFT">Ubisoft</option>
                        <option value="BLIZZARD">Blizzard</option>
                        <option value="VALVE">Valve</option>
                        <option value="HOYOVERSE">Hoyoverse</option>
                        <option value="ELECTRONIC_ARTS">Electronic Arts</option>
                        <option value="FROM_SOFTWARE">From Software</option>
                        <option value="BETHESDA">Bethesda</option>
                        <option value="SANDFALL">Sandfall</option>
                        <option value="RIOT_GAMES">Riot games</option>
                        <option value="INDY">Indy studio</option>
                    </select>
                </div>

                {/* Time to beat */}
                <div className="d-flex flex-column">
                    <label htmlFor="timeToFinish" className="form-label small fw-bold">Time to Finish</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Time to finish the game (0 if not applicable)"
                        className="form-control border-secondary-subtle"
                    />
                </div>

                {/* Genres */}
                <div className="d-flex flex-column">
                    <label htmlFor="genres" className="form-label small fw-bold">Genres</label>
                    <textarea name="genres" 
                    id="genres"
                    placeholder="Genres, please write as following : genre1, genre2,..."
                    className="form-control border-secondary-subtle"
                    />
                </div>

                {/* Graphic Engine */}
                <div className="d-flex flex-column">
                    <label htmlFor="engine" className="form-label small fw-bold">Studio</label>
                    <select name="engine" id="engine">
                        <option value="" selected="true">Select a graphic engine</option>
                        <option value="UNREAL_ENGINE_5">Unreal Engine</option>
                        <option value="SOURCE">Source</option>
                        <option value="UNITY">Unity</option>
                        <option value="PROPRIETARY">Proprietary</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3 py-2 fw-bold text-uppercase">
                    Sign In
                </button>

            </form>
        </div>
    </div>
    )
}
export default Gameadder;