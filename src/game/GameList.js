import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { deleteGame, getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <Link className="nav-link" to={`/games/${game.id}`}>{game.title}</Link>
                        </section>
                    })
                }
            </article>
        </>
    )
}