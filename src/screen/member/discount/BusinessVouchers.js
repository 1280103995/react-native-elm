import React,{Component} from 'react'
import Column from "../../../view/Column";
import EmptyView from "../../../view/EmptyView";

export default class BusinessVouchers extends Component{

  render(){
    return(
      <Column style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <EmptyView/>
      </Column>
    )
  }
}