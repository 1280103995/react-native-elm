import cartStore from "./ShoppingCartStore";
import findViewModel from "../mvvm/viewmodel/FindViewModel";
import addressListStore from "./MemberAddressListStore";
import homeViewModel from "../mvvm/viewmodel/HomeViewModel";
import orderViewModel from "../mvvm/viewmodel/OrderViewModel";
import categoryViewModel from "../mvvm/viewmodel/CategoryViewModel";

const store = {
  homeViewModel,
  findViewModel,
  orderViewModel,
  categoryViewModel,
  cartStore,
  addressListStore
};

export default store;