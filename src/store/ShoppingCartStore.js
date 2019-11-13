import {action, computed, observable} from 'mobx';

class ShoppingCarStore {
  @observable list = [];

  @action
  addFood(food){
    let g = this.list.find(item => item.item_id === food.item_id);
    if (g === undefined){
      food.buyNum = 1;
      this.list.push(food)
    } else {
      this.list.forEach(item => item.item_id === food.item_id && (++item.buyNum))
    }
  }

  @action
  subFood(food){
    this.list.forEach(item => item.item_id === food.item_id && item.buyNum > 0 && (--item.buyNum))
  }

  @action
  clearFood() {
    this.list.clear()
  }

  getFood(food) {
    return this.list.find(item => item.item_id === food.item_id)
  }

  @computed
  get allFoods() {
    return this.list
  }

  @computed
  get totalCount(){
    let count = 0;
    for (let food of this.list) {
      count += food.buyNum
    }
    return count
  }

  @computed
  get totalPrice() {
    let totalPrice = 0;
    // 遍历表中所有数据
    for (let food of this.list) {
      let price = 0;
      if (food.specfoods && food.specfoods.length > 0) {
        price = food.specfoods[0].price;
      }
      totalPrice = totalPrice + food.buyNum * price;
    }
    return toDecimal2(totalPrice);
  }
}
const cartStore = new ShoppingCarStore();
export default cartStore

//只保留2位小数，如：2，会在2后面补上.00即2.00
export function toDecimal2(x) {
  let ff = parseFloat(x);
  if (isNaN(ff)) {
    return 0.00;
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
