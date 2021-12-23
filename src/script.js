"use strict";

import {
    register,
    login,
    fetchAllGames,
    apiKey
} from './api.js'


window.onload = function () {
    async function fetchGotm() {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&metacritic=75,100&dates=2021-11-01,2021-12-01`);
        const movies = await response.json();
        return movies;
    }

    fetchGotm().then(game => {

        let gameResult = game.results;

        gameResult.forEach(game => {
            let gameName = game.name;
            let gameImg = game.background_image;
            let gameRelease = game.released;

            let container = document.getElementById("novembergotm");
            let htmlString = "";

            htmlString += `<div class="gamesection">
       <img class="img" src="${gameImg}" alt="Avatar" style="width:100%">

       <div class="gametext">
            <p class="gametitle"><b class="title game">${gameName}</b><i class="material-icons bookmark game" id="${game.id}">bookmark_border</i></p>
             <p><b class="gamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${gameRelease}</b></b></p>
       </div>
    </div>
    `
            container.insertAdjacentHTML("beforeend", htmlString);
        });
        moreInfoPage()
    })

    async function fetchPopular() {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=2021-01-01,2021-12-31&ordering=-added`);
        const movies = await response.json();
        return movies;
    }

    fetchPopular().then(game => {
        let gameResult = game.results;
        gameResult.forEach(game => {
            let gameName = game.name;
            let gameImg = game.background_image;
            let gameRelease = game.released;

            let container = document.getElementById("populargames");
            let htmlString = "";

            htmlString += `   <div class="gamesection">
            <img class="img" src="${gameImg}" alt="Avatar" style="width:100%">

            <div class="gametext">
                <p class="gametitle"><b class="title game">${gameName}</b><i class="material-icons bookmark game" id="${game.id}">bookmark_border</i></p>
                <p><b class="gamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${gameRelease}</b></b></p>

            </div>

        </div>`
            container.insertAdjacentHTML("beforeend", htmlString);
        });
        moreInfoPage()
    })

    fetchAllGames().then(game => {
        let gameResult = game.results;

        gameResult.forEach(game => {
            let gameName = game.name;
            let gameImg = game.background_image;
            let gameRelease = game.released;

            let container = document.getElementById("allgames");
            let htmlString = "";

            htmlString += `<div class="gamesection">
            <img class="img" src="${gameImg}" alt="Avatar" style="width:100%">
     
            <div class="gametext">
                 <p class="gametitle"><b class="title game">${gameName}</b><i class="material-icons bookmark game" id="${game.id}">bookmark_border</i></p>
                  <p><b class="gamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${gameRelease}</b></b></p>
            </div>
     
         </div>`
            container.insertAdjacentHTML("beforeend", htmlString);
        });
        moreInfoPage()
    })

    function moreInfoPage() {
        const games = document.getElementsByClassName("game");
        let gamesArray = [].slice.call(games);
        console.log(gamesArray)
        gamesArray.forEach(game => {
            game.addEventListener("click", function (e) {
                setTimeout(500)
                e.preventDefault();

                let gameId = game.nextSibling.id;
                console.log(gameId)
                window.location.href = `./gameinfo.html?id=${gameId}`;
            })
        })
    }
}