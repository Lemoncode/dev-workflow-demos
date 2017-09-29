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

const handleReposne = (mock) => (response) => {
  return response.status > 400 ? mock : response.json();
};

//TODO WJ: Catch status 403, Return mock!
export const fetchMembers = () => {
  return fetch(membersURL)
    .then(handleReposne(mockedMembers))
    .catch(() => mockedMembers);
};

export const fetchRepos = () => {
  return fetch(reposURL)
    .then(handleReposne(mockedRepos))
    .catch(() => mockedRepos);
};

