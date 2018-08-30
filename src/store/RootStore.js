import cartStore from "./ShoppingCartStore";
import findViewModel from "../mvvm/viewmodel/FindViewModel";
import homeViewModel from "../mvvm/viewmodel/HomeViewModel";
import orderViewModel from "../mvvm/viewmodel/OrderViewModel";
import categoryViewModel from "../mvvm/viewmodel/CategoryViewModel";
import shopInfoViewModel from "../mvvm/viewmodel/ShopInfoViewModel";
import shopInfoEvaluationViewModel from "../mvvm/viewmodel/ShopInfoEvaluationViewModel";

const store = {
  homeViewModel,
  findViewModel,
  orderViewModel,
  categoryViewModel,
  shopInfoViewModel,
  cartStore,
  shopInfoEvaluationViewModel
};

export default store;