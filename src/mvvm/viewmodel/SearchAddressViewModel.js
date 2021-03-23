import {action, computed, observable} from "mobx";
import AddressModel from "../model/AddressModel";
import Toast from "../../view/Toast";

export default class SearchAddressViewModel{
  @observable address = [];
  @observable keyWord = '';

  searchAddress(){
    if (this._checkNull()) {
      AddressModel.fetchSearchNearby(this.keyWord).then((res) => {
        this.address = res.data
      })
    }
  }

  _checkNull(){
    if (this.keyWord === '') {
      Toast.show('请输入内容');
      return false
    }
    return true
  }

  @action
  setKeyWord(keyWord: string){
    this.keyWord = keyWord
  }

  @computed
  get getAddressList(){
    return this.address
  }
}
