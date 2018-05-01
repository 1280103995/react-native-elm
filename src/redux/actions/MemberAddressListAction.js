import AddressApi from "../../api/AddressApi";
import * as types from "./types/MemberAddressListType";
import Toast from "../../view/Toast";

export function getAddressList(user_id) {
  return dispatch => {
    AddressApi.fetchGetAddressList(user_id).then((res) => {
      dispatch({
        type: types.LIST,
        list: res
      })
    })
  }
}

//要删除的item ID
export function deleteItem(user_id, id) {
  return dispatch => {
    AddressApi.fetchDeleteAddress(user_id, id).then((res) => {
      dispatch({
        type: types.LIST_DELETE,
        id
      });

      Toast.show(res.success)
    })
  }
}