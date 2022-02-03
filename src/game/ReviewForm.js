import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createGame, getGame, getCategories, updateGame } from './GameManager.js'
import { createReview, getReview, updateReview } from "./ReviewManager.js"


export const ReviewForm = ({editReview}) => {
    const history = useHistory()
    const {gameId} = useParams()
    const {reviewId} = useParams()
    const [game, setGame] = useState({})


    useEffect(() => {
        getGame(gameId).then(setGame)
    },[gameId])

    useEffect(() => {
        if (editReview) {
            getReview(reviewId).then((res) => {
                const review = {
                    gameId: parseInt(gameId),
                    review: res.review
                }
                setCurrentReview(review)
            })
        }
    },[reviewId, editReview])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentReview, setCurrentReview] = useState({
        gameId: parseInt(gameId),
        review: ""
    })

    const changeReviewState = (event) => {
        const review = Object.assign({}, currentReview)
        review[event.target.name] = event.target.value
        setCurrentReview(review)
    }


    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title">{editReview ? "Edit Review" : `Review "${game.title}"`}</h2>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review: </label>
                    <input type="textarea" max="10" name="review" required autoFocus className="form-control"
                        value={currentReview.review}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>



            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()                   
                    // Send PUT/POST request to your API
                    editReview
                    ? updateReview(reviewId, currentReview)
                        .then(() => history.push(`/games/${gameId}`))
                    : createReview(currentReview)
                        .then(() => history.push(`/games/${gameId}`))
                }}
                className="btn btn-primary">{editReview ? "Update Review" : "Submit Review"}</button>
        </form>
    )
}