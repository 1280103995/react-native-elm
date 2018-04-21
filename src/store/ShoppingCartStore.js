import {action, computed, observable} from 'mobx';

class ShoppingCarStore {
  @observable list = [];

  @action
  addFood(food){
    let g = this.list.find(item => item.id === food.id);
    if (g === undefined){
      food.buyNum = 1;
      this.list.push(food)
    } else {
      this.list.forEach(item => item.id === food.id && (++item.buyNum))
    }
  }

  @action
  subFood(food){
    this.list.forEach(item => item.id === food.id && item.buyNum > 0 && (--item.buyNum))
  }

  @action
  clearFood() {
    this.list.clear()
  }

  @action
  getFoodBuyNum(food){
    let g = this.list.find(item => item.id === food.id);
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
      totalPrice = totalPrice + food.buyNum * food.money;
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