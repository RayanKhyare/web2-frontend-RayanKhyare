(()=>{"use strict";var e,a={965:(e,a,t)=>{t.d(a,{q1:()=>n,kc:()=>l});const n="0f742c4d7ba64f8f87a469a43cdc46aa";async function l(){const e=await fetch(`https://api.rawg.io/api/games?key=${n}`);return await e.json()}}},t={};function n(e){var l=t[e];if(void 0!==l)return l.exports;var s=t[e]={exports:{}};return a[e](s,s.exports,n),s.exports}n.d=(e,a)=>{for(var t in a)n.o(a,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:a[t]})},n.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),e=n(965),window.onload=function(){function a(){const e=document.getElementsByClassName("game");[].slice.call(e).forEach((e=>{e.addEventListener("click",(function(a){setTimeout(500),a.preventDefault();let t=e.nextSibling.id;window.location.href=`./gameinfo.html?id=${t}`}))}))}function t(){const e=document.getElementsByClassName("bookmark");Array.from(e).forEach((e=>{e.addEventListener("click",(function(a){let t=sessionStorage.getItem("userId"),n=e.id,l=e.parentElement.parentElement.parentElement.firstElementChild.src,s=e.previousSibling.outerText,r=e.parentElement.parentElement.lastElementChild.lastElementChild.lastElementChild.outerText;fetch("https://web2-courseproject-rayankhyare.herokuapp.com/games",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:t,gameId:n,gameImg:l,gameName:s,gameRelease:r})}).then((e=>e.json())),e.innerHTML="bookmark"}))}))}document.getElementById("searchinput").addEventListener("keyup",(async function(n){if(n.preventDefault(),"Enter"!==n.key)return;const l=document.getElementById("searchinput").value.replace(/ /g,"-").toLowerCase();let s=await fetch(`https://api.rawg.io/api/games?search=${l}&key=${e.q1}`);if(s.ok){let e=(await s.json()).results,n="";e.forEach((e=>{let a=e.name,t=e.background_image,l=e.released,s=document.getElementById("allgamescontainer");n+=`\n                    <div class="allgamesection">\n            <img class="img" src="${t}" alt="Avatar" style="width:100%">\n\n            <div class="allgametext">\n                <p class="allgametitle"><b class="title game">${a}</b><i class="material-icons bookmark" id="${e.id}">bookmark_border</i></p>\n                <p><b class="allgamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${l}</b></b></p>\n            </div>\n        </div>`,s.innerHTML=n})),a(),t()}else alert("error: "+response.status)})),(0,e.kc)().then((e=>{e.results.forEach((e=>{let a=e.name,t=e.background_image,n=e.released,l=document.getElementById("allgamescontainer"),s="";s+=`<div class="allgamesection">\n            <img class="img" id="img" src="${t}" alt="Avatar" style="width:100%">\n\n            <div class="allgametext">\n                <p class="allgametitle"><b class="title game" id="title">${a}</b><i class="material-icons bookmark game" id="${e.id}">bookmark_border</i></p>\n                <p><b class="allgamerelease" id="allgamerelease">Release date : <b class="allgamereleasedate" id="allgamereleasedate">${n}</b></b></p>\n\n            </div>\n\n        </div>`,l.insertAdjacentHTML("beforeend",s)})),a(),t()}))}})();