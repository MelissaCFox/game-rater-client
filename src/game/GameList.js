import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getGames, searchGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        if (searchTerm !== "") {
            searchGames(searchTerm).then(setGames)
        } else {
            getGames().then(data => setGames(data))
        }
    }, [searchTerm])

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>

            <div className="search-bar">
                <input className="input" type="text" palceholder="Search games" onKeyUp={(event) => setSearchTerm(event.target.value)}/>
            </div>

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