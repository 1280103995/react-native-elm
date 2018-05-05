import * as types from "../actions/types/ShoppingCartType";
import {toDecimal2} from "../../utils/MoneyUtil";

const initState = {
  totalPrice: 0,
  totalCount: 0,
  list: [], //购物车列表
};

export function shoppingCartReducer(state = initState, action) {
  switch (action.type){
    case types.CART_LIST_ADD:
      /*添加一份食物，如果已经存在了，则数量上+1*/
      let existFoot = state.list.find(food => food.id === action.item.id);
      if (existFoot === undefined){
        action.item.buyNum =1;
        state.list.push(action.item)
      } else {
        state.list.forEach(item => item.id === action.item.id && (++item.buyNum))
      }
      /*计算总价格和总数量*/
      let totalPrice = 0;
      let totalCount = 0;
      for (let food of state.list) {
        totalPrice += food.buyNum * food.money;
        totalCount += food.buyNum
      }

      return{
        totalPrice: toDecimal2(totalPrice),
        totalCount: totalCount,
        list:state.list
      };
    case types.CART_LIST_SUB:

      state.list.forEach(item => item.id === action.item.id && item.buyNum > 0 && (--item.buyNum));

      /*计算总价格和总数量*/
      let total_price = 0;
      let total_count = 0;
      for (let food of state.list) {
        total_price += food.buyNum * food.money;
        total_count += food.buyNum
      }
      return{
        totalPrice: toDecimal2(total_price),
        totalCount: total_count,
        list:state.list
      };
    default:
      return state
  }
}