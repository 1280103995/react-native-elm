import {action, computed, observable} from "mobx";
import AddressModel from "../model/AddressModel";
import Toast from "../../view/Toast";

export default class AddAddressViewModel {
  @observable item2HasValue = false;//用来判断小区那一栏是否有值，有则更新字体颜色
  @observable addressName = '小区/写字楼/学校等';
  @observable geohash = '';
  @observable name = '';
  @observable detailAddress = '';
  @observable phone = '';
  @observable phone2 = '';

  submitAddress(navigation, user_id) {
    if (this._checkNull()) {
      AddressModel.fetchAddAddress(user_id, this.addressName,
        this.detailAddress, this.geohash, this.name, this.phone, this.phone2).then((res) => {
        Toast.show(res.data.success);
        navigation.state.params.callback(true);
        navigation.goBack()
      })
    }
  }

  _checkNull() {
    if (this.name === '') {
      Toast.show('请输入您的姓名');
      return false
    }
    if (this.addressName === '小区/写字楼/学校等') {
      Toast.show('请选择地址');
      return false
    }
    if (this.detailAddress === '') {
      Toast.show('请填写详细送餐地址');
      return false
    }
    if (this.phone === '') {
      Toast.show('请输入手机号');
      return false
    }
    return true
  }

  @action
  setItem2Value(value: boolean) {
    this.item2HasValue = value
  }

  @computed
  get getItem2Value() {
    return this.item2HasValue
  }

  @action
  setAddressName(name: string) {
    this.addressName = name
  }

  @computed
  get getAddressName() {
    return this.addressName
  }

  @action
  setGeohash(geohash: string) {
    this.geohash = geohash
  }

  @action
  setName(name: string) {
    this.name = name
  }

  @action
  setDetailAddress(name: string) {
    this.detailAddress = name
  }

  @action
  setPhone(phone: string) {
    this.phone = phone
  }

  @action
  setPhone2(phone2: string) {
    this.phone2 = phone2
  }

}
