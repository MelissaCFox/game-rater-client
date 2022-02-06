
export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)

    })
        .then(getGames)
}

export const updateGame = (id, game) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)

    })
        .then(getGames)
}

export const deleteGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(getGames)
}

export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const searchGames = (searchTerm) => {
    return fetch(`http://localhost:8000/games?q=${searchTerm}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const orderGames= (order) => {
    return fetch(`http://localhost:8000/games?order_by=${order}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

