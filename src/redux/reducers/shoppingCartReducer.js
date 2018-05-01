import * as types from "../actions/types/ShoppingCartType";

const initState = {
  list: [], //购物车列表
};

export function shoppingCartReducer(state = initState, action) {
  switch (action.type){
    case types.CART_LIST_ADD:
      return{
        list:action.list
      };
    default:
      return state
  }
}