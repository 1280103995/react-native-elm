import {action, computed, observable} from "mobx";
import CategoryModel from "../model/CategoryModel";
import HomeModel from "../model/HomeModel";

class CategoryViewModel {
  sortList = ['智能排序','距离最近','销量最高','起送价最低','配送速度最快','评分最高'];
  @observable category = [];
  @observable categoryChild = [];
  @observable delivery = [];
  @observable activity = [];
  @observable shopList = [];


  getData(latitude, longitude) {
    CategoryModel.fetchFoodCategory(latitude, longitude).then((res) => {
      this.category = res.data;
      this.categoryChild = res.data[0].sub_categories
    });

    CategoryModel.fetchFoodDelivery(latitude, longitude).then((res) => {
      this.delivery=res.data
    });

    CategoryModel.fetchFoodActivity(latitude, longitude).then((res) => {
      this.activity= res.data
    });

    HomeModel.fetchShopList(latitude, longitude, 0).then((res) => {
      this.shopList = res.data
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
