"use strict";



window.onload = function () {

    const apiKey = '1f10bd3195bf40e7b89a3c607aefcdef'

    function callRegister() {

        document.getElementById("form").addEventListener("submit", e => {

            const firstNameValue = document.getElementById("fname").value
            const lastNameValue = document.getElementById("lname").value
            const emailValue = document.getElementById("email").value
            const passwordValue = document.getElementById("password").value


            let registerForm = {
                firstname: firstNameValue,
                lastname: lastNameValue,
                email: emailValue,
                password: passwordValue
            }


            fetch('https://challenge-app-team-guillaume.herokuapp.com/challenges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: firstNameValue,
                    lastname: lastNameValue,
                    email: emailValue,
                    password: passwordValue
                })
            }).then(data => {
                return data.json()
            })

        })
    }

    async function fetchGotm() {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&metacritic=75,100&dates=2021-11-01,2021-12-01`);
        const movies = await response.json();
        return movies;
    }

    fetchGotm().then(game => {
        console.log(game);

        let gameResult = game.results

        gameResult.forEach(game => {
            console.log(game);

            let gameName = game.name;
            let gameImg = game.background_image;
            let gameMetacritic = game.metacritic;
            let gameRelease = game.released;

            let container = document.getElementById("novembergotm");
            let htmlString = "";

            htmlString += `   <div class="gamesection">
       <img src="${gameImg}" alt="Avatar" style="width:100%">

       <div class="gametext">
            <p class="gametitle"><b>${gameName}</b></p>
             <p><b class="gamerelease">Release date : ${gameRelease}</b></p>
       </div>

    </div>`
            container.insertAdjacentHTML("beforeend", htmlString);
        });
    })

    async function fetchPopular() {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=2021-01-01,2021-12-31&ordering=-added`);
        const movies = await response.json();
        return movies;
    }

    fetchPopular().then(game => {
        console.log(game);

        let gameResult = game.results

        gameResult.forEach(game => {
            console.log(game);

            let gameName = game.name;
            let gameImg = game.background_image;
            let gameMetacritic = game.metacritic;
            let gameRelease = game.released;

            let container = document.getElementById("populargames");
            let htmlString = ""

            htmlString += `   <div class="gamesection">
            <img src="${gameImg}" alt="Avatar" style="width:100%">

            <div class="gametext">
                <p class="gametitle"><b>${gameName}</b></p>
                <p><b class="gamerelease">Release date : ${gameRelease}</b></p>

            </div>

        </div>`
            container.insertAdjacentHTML("beforeend", htmlString);
        });
    })


    async function fetchAllGames() {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
        const movies = await response.json();
        return movies;
    }

    fetchAllGames().then(game => {
        console.log(game);

        let gameResult = game.results

        gameResult.forEach(game => {
            console.log(game);

            let gameName = game.name;
            let gameImg = game.background_image;
            let gameMetacritic = game.metacritic;
            let gameRelease = game.released;


            let container = document.getElementById("allgames");
            let htmlString = ""



            htmlString += `   <div class="gamesection">
            <img src="${gameImg}" alt="Avatar" style="width:100%">

            <div class="gametext">
                <p class="gametitle"><b>${gameName}</b></p>
                <p><b class="gamerelease">Release date : ${gameRelease}</b></p>

            </div>

        </div>`
            container.insertAdjacentHTML("beforeend", htmlString);
        });
    })

    fetchAllGames().then(game => {
        console.log(game);

        let gameResult = game.results

        gameResult.forEach(game => {
            console.log(game);

            let gameName = game.name;
            let gameImg = game.background_image;
            let gameMetacritic = game.metacritic;
            let gameRelease = game.released;


            let container = document.getElementById("allgamescontainer")
            let htmlString = ""



            htmlString += `<div class="allgamesection">
            <img src="${gameImg}" alt="Avatar" style="width:100%">

            <div class="allgametext">
                <p class="allgametitle"><b>${gameName}</b></p>
                <p><b class="allgamerelease">Release date : ${gameRelease}</b></p>

            </div>

        </div>`
            container.insertAdjacentHTML("beforeend", htmlString);
        });
    })

}