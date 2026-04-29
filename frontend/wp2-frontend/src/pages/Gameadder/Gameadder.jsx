import { use, useState } from "react";
import { addGame } from "../../services/game.service";
import SearchGame from "../../components/SearchGame";
import Favorite from "../../components/Favorite";

function Gameadder(){
    document.title = "Add a game";
    const userData = localStorage.getItem("user");
    const ILLUSTRATION_URL = "http://localhost:8080/uploads/gameIllus/";

    const userLocal = JSON.parse(userData);
    if(userLocal.role != "ADMIN"){
        alert("You are not an admin");
        window.location.href = "/";
    }
    const [success, setSuccess] = useState("");
    const [fail, setFail] = useState("");

    const [name, setName] = useState("");
    const [gameImage, setGameImage] = useState(null);
    const [synopsis, setSynopsis] = useState("");
    const [studio, setStudio] = useState("");
    const [timeToFinish, setTimeToFinish]= useState(0);
    const [engine, setEngine] = useState("");

    const availableGenres = ["FPS", "RPG", "MOBA", "SOULLIKE", "TPS", 
        "NARRATIVE", "SIMULATOR", "MULTIPLAYER", "MANAGEMENT", "BUILDER",
        "SURVIVAL"
    ]
    const [genres, setGenres] = useState([]);

    const handleGenreChange = (genre) => {
        if(genres.includes(genre)){
            setGenres(genres.filter(g => g !== genre));
        }else{
            setGenres([...genres, genre]);
        }
    }

    const handleImageChange = (e) => {
        setGameImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("synopsis", synopsis);
        formData.append("studio", studio);
        formData.append("averageTimeToFinish", timeToFinish);
        formData.append("engine", engine);
        genres.forEach(g => {
            formData.append("genres", g);
        });
        if (gameImage){
            formData.append("imageFile", gameImage);
        }

        const response = await addGame(formData);
        if(response.ok){
            setSuccess("Game added successfuly");
            setTimeout(function() {
                window.location.href = "/addGame"
            }, 2000);
        }else{
            setFail("A problem occured");
            setTimeout(function() {
                setFail("");
            },3000);
        }
    }

    const  [selectedGame, setSelectedGame] = useState(null);
    const handleSelectGame = (gameData) => {
        setSelectedGame(gameData);
        console.log(gameData);
    }
    const handleDelete = async () => {
        if (!selectedGame) return;

        const confirm = window.confirm(`Are you sure you want to delete ${selectedGame.name} from database?`);
        if(confirm){
            try{
                console.log("Deleted game");
                setSuccess("Game deleted successfully");
            }catch(err){
                console.log(err);
            }
        }
    }


    return (
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5 gap-5">
        
        <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "400px" }}>
            
            <h2 className="text-center mb-4 fw-bold">Add a Game</h2>

            <form className="d-flex flex-column gap-3"
            onSubmit={handleSubmit}>
                
                {/* Name */}
                <div className="d-flex flex-column">
                    <label htmlFor="email" className="form-label small fw-bold">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Game name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control border-secondary-subtle"
                    />
                </div>

                {/* Illustration */}
                <div className="d-flex flex-column">
                    <label htmlFor="gameImage" className="form-label small fw-bold">Profil picture</label>
                    <input 
                        type="file" 
                        id="gameImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-control border-secondary-subtle"
                    />
                    <div className="form-text small text-muted">Format: JPG, PNG (Max 2MB)</div>
                </div>

                {/* Synopsis */}
                <div className="d-flex flex-column">
                    <label htmlFor="synopsis" className="form-label small fw-bold">Synopsis</label>
                    <textarea name="synopsis" 
                    id="synopsis"
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    className="form-control border-secondary-subtle"
                    />
                </div>

                {/* Studio */}
                <div className="d-flex flex-column">
                    <label htmlFor="studio" className="form-label small fw-bold">Studio</label>
                    <select name="studio" 
                    id="studio"
                    className="form-select"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}>
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
                        value={timeToFinish}
                        onChange={(e) => setTimeToFinish(e.target.value)}
                        placeholder="Time to finish the game (0 if not applicable)"
                        className="form-control border-secondary-subtle"
                    />
                </div>

                {/* Genres */}
                <div className="d-flex flex-column">
                <label className="form-label small fw-bold">Genres</label>
                <div className="row g-2 border rounded p-2 bg-light" style={{maxHeight: '150px', overflowY: 'auto'}}>
                {availableGenres.map(genre => (
                <div key={genre} className="col-6"> 
                        <div className="form-check">
                        <input 
                        className="form-check-input" 
                        type="checkbox" 
                        value={genre} 
                        id={genre}
                        checked={genres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                        />
                    <label className="form-check-label small" htmlFor={genre}>
                        {genre.replace('_', ' ')}
                    </label>
                    </div>
                </div>
                ))}
            </div>
        </div>

                {/* Graphic Engine */}
                <div className="d-flex flex-column">
                    <label htmlFor="engine" className="form-label small fw-bold">Studio</label>
                    <select name="engine" 
                    id="engine"
                    className="form-select"
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}>
                        <option value="" selected="true">Select a graphic engine</option>
                        <option value="UNREAL_ENGINE_5">Unreal Engine</option>
                        <option value="SOURCE">Source</option>
                        <option value="UNITY">Unity</option>
                        <option value="PROPRIETARY">Proprietary</option>
                    </select>
                </div>

                <div className='text-success text-lg-center fw-bold animate__animated animate__fadeIn'>{success}</div>
                <div className='text-danger text-lg-center fw-bold animate__animated animate__fadeIn'>{fail}</div>


                <button type="submit" className="btn btn-primary w-100 mt-3 py-2 fw-bold text-uppercase">
                    Add game
                </button>

            </form>
        </div>
        
        <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "400px" }}>
            
            <h2 className="text-center mb-4 fw-bold">Delete/Update a Game</h2>

                
                <SearchGame onItemClick={handleSelectGame}/>

                {
                    selectedGame && (
                        <div>
                            <Favorite name={selectedGame.name} imageLink={selectedGame.imageLink} handleDelete={null} showDelete={false}/>
                            
                            <button 
                                onClick={() => setSelectedGame(null)}
                                className={`btn btn-secondary w-100 mt-3 py-2 fw-bold text-uppercase`}
                                >
                                Unselect {selectedGame.name}
                            </button>
                        </div>
                        
                    )
                }
                <button 
                    type="button" 
                    onClick={handleDelete}
                    disabled={!selectedGame} 
                    className={`btn ${selectedGame ? 'btn-danger' : 'btn-secondary'} w-100 mt-3 py-2 fw-bold text-uppercase`}
                    >
                    {selectedGame ? `Delete ${selectedGame.name}` : "Select a game to delete"}
                </button>
                <button 
                    type="button" 
                    disabled={!selectedGame} 
                    className={`btn ${selectedGame ? 'btn-warning' : 'btn-secondary'} w-100 mt-3 py-2 fw-bold text-uppercase`}
                    >
                    {selectedGame ? `Update ${selectedGame.name}` : "Select a game to update"}
                </button>

            
        </div>
        
    </div>
    )
}
export default Gameadder;