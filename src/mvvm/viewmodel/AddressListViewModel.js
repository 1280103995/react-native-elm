import {observable, action, computed} from 'mobx';
import AddressModel from "../model/AddressModel";
import Toast from "../../view/Toast";

export default class AddressListViewModel {
  @observable list = [];

  fetchData(user_id){
    AddressModel.fetchGetAddressList(user_id).then((res)=>{
      this.list = res.data
    })
  }

  @action
  removeItem(item){
    this.list.remove(item)
  }

  @action
  deleteItem(user_id, item){
    AddressModel.fetchDeleteAddress(user_id, item.id).then((res)=>{
      this.removeItem(item);
      Toast.show(res.data.success)
    })
  }

  @computed
  get getList(){
    return this.list
  }
}
