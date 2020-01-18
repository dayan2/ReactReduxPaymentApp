import { SAVE_CARD_DETAILS } from './constants';

// The initial state of the App
const initialState = {
  cardDetails: null,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CARD_DETAILS:
      return { ...state, cardDetails: action.payload };
    default:
      return state;
  }
}

export default homeReducer;
