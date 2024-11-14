const overview = document.querySelector(".overview"); //this targets the  profile information
const username = "Anjie-MF";
const repoList = document.querySelector(".repo-list"); //this target the repos list 
const repoInfo = document.querySelector(".repos"); // this is where all the repo information appears
const myRepoInfo = document.querySelector(".repo-data"); // this is where the individual repo data will appear
const backtoRepoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos"); //this selects the input with the placeholder

const fetchMyInfo = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const useMyData = await response.json();
  displayMyInfo(useMyData);
};

fetchMyInfo();

const displayMyInfo = function (useMyData) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${useMyData.avatar_url}/>
  </figure>
  <div>
    <p><strong>Name:</strong> ${useMyData.name}</p>
    <p><strong>Bio:</strong> ${useMyData.bio}</p>
    <p><strong>Location:</strong> ${useMyData.location}</p>
    <p><strong>Number of public repos:</strong> ${useMyData.public_repos}</p>
  </div>
  `;
  overview.append(div);
  fetchMyRepos();
};

const fetchMyRepos = async function () {
  const getRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await getRepos.json();
  displayReposInfo(repoData);
};

const displayReposInfo = function (repos) {//this displays ALL OF THE REPOS in the gallery
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const displayRepoItem = document.createElement("li");
    displayRepoItem.classList.add("repo");
    displayRepoItem.innerHTML = `<h3>${repo.name}</h3>`;  // Shorter syntax using innerHTML
    repoList.append(displayRepoItem);  // Appends to the container
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getSpecificRepoInfo(repoName);
  }
});

const getSpecificRepoInfo = async function (repoName) { //intended get specific details on an individual repo
  const grabInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoDetails = await grabInfo.json();
  console.log(repoDetails);

  const fetchLanguages = await fetch(repoDetails.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  //console.log(languages);
  displaySpecificRepoInfo(repoDetails, languages);
};

const displaySpecificRepoInfo = function (repoDetails, languages) {
  backtoRepoButton.classList.remove("hide");
  myRepoInfo.innerHTML = "";
  myRepoInfo.classList.remove("hide");
  repoInfo.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name:${repoDetails.name}</h3>
    <p>Description: ${repoDetails.description}</p>
    <p>Default Branch: ${repoDetails.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoDetails.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  myRepoInfo.append(div);
};

backtoRepoButton.addEventListener("click", function () {
  repoInfo.classList.remove("hide"); //the location where all the repo info appears
  myRepoInfo.classList.add("hide"); //the section where the individual repo data will appear
  backtoRepoButton.add("hide"); //the back to the repo gallery button 
});

filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowercaseText = searchText.toLowerCase();

  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(lowercaseText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});