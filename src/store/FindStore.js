import {observable, action, computed} from "mobx";

class FindStore {
  @observable list = [];
  @observable shopList = []; //店铺列表

  @action
  addItem(text){
    let g = this.list.find(item => item === text);
    if (g !== undefined) return;
    this.list.push(text)
  }

  @action
  deleteItem(text){
    this.list.remove(text)
  }

  @action
  clear() {
    this.list.clear()
  }

  @computed
  get getList(){
    return this.list
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
const findStore = new FindStore();
export default findStore