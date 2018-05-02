import {observable, action, computed} from "mobx";

class FindStore {
  @observable list = [];
  @observable shopList = []; //店铺列表
  @observable searchComplete = false;

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

  @action
  setSearchState(isSearchEnd:boolean){
    this.searchComplete = isSearchEnd
  }

  /*显示无搜索结果*/
  @computed
  get showNoResult(){
    return this.searchComplete && this.shopList.length === 0
  }

  /*显示历史记录*/
  @computed
  get showHistory(){
    return !this.searchComplete && this.list.length > 0
  }
}
const findStore = new FindStore();
export default findStore