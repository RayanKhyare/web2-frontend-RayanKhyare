import {
    apiKey
} from './api.js'


window.onload = function () {
    fetchMoreInfo()
    async function fetchMoreInfo() {

        // https://easyautotagging.com/javascript-get-url-parameter/
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const gameId = urlParams.get('id');

      

        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
        const games = response.json()

        games.then(game => {

            let gameId = game.id
            let gameName = game.name;
            let gameImg = game.background_image;
            let gameMetacritic = game.metacritic;
            let gameRelease = game.released;
            let gameDescription = game.description_raw;
            let gameDeveloper = game.developers[0].name
            let gamePlatforms = [];
            let gameGenres = [];
            let gameScreens = [];


            game.platforms.forEach(platformsArray => {
                gamePlatforms.push(`${platformsArray.platform.name}`)
            })

            game.genres.forEach(genresArray => {
                gameGenres.push(` ${genresArray.name}`)
            })

            fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach(data => {
                        gameScreens.push(data.image)

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
        ${
            gameScreens.map(screen => (
                `<img src="${screen}" alt="Avatar"></img>`
            ))
        }
        
            </div>
        `
                    container.innerHTML = htmlString;
                })
        })
    }
}