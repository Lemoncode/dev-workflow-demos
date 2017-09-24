const baseURL = 'https://api.github.com/orgs/lemoncode';
const membersURL = `${baseURL}/members`;
const reposURL = `${baseURL}/repos`;

export const fetchMembers = () => {

  return fetch(membersURL)
            .then((response) => response.json());
}

export const fetchRepos = () => {

  return fetch(reposURL)
            .then((response) => response.json());
}

