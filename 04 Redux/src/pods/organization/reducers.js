import { actionsDefs } from './const'

export const organizationReducer = (state = [], action) => {
  switch(action.type) {
      case actionsDefs.LOAD_MEMBERS_REQUEST_COMPLETED:
        return action.payload;
      break;
  }

  return state;
}