"use strict";

const apiKey = '1f10bd3195bf40e7b89a3c607aefcdef'

async function register(
    firstname,
    lastname,
    email,
    password
) {
    console.log(firstname);
    const response = await fetch('https://web2-courseproject-rayankhyare.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname,
            lastname,
            email,
            password
        })
    })
    console.log(response)
    return response
}

async function login(
    email,
    password
) {
    const response = await fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    return response
}

async function fetchAllGames() {
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
    const games = await response.json();
    return games;
}

export {
    register,
    login,
    fetchAllGames,
    apiKey
};