import {computed, action, observable} from 'mobx';
import ShopInfoModel from '../model/ShopInfoModel';

export default class ShopInfoViewModel {

  @observable shopImgPath = '';
  @observable shopName = '';
  @observable shopPromotion = '';
  @observable foodsList = [];
  cartBall = null;//小球实例
  categoryIndex: 0;//分类索引

  getShopData(id, latitude, longitude) {
    ShopInfoModel.fetchShopDetails(id, latitude, longitude).then((res) => {
      this.shopImgPath = res.data.image_path;
      this.shopName = res.data.name;
      this.shopPromotion = res.data.promotion_info;
    });
  }

  fetchFootList(shopId) {
    ShopInfoModel.fetchShopGoodsList(shopId).then((res) => {
      let items = [];
      const length = res.data.length;
      for (let i = 0; i < length; i++) {
        let tempItem = res.data[i];
        if (tempItem.foods === undefined || tempItem.foods == null || tempItem.foods.length === 0) {
          continue;
        }
        const foodsLength = tempItem.foods.length;
        for (let j = 0; j < foodsLength; j++) {
          tempItem.foods[j].buyNum = 0;
          tempItem.foods[j].category_index = i
        }

        let item = {
          key: tempItem.name,
          description: tempItem.description,
          restaurant_id: tempItem.restaurant_id,
          id: tempItem.id,
          data: Array.from(new Set(tempItem.foods)),
          isSelect: i === 0,
        };
        items.push(item);
      }
      this.foodsList = items;
    });
  }

  @computed
  get getShopImgPath() {
    return this.shopImgPath;
  }

  @computed
  get getShopName() {
    return this.shopName;
  }

  @computed
  get getShopPromotion() {
    return this.shopPromotion;
  }

  @computed
  get getFootList() {
    return this.foodsList.map((v) => {
      return {
        key: v.key,
        description: v.description,
        restaurant_id: v.restaurant_id,
        id: v.id,
        data: v.data.slice(),
        isSelect: v.isSelect,
      };
    }).slice();
  }

  @action
  setSelectIndex(index: number) {
    this.foodsList.map((value, i) => {
      value.isSelect = index === i;
      this.categoryIndex = i;
    });
  }
}
