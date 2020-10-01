/* eslint-disable no-unreachable */
import { ACTION_TYPE } from '../../../Helpers/constants';

const initialState = {
  bankDetails: true,
  favouriteBanks: [],
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_TYPE.GET_BANK_DETAILS:
      return {
        ...state,
        bankDetails: action.payload,
      };
      break;
    case ACTION_TYPE.MARK_AS_FAVOURITE:
      return {
        ...state,
        favouriteBanks: action.payload,
      };
      break;
    default:
      return state;
  }
  return newState;
};
