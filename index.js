/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    games.forEach((game) => {
        console.log(game);
        var newGame = document.createElement("div");
        newGame.classList.add("game-card");
        const gameImg = game.img;
        newGame.innerHTML = `<h3>${game.name}</h3><p>${game.description}</p> <p>${game.name} has ${game.backers} supporters.</p> <img class='game-img' src=${gameImg} />`;
        gamesContainer.appendChild(newGame);
    });
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

const contributionsCard = document.getElementById("num-contributions");

const totalBackers = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

contributionsCard.innerHTML = `${totalBackers.toLocaleString("en-US")}`;

const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce((acc, game) => {
    return acc + 1;
}, 0);

gamesCard.innerHTML = `${totalGames}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numUnfunded = GAMES_JSON.reduce((acc, game) => {
    if (game.pledged < game.goal) {
        return acc + 1;
    } else {
        return acc;
    }
}, 0);
// create a string that explains the number of unfunded games using the ternary operator
const unfundedStr = `A total of $${totalRaised.toLocaleString(
    "en-US"
)} has been raised for ${totalGames} games. Currently, ${numUnfunded} ${
    numUnfunded > 1 ? `games remain` : `game remains`
} unfunded. We need your help to fund these amazing games!`;
// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement("p");
paragraph.innerHTML = unfundedStr;
descriptionContainer.appendChild(paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
let game1 = document.createElement("p");
let game2 = document.createElement("p");
game1.innerHTML = firstGame.name;
game2.innerHTML = secondGame.name;
firstGameContainer.appendChild(game1);
secondGameContainer.appendChild(game2);
// do the same for the runner up item
