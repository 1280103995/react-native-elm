import cartStore from "./ShoppingCartStore";
import findViewModel from "../mvvm/viewmodel/FindViewModel";
import addressListStore from "./MemberAddressListStore";
import homeViewModel from "../mvvm/viewmodel/HomeViewModel";
import orderViewModel from "../mvvm/viewmodel/OrderViewModel";

const store = {homeViewModel, findViewModel, orderViewModel,cartStore, addressListStore};

export default store;