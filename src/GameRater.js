import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { BrowserRouter } from "react-router-dom"

export const GameRater = () => (
    <>
        <BrowserRouter>
            <Route render={() => {
                if (localStorage.getItem("gr_token")) {
                    return <>
                        <Route>
                            <NavBar />
                            <ApplicationViews />
                        </Route>
                    </>
                } else {
                    return <Redirect to="/login" />
                }
            }} />

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>

        </BrowserRouter>
    </>
)
