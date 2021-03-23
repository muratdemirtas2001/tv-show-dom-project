//You can edit ALL of the code here
//All html elements created are in htmlelements.js
//fetching data

let isSearchUsed;
let searchValue;
displayAllShowsButtonsClicked = true;
let allShows = getAllShows();
addShowsToSelectShowElement(allShows);
displayShowsEpisodes(allShows);
createButtonFeature(displayAllShowsButton, allShows);
disableElement(selectEpisode);
disableElement(searchInput);

function disableElement(element) {
  element.disabled = true;
}

function enableElement(element) {
  element.disabled = false;
}

function sortShowByName(allShows) {
  allShows.sort((firstname, nextname) =>
    firstname.name.localeCompare(nextname.name)
  );
}

function addShowsToSelectShowElement(allShows) {
  sortShowByName(allShows);
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.setAttribute("value", show.name);
    option.innerText = show.name;
    selectShow.appendChild(option);
  });
}
function fetchSeasonData(showId) {
  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      // displayEpisodes(data);
      displayShowsEpisodes(data);
      displaySelectEpisode(data);
      addSearchBar(data);
      createButtonFeature(displayAllEpisodesButton, data);
    })
    .catch((error) => console.log(error));
}

function displaySelectedShow(allShows) {
  let displaySelectedShow;
  selectShow.addEventListener("change", (e) => {
    displaySelectedShow = allShows.filter((show) => {
      return show.name === e.target.value;
    });
    episodeContainer.innerHTML = ``;
    let showId = displaySelectedShow[0].id;
    fetchSeasonData(showId);
    searchInput.value = "";
  });
}
// function displayAllShows(allShows) {
//   displayEpisodes(allShows);
// }

// Declaring function to create sections for  episodes.
function displayShowsEpisodes(allEpisodes) {
  enableElement(selectEpisode);
  enableElement(searchInput);
  const episodeSection = document.createElement("section");
  episodeContainer.appendChild(episodeSection);
  episodeSection.classList.add("episode-section");
  // createButtonFeature(displayAllShowsButton, allShows);

  allEpisodes.forEach((episode) => {
    let episodeDiv = document.createElement("div");
    episodeSection.appendChild(episodeDiv);
    episodeDiv.classList.add("episode-div");

    let episodeNameParagraph = document.createElement("p");
    episodeDiv.appendChild(episodeNameParagraph);

    [showSeason, showNumber] = episodeNumberGenerator(episode);
    if (showSeason) {
      episodeNameParagraph.innerText = `${episode.name}-S${showSeason}E${showNumber}`;
    } else {
      episodeNameParagraph.innerText = episode.name;
    }
    episodeNameParagraph.classList.add("episodeName-paragraph");

    let episodeImage = document.createElement("img");
    // console.log(episode);
    if (episode.image) {
      episodeImage.src = episode.image.original;
      // console.log(episode.image.original);
    } else {
      episodeImage.src = "noimages.png";
    }
    episodeDiv.appendChild(episodeImage);
    episodeImage.classList.add("episode-image");

    let episodeSummary = document.createElement("p");
    episodeDiv.appendChild(episodeSummary);
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.classList.add("episodeSummary-paragraph");
    if (isSearchUsed) {
      episodeNameParagraph.innerHTML = `${episode.name.replace(
        searchValue,
        `<mark>${searchValue}</mark>`
      )}-S${showSeason}E${showNumber}`;
      episodeSummary.innerHTML = episode.summary.replace(
        searchValue,
        `<mark>${searchValue}</mark>`
      );
    }
    // console.log(episode);
    if (displayAllShowsButtonsClicked) {
      episodeDiv.addEventListener("click", (e) => {
        episodeContainer.innerHTML = ``;

        fetchSeasonData(episode.id);
      });
    }
  });
  displayAllShowsButtonsClicked = false;
  isSearchUsed = false;
  foundEpisodesText(allEpisodes);
  displaySelectedShow(allShows);
}

//Declaring function to add searchbar features
function addSearchBar(allEpisodes) {
  searchInput.addEventListener("input", (e) => {
    let searchInputValue = e.target.value;
    searchValue = searchInputValue;
    let episodeList = allEpisodes.filter((episode) => {
      if (episode.name && episode.summary) {
        let newName = episode.name.toUpperCase();
        let newSummary = episode.summary.toUpperCase();
        let newSearchInputValue = searchInputValue.toUpperCase();
        return (
          newName.includes(newSearchInputValue) ||
          newSummary.includes(newSearchInputValue)
        );
      }
      // console.log(newName)
      // console.log(newSummary)
    });
    isSearchUsed = true;
    episodeContainer.innerHTML = ``;
    foundEpisodesText(episodeList);
    displayShowsEpisodes(episodeList);
    selectEpisode.selectedIndex = "0";
  });
}
// displayAllShowsButton.addEventListener("click", () => {
//   displayAllShowsButtonsClicked = true;
// });
//Declaring function to create all episode button's feature
function createButtonFeature(button, data) {
  button.addEventListener("click", () => {
    displayAllShowsButtonsClicked = true;
    episodeContainer.innerHTML = ``;
    displayShowsEpisodes(data);
    selectEpisode.selectedIndex = "0";
    searchInput.value = "";
  });
}
// function createAllShowsButton(allShows) {
//   displayAllShowsButton.addEventListener("click", () => {
//     episodeContainer.innerHTML = ``;
//     displayShowsEpisodes(allShows);
//     selectEpisode.selectedIndex = "0";

//     searchInput.value = "";
//   });
// }
// Declaring function to display the episode chosen by using select dropdown element
function displaySelectEpisode(allEpisodes) {
  selectEpisode.innerHTML = "";

  allEpisodes.forEach((episode) => {
    [showSeason, showNumber] = episodeNumberGenerator(episode);
    let option = document.createElement("option");
    let joinedNameDisplay =
      "S" + showSeason + "E" + showNumber + " - " + episode.name;
    option.setAttribute("value", episode.name);
    option.innerText = joinedNameDisplay;
    selectEpisode.appendChild(option);
  });
  selectEpisode.addEventListener("change", (e) => {
    let displaySelectedEpisode = allEpisodes.filter((episode) => {
      return episode.name === e.target.value;
    });
    episodeContainer.innerHTML = ``;
    // let newEpisode = displaySelectedEpisode;
    displayShowsEpisodes(displaySelectedEpisode);
    searchInput.value = "";
  });
}
//Declaring function to display number of episode found regarding with any query
function foundEpisodesText(episodeList) {
  searchTotal.innerText = "Total episode found:" + episodeList.length;
  if (episodeList.length === 0) {
    episodeContainer.innerText = "Sorry, please search again";
  }
}

function episodeNumberGenerator(episode) {
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
  let joinedNumber = [];

  joinedNumber.push(showSeason);
  joinedNumber.push(showNumber);
  return joinedNumber;
}
