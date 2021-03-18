const rootElem = document.getElementById("root");
let navbarContainer = document.createElement("div");
navbarContainer.classList.add("navbar-container");
let searchBarContainer = document.createElement("div");
searchBarContainer.classList.add("searchbar-container");

let selectEpisodeContainer = document.createElement("div");
selectEpisodeContainer.classList.add("selectepisode-container");

let episodeContainer = document.createElement("div");
let selectEpisode = document.createElement("select");
let defaultOption=document.createElement("option")
defaultOption.innerText="Please choose an episode"
selectEpisode.appendChild(defaultOption)
const labelSearchInput = document.createElement("label");
const labelSelectEpisode = document.createElement("label");

selectEpisode.classList.add("select-episode");
labelSearchInput.innerText = "Search your episode";
labelSearchInput.classList.add("label-searchinput");

labelSelectEpisode.innerText = "Choose your episode";
labelSelectEpisode.classList.add("label-selectepisode");

const searchInput = document.createElement("input");
navbarContainer.appendChild(searchBarContainer);
navbarContainer.appendChild(selectEpisodeContainer);
searchBarContainer.appendChild(labelSearchInput);
searchBarContainer.appendChild(searchInput);
selectEpisodeContainer.appendChild(labelSelectEpisode);
selectEpisodeContainer.appendChild(selectEpisode);

let displayAllEpisodesButton = document.createElement("button");
displayAllEpisodesButton.innerText = "All episodes";
displayAllEpisodesButton.classList.add("display-all-button");
navbarContainer.appendChild(displayAllEpisodesButton);
rootElem.appendChild(navbarContainer);
rootElem.appendChild(episodeContainer);

searchInput.classList.add("search-input");
const searchTotal = document.createElement("p");
searchTotal.classList.add("search-total");
navbarContainer.appendChild(searchTotal);
