//You can edit ALL of the code here
const rootElem = document.getElementById("root");
let navbarContainer = document.createElement("div");
navbarContainer.classList.add("navbar-container")
let searchBarContainer = document.createElement("div");
searchBarContainer.classList.add("searchbar-container");

let selectEpisodeContainer = document.createElement("div");
selectEpisodeContainer.classList.add("selectepisode-container");

let episodeContainer = document.createElement("div");
let selectEpisode = document.createElement("select");
const labelSearchInput = document.createElement("label");
const labelSelectEpisode = document.createElement("label");

labelSearchInput.innerText = "Search your episode";
labelSearchInput.classList.add("label-searchinput");

labelSelectEpisode.innerText = "Choose your episode";
labelSelectEpisode.classList.add("label-selectepisode");

const searchInput = document.createElement("input");
navbarContainer.appendChild(searchBarContainer)
navbarContainer.appendChild(selectEpisodeContainer)
searchBarContainer.appendChild(labelSearchInput);
searchBarContainer.appendChild(searchInput);
selectEpisodeContainer.appendChild(labelSelectEpisode);

selectEpisodeContainer.appendChild(selectEpisode);
// document.body.appendChild(navbarContainer);
rootElem.appendChild(navbarContainer);
rootElem.appendChild(episodeContainer);
// document.body.appendChild(selectEpisode);
// episodeContainer.parentNode.insertBefore(selectEpisode, episodeContainer);
// episodeContainer.parentNode.insertBefore(searchInput, episodeContainer);

const allEpisodes = getAllEpisodes();
allEpisodes.forEach((episode) => {
  let option = document.createElement("option");
  option.setAttribute("value", episode.name);
  option.innerText = episode.name;
  selectEpisode.appendChild(option);
});

selectEpisode.addEventListener("change", (e) => {
  let displaySelectedEpisode = allEpisodes.filter((episode) => {
    return episode.name === e.target.value;
  });
  episodeContainer.innerHTML = ``;
  let newEpisode = displaySelectedEpisode;
  makePageForEpisodes(newEpisode);
});

addSearchBar();

function setup() {
  makePageForEpisodes(allEpisodes);
}

function addSearchBar() {
  searchInput.classList.add("search-input");
  const searchTotal = document.createElement("p");
  rootElem.appendChild(searchTotal);
  searchInput.addEventListener("input", (e) => {
    let searchInputValue = e.target.value;
    // console.log(searchInputValue);

    let episodeList = allEpisodes.filter((episode) => {
      // console.log(episode.name.includes("Winter"));
      console.log(searchInputValue);
      let newName = episode.name.toUpperCase();
      let newSummary = episode.summary.toUpperCase();
      let newSearchInputValue = searchInputValue.toUpperCase();
      return (
        newName.includes(newSearchInputValue) ||
        newSummary.includes(newSearchInputValue)
      );
    });
    episodeContainer.innerHTML = ``;
    searchTotal.innerText = "Total episode found:" + episodeList.length;
    if (episodeList.length === 0) {
      episodeContainer.innerText = "Sorry, please search again";
    } else {
      makePageForEpisodes(episodeList);
    }
  });
}

function makePageForEpisodes(episodeList) {
  const episodeSection = document.createElement("section");
  episodeContainer.appendChild(episodeSection);
  episodeSection.classList.add("episode-section");
  episodeList.forEach((episode) => {
    let episodeDiv = document.createElement("div");
    episodeSection.appendChild(episodeDiv);
    episodeDiv.classList.add("episode-div");

    let episodeNameParagraph = document.createElement("p");
    episodeDiv.appendChild(episodeNameParagraph);
    let showSeason;
    let showNumber;
    if (episode.season < 10) {
      showSeason = `0${episode.season}`;
    } else {
      showSeason = episode.season;
    }
    if (episode.number < 10) {
      showNumber = `0${episode.number}`;
    } else {
      showNumber = episode.number;
    }
    episodeNameParagraph.innerText = `${episode.name}-S${showSeason}E${showNumber}`;
    episodeNameParagraph.classList.add("episodeName-paragraph");

    let episodeImage = document.createElement("img");
    episodeImage.src = episode.image.original;
    episodeDiv.appendChild(episodeImage);
    episodeImage.classList.add("episode-image");

    let episodeSummary = document.createElement("p");
    episodeDiv.appendChild(episodeSummary);
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.classList.add("episodeSummary-paragraph");
  });

  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
window.onload = setup;
