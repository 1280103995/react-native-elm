import {computed, observable} from "mobx";
import LocationApi from "../../api/LocationApi";
import _ from 'lodash';

//这是利用lodash的range和数组的map画出26个英文字母
const letters = _.range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1).map(n => String.fromCharCode(n).substr(0));

export default class LocationCityViewModel {
  @observable hotList = [];
  @observable cityList = [];

  fetchCityData() {
    LocationApi.fetchHotCity().then((res) => {
      this.hotList = res.data;
    });
    LocationApi.fetchAllCtiy().then((res) => {
      let items = [];
      let length = letters.length;
      for (let i = 0; i < length; i++) {
        let letter = letters[i];
        if (res.data[letter] === undefined) continue;
        //渲染SectionList，必须的数据结构
        let sectionItem = {
          key: letter,
          data: res.data[letter]
        };
        items.push(sectionItem)
      }
      this.cityList = items
    })
  }

  @computed
  get getHotList() {
    return this.hotList
  }

  @computed
  get getCityList() {
    return this.cityList.map((v)=>{
      return {
        key: v.key,
        data: v.data.slice(),
      }
    }).slice();
  }

}
