import {observable, action, computed} from "mobx";
import FindModel from "../model/FindModel";

class FindViewModel {
  @observable list = [];
  @observable shopList = []; //店铺列表
  @observable searchComplete = false;

  getSearchData(geohash, keyWord: string){
    FindModel.fethcSearchRestaurant(geohash, keyWord).then((res) => {
      this.shopList = res.data
    }).catch((err) => {
    }).finally(()=> {
      this.setSearchState(true);
      this.addItem(keyWord)
    })
  }

  @action
  addItem(text){
    let g = this.list.find(item => item === text);
    if (g !== undefined) return;
    this.list.push(text)
  }

  @action
  deleteItem(text){
    //TODO mobx数组移除元素无效？
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
const findViewModel = new FindViewModel();
export default findViewModel
