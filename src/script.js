"use strict";
import {
    register
} from './api.js'


window.onload = function () {

    const apiKey = '0f742c4d7ba64f8f87a469a43cdc46aa';

    function postAllBookmarkedGame() {
        const buttons = document.getElementsByClassName("bookmark");
        let buttonsArray = Array.from(buttons);

        buttonsArray.forEach(button => {
            button.addEventListener("click", function (e) {

                console.log(button);

                let userId = '5';

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

    setTimeout(postAllBookmarkedGame, 500)


    function postSearchedBookmarkedGame() {
        const buttons = document.getElementsByClassName("bookmark");
        let buttonsArray = Array.from(buttons);

        buttonsArray.forEach(button => {
            button.addEventListener("click", function (e) {
                let userId = '5';

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
                alert('Game bookmarked !')
            })
        })
    }

    function deleteBookmarkedGames() {
        const buttons = document.getElementsByClassName("delete");
        let buttonsArray = [].slice.call(buttons);

        buttonsArray.forEach(button => {
            button.addEventListener("click", function (e) {

                fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/games/${button.id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        setTimeout(window.location.reload(), 100)
                    })
            })
        })
    }

    setTimeout(deleteBookmarkedGames, 500)

    function getBookmarkedGames() {
        let container = document.getElementById("bookmarkedcontainer");
        let htmlString = ""

        fetch('https://web2-courseproject-rayankhyare.herokuapp.com/games', {
                method: 'GET'
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                for (let i = data.length - 1; i >= 0; i--) {
                    htmlString = `
                    <div class="allgamesection">
                    <img class="img" src="${data[i].gameImg}" alt="Avatar" style="width:100%">

                    <div class="allgametext">
                        <p class="allgametitle "><b class="gameBookmarked" id="${data[i].gameId}">${data[i].gameName}</b><i class="material-icons delete game" id="${data[i]._id}">delete</i></p>
                        <p><b class="allgamerelease">Release date : ${data[i].gameRelease}</b></p>
                    </div>
                </div>
                   `
                    container.insertAdjacentHTML("beforeend", htmlString)
                }
            })
    }

    getBookmarkedGames()

    function allSearchGame() {
        const searchGames = document.getElementById("searchinput")

        searchGames.addEventListener("keyup", async function (e) {
            e.preventDefault()
            if (e.key !== "Enter") return;
            const searchValue = document.getElementById('searchinput').value;
            const valueReformat = searchValue.replace(/ /g, "-")
            const valueLowerCase = valueReformat.toLowerCase();



            let fetchResponse = await fetch(`https://api.rawg.io/api/games?search=${valueLowerCase}&key=${apiKey}`);

            if (fetchResponse.ok) {
                let data = await fetchResponse.json();

                let gameResults = data.results
                console.log(gameResults)

                let htmlString = "";
                gameResults.forEach(game => {
                    let gameName = game.name;
                    let gameImg = game.background_image;
                    let gameRelease = game.released;

                    let container = document.getElementById("allgamescontainer");

                    htmlString += `
                    <div class="allgamesection">
            <img class="img" src="${gameImg}" alt="Avatar" style="width:100%">

            <div class="allgametext">
                <p class="allgametitle"><b class="title game">${gameName}</b><i class="material-icons bookmark" id="${game.id}">bookmark_border</i></p>
                <p><b class="allgamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${gameRelease}</b></b></p>
            </div>
        </div>`
                    container.innerHTML = htmlString

                    // container.insertAdjacentHTML("beforeend", htmlString);
                })
            } else {
                alert("error: " + response.status);
            }
            setTimeout(postSearchedBookmarkedGame, 500)
        })

    }

    allSearchGame()

    function bookmarkSearchGame() {
        const searchGames = document.getElementById("searchinput")


        searchGames.addEventListener("keyup", async function (e) {
            e.preventDefault();
            if (e.key !== "Enter") return

            const searchValue = document.getElementById('searchinput').value;
            const valueReformat = searchValue.replace(/ /g, "-")
            const valueLowerCase = valueReformat.toLowerCase();


            let fetchResponse = await fetch(`https://api.rawg.io/api/games?search=${valueLowerCase}&key=${apiKey}`);
            console.log(fetchResponse.ok);
            if (fetchResponse.ok) {
                let data = await fetchResponse.json();

                let gameResults = data.results;

                let htmlString = "";
                gameResults.forEach(game => {
                    let gameName = game.name;
                    let gameImg = game.background_image;
                    let gameRelease = game.released;

                    let container = document.getElementById("bookmarkedcontainer");

                    htmlString += `
                    <div class="allgamesection">
            <img class="img" src="${gameImg}" alt="Avatar" style="width:100%">

            <div class="allgametext">
                <p class="allgametitle" ><b class="title game">${gameName}</b><i class="material-icons bookmark game" id="${game.id}">bookmark_border</i></p>
                <p><b class="allgamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${gameRelease}</b></b></p>

            </div>

        </div>`
                    container.innerHTML = htmlString;
                    // container.insertAdjacentHTML("beforeend", htmlString);
                })
            } else {
                alert("error: " + response.status);
            }
            setTimeout(postSearchedBookmarkedGame, 500)
        })

    }

    bookmarkSearchGame()


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

    function moreInfoPageBookmark() {
        const games = document.getElementsByClassName("gameBookmarked");
        console.log(games);
        let gamesArray = [].slice.call(games);

        gamesArray.forEach(game => {
            game.addEventListener("click", function (e) {
                setTimeout(500)
                e.preventDefault();

                let gameId = game.id;
                window.location.href = `./gameinfo.html?id=${gameId}`;
            })
        })

    }

    setTimeout(moreInfoPage, 800)
    setTimeout(moreInfoPageBookmark, 800)
    fetchMoreInfo()
    async function fetchMoreInfo() {

        // https://easyautotagging.com/javascript-get-url-parameter/
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const gameId = urlParams.get('id');

        console.log(gameId);


        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
        const games = response.json()

        games.then(game => {

            console.log(game);

            let gameName = game.name;
            let gameImg = game.background_image;
            let gameMetacritic = game.metacritic;
            let gameRelease = game.released;
            let gameDescription = game.description_raw;
            let gameDeveloper = game.developers[0].name
            let gamePlatforms = [];
            let gameGenres = [];

            game.platforms.forEach(platformsArray => {
                gamePlatforms.push(` ${platformsArray.platform.name}`)
            })

            game.genres.forEach(genresArray => {
                gameGenres.push(` ${genresArray.name}`)
            })

            let container = document.getElementById("bigcontainergame");
            let htmlString = "";


            htmlString += `   <div class="bodycontainergame">
            <div class="leftsidegameinfo">
                <div class="gameheader">
                    <div class="nameandscore">
                        <h2 class="gamename">${gameName}</h2>
                        <h2 class="metascore">${gameMetacritic}</h2>
                        
                    </div>
                    <h3 class="gamestudio">${gameDeveloper}</h3>
                </div>
                <h2 class="about">About</h2>
                <p class="gameinfo">${gameDescription}</p>
                <h2 class="releasedate_h2">Release date</h2>
                <h3 class="releasedate_h3">${gameRelease}</h3>

                <div class="release_platforms">
                    <div class="releasedate_div">
                        <h2 class="releasedate_h2">Platforms</h2>
                     
                        <h3 class="releasedate_h3">- ${gamePlatforms}</h3>

                    </div>

                    <div class="platforms_div">
                        <h2 class="releasedate_h2">Genres</h2>
                        <h3 class="releasedate_h3">- ${gameGenres}</h3>
    
                    </div>
                </div>
            </div>
            <div class="rightsidegameinfo">
                <img src="${gameImg}" class="bigimggame" alt="Avatar">
            </div>
        </div>
        <h2 class="pictures_h2">More pictures :</h2>
        <div class="pictures_gameinfo">
            <img src="Test" alt="Avatar">
            <img src="Test" alt="Avatar">
            <img src="Test" alt="Avatar">
            <img src="Test" alt="Avatar">
            <img src="Test" alt="Avatar">
            <img src="Test" alt="Avatar">
        </div>`
            container.innerHTML = htmlString;

        })
    }



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
    })



    async function fetchAllGames() {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
        const movies = await response.json();
        return movies;
    }
    fetchAllGames().then(game => {
        let gameResult = game.results;

        gameResult.forEach(game => {
            let gameName = game.name;
            let gameImg = game.background_image;
            let gameMetacritic = game.metacritic;
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
    })


    fetchAllGames().then(game => {
        let gameResult = game.results

        gameResult.forEach(game => {
            let gameName = game.name;
            let gameImg = game.background_image;
            let gameMetacritic = game.metacritic;
            let gameRelease = game.released;

            let container = document.getElementById("allgamescontainer");
            let htmlString = "";

            htmlString += `<div class="allgamesection">
            <img class="img" id="img" src="${gameImg}" alt="Avatar" style="width:100%">

            <div class="allgametext">
                <p class="allgametitle"><b class="title game" id="title">${gameName}</b><i class="material-icons bookmark game" id="${game.id}">bookmark_border</i></p>
                <p><b class="allgamerelease" id="allgamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${gameRelease}</b></b></p>

            </div>

        </div>`
            container.insertAdjacentHTML("beforeend", htmlString);
        });
    })

    // document.getElementById("signupForm").addEventListener("submit", async (e) => {
    //     e.preventDefault();

    //     const firstNameValue = document.getElementById("fname").value
    //     console.log(firstNameValue);
    //     const lastNameValue = document.getElementById("lname").value
    //     const emailValue = document.getElementById("email").value
    //     const passwordValue = document.getElementById("password").value

    //     const registerFetch = await register(
    //         firstNameValue,
    //         lastNameValue,
    //         emailValue,
    //         passwordValue
    //     )

    //     console.log(registerFetch);

    //     if (registerFetch.ok) {
    //         console.log('test');


    //     }
    //     window.location.href = "./signin.html"
    // })

    document.getElementById("signInForm").addEventListener("submit", e => {
        fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data) {
                    sessionStorage.setItem("userId", data._id);

                    window.location.href = "./index.html";
                } else {
                    console.log('Wrong password or email!');
                }
            })
    })

}