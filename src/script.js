"use strict";

import {
    register,
    login,
    apiKey,
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
        postGames()
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
        postGames()
        moreInfoPage()

    })


    async function fetchAllGames() {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&ordering=added`);
        const games = await response.json();
        return games;
    }

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
        postGames()
        moreInfoPage()
    })

    function postGames() {

        const buttons = document.getElementsByClassName("bookmark");
        let buttonsArray = Array.from(buttons);

        buttonsArray.forEach(button => {
            button.addEventListener("click", function (e) {
                let userId = sessionStorage.getItem("userId");
                let gameId = button.id;
                let gameImg = button.parentElement.parentElement.parentElement.firstElementChild.src;
                let gameName = button.previousSibling.outerText;
                let gameRelease = button.parentElement.parentElement.lastElementChild.lastElementChild.lastElementChild.outerText;

                fetch('https://web2-courseproject-rayankhyare.herokuapp.com/games', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userId,
                        gameId: gameId,
                        gameImg: gameImg,
                        gameName: gameName,
                        gameRelease: gameRelease
                    })
                }).then(data => {
                    return data.json()
                })
                button.innerHTML = "bookmark";
            })
        })

    }



    function allSearchGame() {
        const searchGames = document.getElementById("searchinput")

        searchGames.addEventListener("keyup", async function (e) {
            e.preventDefault()
            if (e.key !== "Enter") return;
            const searchValue = document.getElementById('searchinput').value;
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
            //https://techstacker.com/how-to-replace-whitespace-javascript-regex/
            const valueReformat = searchValue.replace(/ /g, "-")
            const valueLowerCase = valueReformat.toLowerCase();

            let fetchResponse = await fetch(`https://api.rawg.io/api/games?search=${valueLowerCase}&key=${apiKey}`);

            if (fetchResponse.ok) {
                let data = await fetchResponse.json();

                let gameResults = data.results

                let htmlString = "";
                gameResults.forEach(game => {
                    let gameName = game.name;
                    let gameImg = game.background_image;
                    let gameRelease = game.released;

                    let container = document.getElementById("allgamescontainerBookmark");

                    htmlString += `
                    <div class="allgamesection">
            <img class="img" src="${gameImg}" alt="Avatar" style="width:100%">

            <div class="allgametext">
                <p class="allgametitle"><b class="title game">${gameName}</b><i class="material-icons bookmark" id="${game.id}">bookmark_border</i></p>
                <p><b class="allgamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${gameRelease}</b></b></p>
            </div>
        </div>`
                    container.innerHTML = htmlString
                })
                postGames()
                moreInfoPage()


            } else {
                alert("error: " + response.status);
            }
        })

    }


    allSearchGame()


    function moreInfoPage() {
        const games = document.getElementsByClassName("game");

        let gamesArray = [].slice.call(games);

        gamesArray.forEach(game => {
            game.addEventListener("click", function (e) {

                setTimeout(500)
                e.preventDefault();

                let gameId = game.nextSibling.id;
                window.location.href = `./gameinfo.html?id=${gameId}`;
            })
        })
    }
}