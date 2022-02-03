import React from "react"
import { Route } from "react-router-dom"
import { GameDetail } from "./game/GameDetail"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { ReviewForm } from "./game/ReviewForm"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>

            <Route exact path="/games">
                <GameList />
            </Route>

            <Route exact path="/games/:gameId(\d+)">
                <GameDetail />
            </Route>

            <Route exact path="/games/new">
                <GameForm />
            </Route>
            
            <Route exact path="/games/edit/:gameId(\d+)">
                <GameForm editGame={true} />
            </Route>

            <Route exact path="/games/:gameId(\d+)/review">
                <ReviewForm />
            </Route>

            <Route exact path="/games/:gameId(\d+)/review/:reviewId(\d+)">
                <ReviewForm editReview={true}/>
            </Route>

        </main>
    </>
}
