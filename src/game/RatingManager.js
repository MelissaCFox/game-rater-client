export const createRating = (rating) => {
    return fetch("http://localhost:8000/ratings", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rating)

    })
        .then(getRatings)
}

export const getRatings = () => {
    return fetch("http://localhost:8000/ratings", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getRating= (id) => {
    return fetch(`http://localhost:8000/ratings/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const updateRating = (id, rating) => {
    return fetch(`http://localhost:8000/ratings/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rating)

    })
        .then(getRatings)
}

export const deleteRating = (id) => {
    return fetch(`http://localhost:8000/ratings/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(getRatings)
}