import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteGame, getGame } from "./GameManager.js"

export const GameDetail = (props) => {
    const [game, setGame] = useState([])
    const history = useHistory()
    const { gameId } = useParams()

    useEffect(() => {
        getGame(gameId).then(data => setGame(data))
    }, [])

    return (
        <>
            <section key={`game--${game.id}`} className="game">
                <div className="game__title">{game.title} by {game.designer}</div>
                <div className="game__year">Released in {game.year_released}</div>
                <div className="game__description">{game.description}</div>
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

                <div className="game__reviews">Reviews:
                    {
                        game.reviews?.map((review) => {
                            return <><div key={review.id} className="game__review">{review.review}</div>
                            <button onClick={() => history.push(`/games/${game.id}/review/${review.id}`)}>Edit</button>
                            </>
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