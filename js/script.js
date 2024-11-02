const overview = document.querySelector(".overview"); //this targets my profile information
const username = "Anjie-MF";
const repoList = document.querySelector(".repo-list");

async function fetchMyInfo() {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const resolve = await response.json();
  displayMyInfo(resolve);
};

fetchMyInfo();

const displayMyInfo = function (resolve) {
  const myInfo = document.createElement("div");
  myInfo.classList.add("user-info");
  myInfo.innerHTML = `
    <figure>
    <img alt="user avatar" src=${resolve.avatar_url}/>
  </figure>
  <div>
    <p><strong>Name:</strong> ${resolve.name}</p>
    <p><strong>Bio:</strong> ${resolve.bio}</p>
    <p><strong>Location:</strong> ${resolve.location}</p>
    <p><strong>Number of public repos:</strong> ${resolve.public_repos}</p>
  </div>
  `;
  overview.append(myInfo);
};

async function fetchMyRepos() {

  const getRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await getRepos.json();
  console.log(repoData);
};