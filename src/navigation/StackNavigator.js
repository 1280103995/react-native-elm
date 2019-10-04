import {Tabs} from "./TabNavigator";
import UserInfoScreen from "../screen/member/auth/UserInfoScreen";
import PayOnLineScreen from "../screen/member/PayOnLineScreen";
import LoginScreen from "../screen/member/auth/LoginScreen";
import ElmVIPScreen from "../screen/member/ElmVIPScreen";
import BuyRecordScreen from "../screen/member/BuyRecordScreen";
import ShopInfoScreen from "../screen/shop/ShopInfoScreen";
import PointQuestionScreen from "../screen/member/PointQuestionScreen";
import OrderConfirmScreen from "../screen/shop/OrderConfirmScreen";
import ChangeRedPacketScreen from "../screen/member/ChangeRedPacketScreen";
import AddressScreen from "../screen/member/address/AddressScreen";
import ExchangeVIPScreen from "../screen/member/ExchangeVIPScreen";
import ModifyUserNameScreen from "../screen/member/auth/ModifyUserNameScreen";
import ServiceCenterScreen from "../screen/member/ServiceCenterScreen";
import DiscountScreen from "../screen/member/discount/DiscountScreen";
import VIPDesScreen from "../screen/member/VIPDesScreen";
import PointMallScreen from "../screen/member/PointMallScreen";
import BalanceQuestionScreen from "../screen/member/BalanceQuestionScreen";
import SplashScreen from "../screen/SplashScreen";
import PointScreen from "../screen/member/PointScreen";
import AddAddressScreen from "../screen/member/address/AddAddressScreen";
import ModifyPwdScreen from "../screen/member/auth/ModifyPwdScreen";
import BalanceScreen from "../screen/member/BalanceScreen";
import SearchAddressScreen from "../screen/member/address/SearchAddressScreen";
import CategoryScreen from '../screen/CategoryScreen';
import LocationCityScreen from '../screen/LocationCityScreen';

/*需要注册的页面*/
export default {
  Home: {screen: Tabs},
  Login: {screen: LoginScreen},
  ShopInfo: {screen: ShopInfoScreen},
  Splash: {screen: SplashScreen},
  Category: {screen: CategoryScreen},
  UserInfo: {screen: UserInfoScreen},
  ModifyUserName: {screen: ModifyUserNameScreen},
  Address: {screen: AddressScreen},
  AddAddress: {screen: AddAddressScreen},
  SearchAddress: {screen: SearchAddressScreen},
  ModifyPwd: {screen: ModifyPwdScreen},
  Balance: {screen: BalanceScreen},
  Point: {screen: PointScreen},
  ElmVIP: {screen: ElmVIPScreen},
  PayOnLine: {screen: PayOnLineScreen},
  ExchangeVIP: {screen: ExchangeVIPScreen},
  BuyRecord: {screen: BuyRecordScreen},
  ServiceCenter: {screen: ServiceCenterScreen},
  Discount: {screen: DiscountScreen},
  BalanceQuestion: {screen: BalanceQuestionScreen},
  PointQuestion: {screen: PointQuestionScreen},
  PointMall: {screen: PointMallScreen},
  OrderConfirm: {screen: OrderConfirmScreen},
  VIPDes: {screen: VIPDesScreen},
  ChangeRedPacket: {screen: ChangeRedPacketScreen},
  LocationCity: {screen: LocationCityScreen}
};
