import {observable, action, computed} from 'mobx';
import AddressApi from "../api/AddressApi";
import Toast from "../view/Toast";

class MemberAddressListStore {
  @observable list = [];

  fetchData(user_id){
    AddressApi.fetchGetAddressList(user_id).then((res)=>{
      this.list = res
    })
  }
  @action
  addAll(list){
    this.list = list
  }

  @action
  deleteItem(user_id, item){
    AddressApi.fetchDeleteAddress(user_id, item.id).then((res)=>{
      this.fetchData(user_id); //请求数据更新页面
      // this.list.remove(item); //todo 数据变化后mobx为什么没更新页面
      Toast.show(res.success)

    })
  }

  @computed
  get getList(){
    return this.list
  }
}
const addressListStore = new MemberAddressListStore();
export default addressListStore