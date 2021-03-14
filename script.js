//You can edit ALL of the code here
const rootElem = document.getElementById("root");
let episodeContainer = document.createElement("div");
addSearchBar();

rootElem.appendChild(episodeContainer);

const allEpisodes = getAllEpisodes();

function setup() {
  // addSearchbarEvent();
  makePageForEpisodes(allEpisodes);
}

function addSearchBar() {
  const searchInput = document.createElement("input");
  rootElem.appendChild(searchInput);
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
    searchTotal.innerText="Total episode found:"+episodeList.length
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
  console.log(episodeList);
  episodeList.forEach((episode) => {
    let episodeDiv = document.createElement("div");
    episodeSection.appendChild(episodeDiv);
    episodeDiv.classList.add("episode-div");

    let episodeNameParagraph = document.createElement("p");
    episodeDiv.appendChild(episodeNameParagraph);
    if (episode.season < 10) {
      episode.season = `0${episode.season}`;
    }
    if (episode.number < 10) {
      episode.number = `0${episode.number}`;
    }
    episodeNameParagraph.innerText = `${episode.name}-S${episode.season}E${episode.number}`;
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
