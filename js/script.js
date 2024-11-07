const overview = document.querySelector(".overview"); //this targets my profile information
const username = "Anjie-MF";
const repoList = document.querySelector(".repo-list");


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

const displayReposInfo = function (repos) {
  for (const repo of repos) {
    const displayRepoItem = document.createElement("li");
    displayRepoItem.classList.add("repo");
    displayRepoItem.innerHTML = `<h3>${repo.name}</h3>`;  // Shorter syntax using innerHTML
    repoList.append(displayRepoItem);  // Appends to the container
  }
};
