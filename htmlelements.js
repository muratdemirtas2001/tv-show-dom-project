const rootElem = document.getElementById("root");
let navbarContainer = document.createElement("div");
navbarContainer.classList.add("navbar-container");
let searchBarContainer = document.createElement("div");
searchBarContainer.classList.add("searchbar-container");

let selectEpisodeContainer = document.createElement("div");
selectEpisodeContainer.classList.add("selectepisode-container");

let selectShowContainer = document.createElement("div");
selectShowContainer.classList.add("selectepisode-container");

let episodeContainer = document.createElement("div");
let selectEpisode = document.createElement("select");
let selectShow = document.createElement("select");
let defaultOptionSelectEpisode = document.createElement("option");
let defaultOptionSelectShow = document.createElement("option");

defaultOptionSelectEpisode.innerText = "Please choose an episode";
defaultOptionSelectShow.innerText = "Please choose a show";

selectEpisode.appendChild(defaultOptionSelectEpisode);
selectShow.appendChild(defaultOptionSelectShow);
const labelSearchInput = document.createElement("label");
const labelSelectEpisode = document.createElement("label");
const labelSelectShow = document.createElement("label");

selectEpisode.classList.add("select-episode");
labelSearchInput.innerText = "Search your episode";
labelSearchInput.classList.add("label-searchinput");

labelSelectEpisode.innerText = "Choose your episode";
labelSelectEpisode.classList.add("label-selectepisode");

selectShow.classList.add("select-episode");
labelSelectShow.innerText = "Choose your Show";
labelSelectShow.classList.add("label-selectepisode");

const searchInput = document.createElement("input");
navbarContainer.appendChild(selectShowContainer);
navbarContainer.appendChild(selectEpisodeContainer);
navbarContainer.appendChild(searchBarContainer);
searchBarContainer.appendChild(labelSearchInput);
searchBarContainer.appendChild(searchInput);
selectEpisodeContainer.appendChild(labelSelectEpisode);
selectEpisodeContainer.appendChild(selectEpisode);
selectShowContainer.appendChild(labelSelectShow);
selectShowContainer.appendChild(selectShow);

let displayAllEpisodesButton = document.createElement("button");
displayAllEpisodesButton.innerText = "All episodes";
displayAllEpisodesButton.classList.add("display-all-button");
navbarContainer.appendChild(displayAllEpisodesButton);
let displayAllShowsButton = document.createElement("button");
displayAllShowsButton.innerText = "All shows";
displayAllShowsButton.classList.add("display-all-button");
navbarContainer.appendChild(displayAllShowsButton);
rootElem.appendChild(navbarContainer);
rootElem.appendChild(episodeContainer);

searchInput.classList.add("search-input");
const searchTotal = document.createElement("p");
searchTotal.classList.add("search-total");
navbarContainer.appendChild(searchTotal);

let footerContainer = document.createElement("footer");
rootElem.appendChild(footerContainer);
footerContainer.innerText = "Data on this site is taken from TV MAZE API";
footerContainer.classList.add("footer-container");
