import {combineReducers} from "redux";
import {navReducer} from "./NavigationReducer";
import {homeReducer} from "./HomeReducer";
import {findReducer} from "./FindReducer";
import {memberAddressListReducer} from "./MemberAddressListReducer";
import {shoppingCartReducer} from "./ShoppingCartReducer";

//you can add  millions of routes here!
const rootReducer = combineReducers({
  nav: navReducer,
  homeReducer,
  findReducer,
  memberAddressListReducer,
  shoppingCartReducer,
});

export default rootReducer
