import {action, computed, observable} from "mobx";
import OrderModel from "../model/OrderModel";

class OrderViewModel{
  @observable list = [];
  @observable refreshState = false;

  getOrderData(userId){
    OrderModel.fetchOrderList(userId).then((res)=>{
      this.list = res.data
    }).finally(()=>{
      this.refreshState = false
    })
  }

  @computed
  get getOrderList(){
    return this.list
  }

  @action
  setRefreshState(state: boolean){
    this.refreshState = state
  }

  @computed
  get getRefreshState(){
    return this.refreshState
  }

}

const orderViewModel = new OrderViewModel();
export default orderViewModel
