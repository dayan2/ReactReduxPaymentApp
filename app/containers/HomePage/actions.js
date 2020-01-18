import { SAVE_CARD_DETAILS } from './constants';

export function saveCardDetails(data) {
  return {
    type: SAVE_CARD_DETAILS,
    data
  };
}
