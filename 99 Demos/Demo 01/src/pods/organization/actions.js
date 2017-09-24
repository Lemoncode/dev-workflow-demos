import { actionsDefs } from './const';
import {fetchMembers, fetchRepos} from '../../rest-api'

export const loadMembersRequest = () => (dispatcher) =>{
  const promise = fetchMembers();

  promise.then(
    (data) => dispatcher(loadMemberRequestCompleted(data))
  );

  return promise;
}

export const loadMemberRequestCompleted = (members) => {
    return {
        type: actionsDefs.LOAD_REPOS_REQUEST_COMPLETED,
        payload: members
    }
}

export const loadReposRequest = () => (dispatcher) =>{
  const promise = fetchRepos();

  promise.then(
    (data) => dispatcher(loadMemberRequestCompleted(data))
  );

  return promise;
}

export const loadReposRequestCompleted = (repos) => {
    return {
        type: actionsDefs.LOAD_REPOS_REQUEST_COMPLETED,
        payload: repos
    }
}