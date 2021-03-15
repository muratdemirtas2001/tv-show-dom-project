//You can edit ALL of the code here
const rootElem = document.getElementById("root");
let episodeContainer = document.createElement("div");
let selectEpisode = document.createElement("select");
document.body.appendChild(selectEpisode);
const allEpisodes = getAllEpisodes();

allEpisodes.forEach((episode) => {
  let option = document.createElement("option");
  // console.log(option);
  option.setAttribute("value", episode.name);
  option.innerText = episode.name;
  selectEpisode.appendChild(option);
});
rootElem.appendChild(episodeContainer);
episodeContainer.parentNode.insertBefore(selectEpisode, episodeContainer);

selectEpisode.addEventListener("change", (e) => {
  let displaySelectedEpisode = allEpisodes.forEach((episode) => {
    console.log(e.target.value);

    if (episode.name === e.target.value) {
      episodeContainer.innerHTML = ``;
      let newEpisode = [episode];
      console.log(newEpisode);
      console.log(e.target.value);

      makePageForEpisodes(newEpisode);
      break;
    }
  });
  console.log(e.target.value);
});
addSearchBar();

function setup() {
  makePageForEpisodes(allEpisodes);
}

function addSearchBar() {
  const searchInput = document.createElement("input");
  episodeContainer.parentNode.insertBefore(searchInput, episodeContainer);
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
  // console.log(episodeList);
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
    episodeSummary.innerText = episode.summary;
    episodeSummary.classList.add("episodeSummary-paragraph");
  });

  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
window.onload = setup;
