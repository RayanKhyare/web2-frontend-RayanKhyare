import {
    fetchAllGames,
    apiKey
} from './api.js'

window.onload = function () {
    allSearchGame()

    fetchAllGames().then(game => {
        let gameResult = game.results

        gameResult.forEach(game => {
            let gameName = game.name;
            let gameImg = game.background_image;
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
        moreInfoPage()
        postAllBookmarkedGame()
    })

    function moreInfoPage() {
        const games = document.getElementsByClassName("game");
        let gamesArray = [].slice.call(games);

        gamesArray.forEach(game => {
            game.addEventListener("click", function (e) {
                setTimeout(500)
                e.preventDefault();

                let gameId = game.nextSibling.id;


                //https://www.w3schools.com/js/js_window_location.asp
                window.location.href = `./gameinfo.html?id=${gameId}`;
            })
        })
    }

    function postAllBookmarkedGame() {
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
                moreInfoPage()
                postAllBookmarkedGame()

            } else {
                alert("error: " + response.status);
            }

        })


    }


}