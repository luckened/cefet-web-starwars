// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from "./music.js";
import { restartAnimation } from "./restart-animation.js";

const API_ENDPOINT = "https://swapi.dev/api";

play(
    {
        audioUrl: "audio/tema-sw.mp3",
        coverImageUrl: "imgs/logo.svg",
        title: "Intro",
        artist: "John Williams",
    },
    document.body
);

const films = await fetch(API_ENDPOINT + "/films/")
    .then((item) => item.json())
    .catch((err) => {
        console.log(err);
    });

const sortedFilms = films.results.sort((a, b) => (a.episode_id > b.episode_id ? 1 : -1));

const roman = (int) => {
    const algarismos = {
        1: "I  ",
        2: "II ",
        3: "III",
        4: "IV ",
        5: "V  ",
        6: "VI ",
    };

    return algarismos[int];
};

const changeOpeningCrawl = (roman, title, content) => {
    const crawlContainer = document.getElementsByTagName("pre")[0];

    crawlContainer.innerHTML = `Episode ${roman}\n ${title.toUpperCase()}\n\n ${content}`;
    restartAnimation(crawlContainer);

    console.log(crawlContainer);
};

const sortedFilmsList = document.getElementById("filmes").children[0];
sortedFilmsList.innerHTML = "";

sortedFilms.map((item) => {
    const li = document.createElement("li");
    li.innerHTML = `Episode ${roman(item.episode_id)} - ${item.title}`;
    li.addEventListener("click", () =>
        changeOpeningCrawl(roman(item.episode_id), item.title, item.opening_crawl)
    );

    sortedFilmsList.appendChild(li);
});
