import {computed, observable} from "mobx";
import ShopInfoModel from "../model/ShopInfoModel";

class ShopInfoViewModel {

  @observable shopImgPath = '';
  @observable shopName = '';
  @observable shopPromotion = '';

  getShopData(id, latitude, longitude) {
    ShopInfoModel.fetchShopDetails(id, latitude, longitude).then((res) => {
      this.shopImgPath = res.image_path;
      this.shopName = res.name;
      this.shopPromotion = res.promotion_info
    })
  }

  @computed
  get getShopImgPath() {
    return this.shopImgPath
  }

  @computed
  get getShopName() {
    return this.shopName
  }

  @computed
  get getShopPromotion() {
    return this.shopPromotion
  }

}

const shopInfoViewModel = new ShopInfoViewModel();
export default shopInfoViewModel