import {computed, observable} from "mobx";
import HomeModel from "../model/HomeModel";

class HomeViewModel{
  @observable latitude = 0;
  @observable longitude = 0;
  @observable location = ''; //当前城市名
  @observable weather = {
    wendu: 0,
    type: ''
  };//天气信息
  @observable categoryList = []; //分类数组
  @observable shopList = []; //店铺列表

  getHomeData(){
    HomeModel.fetchCityGuess().then((res)=>{
      console.log('数据', res)
      Geohash = res.data.latitude + ',' + res.data.longitude;
      this.location = res.data.name;
      this.latitude = res.data.latitude;
      this.longitude = res.data.longitude;
      this._getFootType(res.data.geohash);
      this.getFootList();
      this._getWeather(this.location);
    })
  }

  getFootList(){
    console.log('位置', this.latitude, this.longitude)
    this._fetchShop(this.latitude, this.longitude)
  }

  _getFootType(geohash){
    HomeModel.fetchFoodTypes(geohash).then((res)=>{
      let temp = [];
      const itemCount = 8;//一页8个分类
      const pageCount = res.data.length / itemCount;
      const last = res.data.length % 8; //余下的个数，不满一页8个的，如果=0则刚刚被整除
      for (let i = 0; i < pageCount; i++) {
        temp.push(res.data.slice(i * itemCount, (i + 1) * itemCount));
      }
      if (last > 0) {
        temp.push(res.data.slice(itemCount * pageCount, res.data.length))
      }
      this.categoryList = temp;
      temp = null
    })
  }

  _fetchShop(latitude, longitude) {
    HomeModel.fetchShopList(latitude, longitude, 0).then((res) => {
      this.shopList = res.data
    })
  }

  _getWeather(cityName: string){
    HomeModel.getWeather(cityName).then((res)=>{
      this.weather = {
        wendu: res.data.data.wendu,
        type: res.data.data.forecast[0].type
      }
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

  @computed
  get getWeather(){
    return this.weather
  }

}
const homeViewModel = new HomeViewModel();
export default homeViewModel
