import {action, computed, observable} from 'mobx';

class ShoppingCarStore {
  @observable list = [];

  @action
  addFood(food){
    let g = this.list.find(item => item.item_id === food.item_id);
    if (g === undefined){
      this.list.push(food)
    }
  }

  @action
  subFood(food){
    let g = this.list.find(item => item.buyNum === 0);
    if (g === undefined){
      this.list.remove(food)
    }
    // this.list.forEach(item => item.item_id === food.item_id && item.buyNum > 0 && (--item.buyNum))
  }

  @action
  clearFood() {
    this.list.clear()
  }

  @action
  getFoodBuyNum(food){
    let g = this.list.find(item => item.item_id === food.item_id);
    return g === undefined ? 0 : g.buyNum
  }

  @computed
  get allFoods() {
    return this.list
  }

  @computed
  get totalCount(){
    let count = 0;
    for (let food of this.list) {
      count = count + food.buyNum
    }
    return count
  }

  @computed
  get totalPrice() {
    let totalPrice = 0;
    // 遍历表中所有数据
    for (let food of this.list) {
      let price = 0;
      if (food.specfoods !== undefined && food.specfoods.length > 0	) {
        price = food.specfoods[0].price
      }
      totalPrice = totalPrice + food.buyNum * price;
    }
    return toDecimal2(totalPrice);
  }
}
const cartStore = new ShoppingCarStore();
export default cartStore

//制保留2位小数，如：2，会在2后面补上00.即2.00
export function toDecimal2(x) {
  let ff = parseFloat(x);
  if (isNaN(ff)) {
    return false;
  }
  let f = Math.round(x * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}