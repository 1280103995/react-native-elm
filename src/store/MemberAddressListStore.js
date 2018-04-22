import {observable, action, computed} from 'mobx';

class MemberAddressListStore {
  @observable list = [];

  @action
  addAll(list){
    this.list = list
  }

  @action
  deleteItem(item){
    this.list.remove(item)
  }

  @computed
  get getList(){
    return this.list
  }
}
const addressListStore = new MemberAddressListStore();
export default addressListStore