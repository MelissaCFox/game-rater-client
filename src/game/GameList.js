import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getGames, orderGames, searchGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState("")
    const [order, setOrder] = useState("")

    useEffect(() => {
        if (searchTerm !== "") {
            searchGames(searchTerm).then(setGames)
        } else if (order !== "") {
            orderGames(order).then(setGames)
        } else {
            getGames().then(data => setGames(data))
        }
    }, [searchTerm, order])


    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>

            <div className="search-bar">
                <input className="input" type="text" placeholder="Search games" onKeyUp={(event) => setSearchTerm(event.target.value)}/>
            </div>

            <div className="order-options">
                <select onChange={(e) => setOrder(e.target.value)}>
                    <option value="">Order By</option>
                    <option value="designer">Designer (A-Z)</option>
                    <option value="year">Year Released (most recent first)</option>
                    <option value="playtime">Est. Playtime (short-long)</option>
                </select>

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