//All html elements created are in htmlelements.js

let isSearchUsed = false;
let searchValue;
isDisplayAllShows = true;
//Getting allshows and assign it to allShow variable
let allShows = getAllShows();
//Creating set up function, which will assign names to select element, display all shows, disable some elements at the beginning
function setUp() {
  addShowsToSelectShowElement(allShows);
  displayShowsEpisodes(allShows);
  disableElement(selectEpisode);
  disableElement(displayAllEpisodesButton);
}
setUp();
// Creating a function to disable element
function disableElement(element) {
  element.disabled = true;
}
//Creating a function to enable element
function enableElement(element) {
  element.disabled = false;
}
//Creating a function to sort shows by name
function sortShowByName(allShows) {
  allShows.sort((firstname, nextname) =>
    firstname.name.localeCompare(nextname.name)
  );
}
//function to create options for select element
function addShowsToSelectShowElement(allShows) {
  sortShowByName(allShows);
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.setAttribute("value", show.name);
    option.innerText = show.name;
    selectShow.appendChild(option);
  });
}
let dataEpisode;
//Function to fetch data for seasons by using show id
function fetchAndDisplaySeason(showId) {
  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      //displaying divisions by using data fetched
      displayShowsEpisodes(data);
      //adding episodes names season info to select element
      addEpisodesToSelectEpisodeElement(data);
      //dataEpisode will be used in search
      dataEpisode = data;
      isDisplayAllShows = false;
    })
    .catch((error) => console.log(error));
}

//Adding event listener select show element
selectShow.addEventListener("change", function eventHandler(e) {
  let displaySelectedShow = allShows.filter((show) => {
    return show.name === e.target.value;
  });
  episodeContainer.innerHTML = ``;
  let showId = displaySelectedShow[0].id;
  fetchAndDisplaySeason(showId);
  enableElement(selectEpisode);
  searchInput.value = "";
});
// Function to display episodes/shows. This is the only function displaying episode/show, after a search or choosing from a select element or button.
function displayShowsEpisodes(allEpisodes) {
  const episodeSection = document.createElement("section");
  episodeContainer.appendChild(episodeSection);
  episodeSection.classList.add("episode-section");
  allEpisodes.forEach((episode) => {
    let episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode-div");
    let episodeNameParagraph = document.createElement("p");
    episodeNameParagraph.classList.add("episodeName-paragraph");
    let infoWrapper = document.createElement("div");
    infoWrapper.classList.add("info-wrapper");
    let infoAndSummaryWrapper = document.createElement("div");
    infoAndSummaryWrapper.classList.add("info-summary-wrapper");
    let episodeImage = document.createElement("img");
    episodeImage.classList.add("episode-image");
    episodeSection.appendChild(episodeDiv);
    episodeDiv.append(episodeNameParagraph, infoWrapper);
    infoWrapper.append(episodeImage, infoAndSummaryWrapper);
    [showSeason, showNumber] = episodeNumberGenerator(episode);
    //if episode has image assign it to image src
    if (episode.image) {
      episodeImage.src = episode.image.medium;
    } else {
      //if episode hasn't any image assign a no image image to the image src
      episodeImage.src = "noimages.png";
    }
    let genresInShow = [];
    //if show season is undefined, it means data is from show not from episode
    if (showSeason === undefined) {
      isDisplayAllShows = true;
      episodeNameParagraph.innerText = episode.name;
      episode.genres.forEach((genre) => {
        genresInShow.push(genre);
      });
      createExtraInfoAboutShow();
      disableElement(displayAllEpisodesButton);
      disableElement(selectEpisode);
    } else {
      episodeNameParagraph.innerText = `${episode.name}-S${showSeason}E${showNumber}`;
      enableElement(displayAllEpisodesButton);
    }
    //Creating extra info for Shows only, like genre etc
    function createExtraInfoAboutShow() {
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
    }
    let episodeSummary = document.createElement("div");
    infoAndSummaryWrapper.appendChild(episodeSummary);
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.classList.add("episodeSummary-paragraph");
    //After search feature used, marking what found on the screen
    if (isSearchUsed) {
      episodeNameParagraph.innerHTML = `${episode.name.replace(
        searchValue,
        `<mark>${searchValue}</mark>`
      )}`;
      episodeSummary.innerHTML = episode.summary.replace(
        searchValue,
        `<mark>${searchValue}</mark>`
      );
    }
    //if displaying shows, add a click event listener to divisions when clicked it will display episode
    if (isDisplayAllShows) {
      episodeDiv.addEventListener("click", (e) => {
        episodeContainer.innerHTML = ``;
        fetchAndDisplaySeason(episode.id);
        enableElement(selectEpisode);
        enableElement(displayAllEpisodesButton);
        selectShow.selectedIndex = "0";
      });
    }
  });
  isSearchUsed = false;
  foundEpisodesText(allEpisodes);
}
//Adding event listener to the search input
searchInput.addEventListener("input", eventHandlerSearch);
function eventHandlerSearch(e) {
  searchValue = e.target.value;
  if (isDisplayAllShows) {
    filterShowEpisodeAndDisplay(allShows);
  } else {
    filterShowEpisodeAndDisplay(dataEpisode);
  }
}

//Filtering data from input search and displaying it
function filterShowEpisodeAndDisplay(showEpisodeData) {
  isSearchUsed = true;
  let episodeList = showEpisodeData.filter((data) => {
    let genres = [];
    if (data.genres) {
      genres = data.genres.map((genre) => {
        return genre;
      });
    }
    if (data.name && data.summary && genres) {
      let newName = data.name.toUpperCase();
      let newSummary = data.summary.toUpperCase();
      let newGenres = genres.join().toUpperCase();
      let newSearchInputValue = searchValue.toUpperCase();
      return (
        newSummary.includes(newSearchInputValue) ||
        newName.includes(newSearchInputValue) ||
        newGenres.includes(newSearchInputValue)
      );
    }
  });
  episodeContainer.innerHTML = ``;
  foundEpisodesText(episodeList);
  displayShowsEpisodes(episodeList);
  selectEpisode.selectedIndex = "0";
}

//Adding event listener to All Episodes button
displayAllEpisodesButton.addEventListener(
  "click",
  eventHandlerDisplayAllEpisodesButton
);
//Adding event listener to All Shows button
displayAllShowsButton.addEventListener(
  "click",
  eventHandlerDisplayAllShowsButton
);
function eventHandlerDisplayAllShowsButton() {
  episodeContainer.innerHTML = ``;
  displayShowsEpisodes(allShows);
  isDisplayAllShows = true;
  selectEpisode.selectedIndex = "0";
  selectShow.selectedIndex = "0";
  searchInput.value = "";
}
function eventHandlerDisplayAllEpisodesButton() {
  episodeContainer.innerHTML = ``;
  displayShowsEpisodes(dataEpisode);
  selectEpisode.selectedIndex = "0";
  selectShow.selectedIndex = "0";
  searchInput.value = "";
}

// Declaring function to display the episode chosen by using select dropdown element

let newEpisodes;
function addEpisodesToSelectEpisodeElement(allEpisodes) {
  selectEpisode.innerHTML = "";
  newEpisodes = allEpisodes;
  allEpisodes.forEach((episode) => {
    [showSeason, showNumber] = episodeNumberGenerator(episode);
    let option = document.createElement("option");
    let joinedNameDisplay =
      "S" + showSeason + "E" + showNumber + " - " + episode.name;
    option.setAttribute("value", episode.name);
    option.innerText = joinedNameDisplay;
    selectEpisode.appendChild(option);
  });
  isDisplayAllShows = false;
}
//Adding event listener episode selector
selectEpisode.addEventListener("change", eventHandlerSelectEpisode);
function eventHandlerSelectEpisode(e) {
  console.log("event handler select episode working");
  let displaySelectedEpisode = newEpisodes.filter((episode) => {
    return episode.name === e.target.value;
  });
  episodeContainer.innerHTML = ``;
  displayShowsEpisodes(displaySelectedEpisode);
  searchInput.value = "";
}
//Declaring function to display number of episode found regarding with any query
function foundEpisodesText(episodeList) {
  searchTotal.innerText = "Total episode found:" + episodeList.length;
  if (episodeList.length === 0) {
    episodeContainer.innerText = "Sorry, please search again";
  }
}
//Function to find episode season and episode number
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
  let joinedNumber = [showSeason, showNumber];
  return joinedNumber;
}
