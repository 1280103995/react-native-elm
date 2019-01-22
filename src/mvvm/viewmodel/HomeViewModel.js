import {computed, observable} from "mobx";
import HomeModel from "../model/HomeModel";

class HomeViewModel{
  @observable latitude = 0;
  @observable longitude = 0;
  @observable location = ''; //当前城市名
  @observable categoryList = []; //分类数组
  @observable shopList = []; //店铺列表

  getHomeData(){
    HomeModel.fetchCityGuess().then((res)=>{
      Geohash = res.latitude + ',' + res.longitude;
      this.location = res.name;
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      this._getFootType(res.geohash);
      this.getFootList()
    })
  }

  getFootList(){
    this._fetchShop(this.latitude, this.longitude)
  }

  _getFootType(geohash){
    HomeModel.fetchFoodTypes(geohash).then((res)=>{
      let temp = [];
      const itemCount = 8;//一页8个分类
      const pageCount = res.length / itemCount;
      const last = res.length % 8; //余下的个数，不满一页8个的，如果=0则刚刚被整除
      for (let i = 0; i < pageCount; i++) {
        temp.push(res.slice(i * itemCount, (i + 1) * itemCount));
      }
      if (last > 0) {
        temp.push(res.slice(itemCount * pageCount, res.length))
      }
      this.categoryList = temp;
      temp = null
    })
  }

  _fetchShop(latitude, longitude) {
    HomeModel.fetchShopList(latitude, longitude, 0).then((res) => {
      this.shopList = res
    })
  }

  @computed
  get getLocation(){
    return this.location
  }

  @computed
  get getLatitude(){
    return this.latitude
  }

  @computed
  get getLongitude(){
    return this.longitude
  }

  @computed
  get getCategoryList(){
    return this.categoryList
  }

  @computed
  get getShopList(){
    return this.shopList
  }

}
const homeViewModel = new HomeViewModel();
export default homeViewModel