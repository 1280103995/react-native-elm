import {action, computed, observable} from "mobx";
import CategoryModel from "../model/CategoryModel";
import HomeModel from "../model/HomeModel";

class CategoryViewModel {
  @observable category = [];
  @observable categoryChild = [];
  @observable delivery = [];
  @observable activity = [];
  @observable shopList = [];


  getData(latitude, longitude) {
    CategoryModel.fetchFoodCategory(latitude, longitude).then((res) => {
      this.category = res;
      this.categoryChild = res[0].sub_categories
    });

    CategoryModel.fetchFoodDelivery(latitude, longitude).then((res) => {
      this.delivery=res
    });

    CategoryModel.fetchFoodActivity(latitude, longitude).then((res) => {
      this.activity= res
    });

    HomeModel.fetchShopList(latitude, longitude, 0).then((res) => {
      this.shopList = res
    })
  }

  @computed
  get getCategoryDate(){
    return this.category
  }

  @action
  setCategoryChildDate(subCategories){
    this.categoryChild = subCategories
  }

  @computed
  get getCategoryChildDate(){
    return this.categoryChild
  }

  @computed
  get getDeliveryDate(){
    return this.delivery
  }

  @computed
  get getActivityDate(){
    return this.delivery
  }

  @computed
  get getShopListDate(){
    return this.shopList
  }
}

const categoryViewModel = new CategoryViewModel();
export default categoryViewModel