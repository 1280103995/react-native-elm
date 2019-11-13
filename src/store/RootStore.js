import cartStore from "./ShoppingCartStore";
import findViewModel from "../mvvm/viewmodel/FindViewModel";
import homeViewModel from "../mvvm/viewmodel/HomeViewModel";
import orderViewModel from "../mvvm/viewmodel/OrderViewModel";
import categoryViewModel from "../mvvm/viewmodel/CategoryViewModel";
import shopInfoEvaluationViewModel from "../mvvm/viewmodel/ShopInfoEvaluationViewModel";

const store = {
  homeViewModel,
  findViewModel,
  orderViewModel,
  categoryViewModel,
  cartStore,
  shopInfoEvaluationViewModel
};

export default store;
