import {action, computed, observable} from "mobx";

class HomeStore{
  @observable location = ''; //定位
  @observable categoryList = []; //分类数组
  @observable shopList = []; //店铺列表

  @action
  setLocation(info){
    this.location = info
  }

  @computed
  get getLocation(){
    return this.location
  }

  @action
  categoryAddAll(list){
    this.categoryList = list
  }

  @computed
  get getCategoryList(){
    return this.categoryList
  }

  @action
  shopAddAll(list){
    this.shopList = list
  }

  @computed
  get getShopList(){
    return this.shopList
  }

}
const homeStore = new HomeStore();
export default homeStore