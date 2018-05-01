import * as types from "./types/ShoppingCartType";

export function cartListAddItem(item) {
  return dispatch => {
    dispatch({
      type: types.CART_LIST_ADD,
      item
    })
  }
}