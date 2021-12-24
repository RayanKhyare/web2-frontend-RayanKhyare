import {
    apiKey
} from './api.js'

window.onload = function () {
    getBookmarkedGames()
    bookmarkSearchGame()

    // Delete a bookmarked game
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

    // Get all the bookmarked games of a user
    function getBookmarkedGames() {
        let container = document.getElementById("bookmarkedcontainer");
        let htmlString = ""
        let userId = sessionStorage.getItem("userId");

        fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/games/bookmarks/${userId}`, {
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
                deleteBookmarkedGames()
                moreInfoPageBookmark()
            })
    }

    // Redirect to a more info page of a game in the bookmark page
    function moreInfoPageBookmark() {
        const games = document.getElementsByClassName("gameBookmarked");

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

    // Redirect to a more info page while searching for a game in bookmark page
    function moreInfoPageBookmarkSearch() {
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

    // Search games in bookmark games
    function bookmarkSearchGame() {
        const searchGames = document.getElementById("searchinput")

        searchGames.addEventListener("keyup", async function (e) {
            e.preventDefault();
            if (e.key !== "Enter") return

            const searchValue = document.getElementById('searchinput').value;
            const valueReformat = searchValue.replace(/ /g, "-")
            const valueLowerCase = valueReformat.toLowerCase();


            let fetchResponse = await fetch(`https://api.rawg.io/api/games?search=${valueLowerCase}&key=${apiKey}`);

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
                    moreInfoPageBookmarkSearch()
                    postSearchedBookmarkedGame()

                })
            } else {
                alert("error: " + response.status);
            }
        })

    }


    // Bookmark a game that was searched in bookmark page
    function postSearchedBookmarkedGame() {
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
}