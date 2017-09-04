import {actionsDefs} from './const'

export const organizationReducer = (action, state = []) => {
  switch(action.type) {
      case actionsDefs.LOAD_MEMBERS:
        state = actionDefs.payload;
      break;
  }
}