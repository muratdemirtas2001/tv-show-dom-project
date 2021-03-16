//You can edit ALL of the code here
//All html elements created are in htmlelement.js
const allEpisodes = getAllEpisodes();
//Calling setup function when window is onloaded
window.onload = setup();
// Declaring setup function which calls all other functions
function setup() {
  displayEpisodes(allEpisodes);
  displaySelectEpisode();
  addSearchBar();
  createAllEpisodesButton();
}
// Declaring function to create sections for  episodes.
function displayEpisodes(episodeList) {
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
  foundEpisodesText(episodeList);
}
//Declaring function to add searchbar features
function addSearchBar() {
  searchInput.addEventListener("input", (e) => {
    let searchInputValue = e.target.value;
    let episodeList = allEpisodes.filter((episode) => {
      let newName = episode.name.toUpperCase();
      let newSummary = episode.summary.toUpperCase();
      let newSearchInputValue = searchInputValue.toUpperCase();
      return (
        newName.includes(newSearchInputValue) ||
        newSummary.includes(newSearchInputValue)
      );
    });
    episodeContainer.innerHTML = ``;
    foundEpisodesText(episodeList);
    displayEpisodes(episodeList);
  });
}
//Declaring function to create all episode button's feature
function createAllEpisodesButton() {
  displayAllEpisodesButton.addEventListener("click", () => {
    episodeContainer.innerHTML = ``;
    displayEpisodes(allEpisodes);
  });
}
// Declaring function to display the episode chosen by using select dropdown element
function displaySelectEpisode() {
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
    displayEpisodes(newEpisode);
  });
}
//Declaring function to display number of episode found regarding with any query
function foundEpisodesText(episodeList) {
  searchTotal.innerText = "Total episode found:" + episodeList.length;
  if (episodeList.length === 0) {
    episodeContainer.innerText = "Sorry, please search again";
  }
}
