import {computed, observable} from "mobx";
import ShopInfoEvaluationModel from "../model/ShopInfoEvaluationModel";

class ShopInfoEvaluationViewModel{

  @observable overallScore = 0;//综合评价
  @observable compareRating = '0.0%';//高于周边
  @observable serviceScore = 0;//服务评价
  @observable foodScore = 0;//菜品评价
  @observable deliverTime = 0;//送达时间
  @observable tags = [];
  @observable list = [];

  getEvaluationDate(id){
    ShopInfoEvaluationModel.fetchShopScores(id).then((res) => {
        this.overallScore = res.overall_score;
        this.compareRating = Math.ceil(res.compare_rating) * 100 + '%';
        this.serviceScore = res.service_score;
        this.foodScore = res.food_score;
        this.deliverTime = res.deliver_time
    });

    ShopInfoEvaluationModel.fetchShopRatingTags(id).then((res) => {
      this.tags = res
    });

    ShopInfoEvaluationModel.fetchShopRatingList(id).then((res)=>{
      this.list = res
    })
  }

  @computed
  get getOverallScore(){
    return this.overallScore
  }

  @computed
  get getCompareRating(){
    return this.compareRating
  }

  @computed
  get getServiceScore(){
    return this.serviceScore
  }

  @computed
  get getFoodScore(){
    return this.foodScore
  }

  @computed
  get getDeliverTime(){
    return this.deliverTime
  }

  @computed
  get getTags(){
    return this.tags
  }

  @computed
  get getList(){
    return this.list
  }
}

const shopInfoEvaluationViewModel = new ShopInfoEvaluationViewModel();
export default shopInfoEvaluationViewModel