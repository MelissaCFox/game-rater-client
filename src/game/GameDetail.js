import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteGame, getGame } from "./GameManager.js"
import { createRating, getRatings } from "./RatingManager.js"

export const GameDetail = (props) => {
    const [game, setGame] = useState([])
    const history = useHistory()
    const { gameId } = useParams()
    const [gameRating, setGameRating] = useState({
        gameId: parseInt(gameId),
        rating: 5
    })
    const [newRating, setNewRating] = useState(false)
    const [gameImage, setGameImage] = useState({
        gameId: parseInt(gameId),
        gameImage: ""
    })
    const [imgSrc, setImgSrc] = useState("")


    useEffect(() => {
        getGame(gameId).then(data => {
            setGame(data)
            if(data.images.length > 0){
                setImgSrc(data.images[0].image)
            }
        })
        
    }, [newRating])

    const setRating = (event) => {
        const copy = { ...gameRating }
        copy.rating = parseInt(event.target.value)
        setGameRating(copy)
    }

    const submitRating = () => {
        createRating(gameRating)
            .then(() => {
                setNewRating(!newRating)
                document.getElementById("gameRating").value = "5"
                const copy = { ...gameRating }
                copy.rating = 5
                setGameRating(copy)
            })
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            const copy = {...gameImage}
            copy.gameImage = base64ImageString
            setGameImage(copy)
        });
    }



    return (
        <>
            <section key={`game--${game.id}`} className="game">
                <div className="game__title">{game.title} by {game.designer}</div>
                <img src={imgSrc}></img>
                <div className="game__year">Released in {game.year_released}</div>
                <div className="game__description">{game.description}</div>
                <div className="game__averageRating">Average Player Rating: {game.average_rating}{game.average_rating === "No Ratings Yet" ? "" : "/10"}</div>
                <div className="game__ageRecommendation">Recommended Age: {game.age_recommendation}</div>
                <div className="game__estPlaytime">Est. Playtime: {game.est_playtime}</div>
                <div className="game__numberOfPlayers">Number of Players Needed: {game.number_of_players}</div>
                <div className="game__categories">Categories:
                    {
                        game.categories?.map((category) => {
                            return <div key={category.id} className="game__category">{category.label}</div>
                        })
                    }
                </div>

                <div className="userRating">Rate this Game:
                    <input type="range" min="1" max="10" defaultValue="5" className="slider" id="gameRating" onChange={setRating} />
                    ({gameRating.rating}/10)
                    <button onClick={submitRating}>Submit Rating</button>
                </div>

                <div>Upload an Image
                <input type="file" id="game_image" onChange={createGameImageString} />
                <input type="hidden" name="game_id" value={game.id} />
                <button onClick={() => {
                    // Upload the stringified image that is stored in state
                }}>Upload</button>
                </div>

                <div className="game__reviews">Reviews:
                    {
                        game.reviews?.map((review) => {
                            return <div key={review.id}><div className="game__review">{review.review}</div>
                                <button onClick={() => history.push(`/games/${game.id}/review/${review.id}`)}>Edit</button>
                            </div>
                        })
                    }
                </div>

                <button onClick={() => history.push(`/games/${game.id}/review`)}>Review</button>

                <button onClick={() => history.push(`/games/edit/${game.id}`)}>Edit</button>
                <button onClick={() => { deleteGame(game.id).then(setGame) }}>Delete</button>
            </section>
        </>
    )
}