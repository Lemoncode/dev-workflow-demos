const baseURL = 'https://api.github.com/orgs/lemoncode';
const membersURL = `${baseURL}/members`;
const reposURL = `${baseURL}/repos`;

const mockedMembers = [{
  login: 'Offline User 1',
  avatar_url: '/avatar.jpg',
  description: 'Awesome description',
}];

const mockedRepos = [{
  name: 'Offline Repo 1',
}];

export const fetchMembers = () => {
  return fetch(membersURL)
    .then((response) => response.json())
    .catch(() => mockedMembers);
};

export const fetchRepos = () => {
  return fetch(reposURL)
    .then((response) => response.json())
    .catch(() => mockedRepos);
};

