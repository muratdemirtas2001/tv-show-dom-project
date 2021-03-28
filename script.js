//You can edit ALL of the code here
//All html elements created are in htmlelements.js
//fetching data

let isSearchUsed;
let searchValue;
displayAllShowsButtonsClicked = true;
let allShows = getAllShows();
addShowsToSelectShowElement(allShows);
//mmmmmm
addSearchBar(allShows);
displayShowsEpisodes(allShows);
createButtonFeature(displayAllShowsButton, allShows);
disableElement(selectEpisode);
//mmmmm
// disableElement(searchInput);

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
// Declaring function to create sections for  episodes/shows.
function displayShowsEpisodes(allEpisodes) {
  enableElement(selectEpisode);
  enableElement(searchInput);
  const episodeSection = document.createElement("section");
  episodeContainer.appendChild(episodeSection);
  episodeSection.classList.add("episode-section");

  allEpisodes.forEach((episode) => {
    let episodeDiv = document.createElement("div");
    episodeSection.appendChild(episodeDiv);
    episodeDiv.classList.add("episode-div");

    let episodeNameParagraph = document.createElement("p");
    episodeDiv.appendChild(episodeNameParagraph);
    episodeNameParagraph.classList.add("episodeName-paragraph");

    [showSeason, showNumber] = episodeNumberGenerator(episode);
    let infoWrapper = document.createElement("div");
    infoWrapper.classList.add("info-wrapper");
    episodeDiv.appendChild(infoWrapper);
    let infoAndSummaryWrapper = document.createElement("div");
    infoAndSummaryWrapper.classList.add("info-summary-wrapper")
    let episodeImage = document.createElement("img");
    if (episode.image) {
      episodeImage.src = episode.image.original;
    } else {
      episodeImage.src = "noimages.png";
    }
    infoWrapper.appendChild(episodeImage);
    infoWrapper.appendChild(infoAndSummaryWrapper)
    episodeImage.classList.add("episode-image");
    let genresInShow = [];
    if (showSeason) {
      episodeNameParagraph.innerText = `${episode.name}-S${showSeason}E${showNumber}`;
    } else {
      episode.genres.forEach((genre) => {
        genresInShow.push(genre);
      });
      episodeNameParagraph.innerText = episode.name;
    }
    if (!showSeason) {
      // console.log("shoooowwww")
      let extraInfoShow = document.createElement("div");
      extraInfoShow.classList.add("extra-info-show");
      infoAndSummaryWrapper.appendChild(extraInfoShow);
      let genres = document.createElement("p");
      extraInfoShow.appendChild(genres);
      genres.innerText = `GENRES:  ${genresInShow}`;
      let status = document.createElement("p");
      extraInfoShow.appendChild(status);
      status.innerText = `STATUS:  ${episode.status}`;
      let rating = document.createElement("p");
      extraInfoShow.appendChild(rating);
      rating.innerText = `RATING: ${episode.rating.average}`;
      let runtime = document.createElement("p");
      extraInfoShow.appendChild(runtime);
      runtime.innerText = `RUN-TIME:  ${episode.runtime}`;
      // episodeNameParagraph.classList.add("episodeName-paragraph");
    }

    let episodeSummary = document.createElement("div");
    infoAndSummaryWrapper.appendChild(episodeSummary);
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
    if (displayAllShowsButtonsClicked) {
      episodeDiv.addEventListener("click", (e) => {
        episodeContainer.innerHTML = ``;
        // console.log(episode.id)
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
    });
    isSearchUsed = true;
    episodeContainer.innerHTML = ``;
    foundEpisodesText(episodeList);
    displayShowsEpisodes(episodeList);
    selectEpisode.selectedIndex = "0";
  });
}
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
