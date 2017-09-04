import { actionsDefs } from './const';
import {fetchMembers} from '../../rest-api'

export const loadMembersRequest = () => (dispatcher) =>{
  const promise = fetchMembers();

  promise.then(
    (data) => dispatcher(loadMemberRequestCompleted(data))
  );

  return promise;
}

export const loadMemberRequestCompleted = (members) => {
    return {
        type: actionsDefs.LOAD_MEMBERS_REQUEST_COMPLETED,
        members: members
    }
}