"use strict";



// window.onload = function () {

//     const apiKey = '1f10bd3195bf40e7b89a3c607aefcdef'

//     async function fetchGames() {
//         const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=2021-11-01,2021-11-30&platforms=18,1,7`);
//         const movies = await response.json();
//         return movies;
//     }


//     fetchGames().then(game => {
//         console.log(game);

//         let gameResult = game.results

//         gameResult.forEach(game => {
//             console.log(game);

//             let gameName = game.name;
//             let gameImg = game.background_image;
//             let gameMetacritic = game.metacritic;
//             let gameRelease = game.released;


//             let container = document.getElementById("bodybigcontainer");
//             let htmlString = ""



//             htmlString += `  <div class="gamesection">
//         <img src="${gameImg}" alt="Avatar" style="width:100%">

//         <div class="gametext">
//             <p class="gametitle"><b>${gameName}</b></p>
//             <p><b class="gamerelease">Release date : ${gameRelease}</b></p>

//         </div>

//     </div>`
//             container.insertAdjacentHTML("beforeend", htmlString);
//         });

//     })

// }