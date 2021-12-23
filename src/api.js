"use strict";

const apiKey = '0f742c4d7ba64f8f87a469a43cdc46aa'

async function register(
    firstname,
    lastname,
    email,
    password
) {

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
    apiKey,
    fetchAllGames
};