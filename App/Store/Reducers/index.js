import {combineReducers} from 'redux';
import Products from './Products';
import Vendors from './Vendors';
import Basket from './Basket';
import Orders from './Orders';
import UserAddresses from './UserAddresses';
import SelectedAddress from './SelectedAddress';
import Users from './Users';
import ShippingMethod from './ShippingMethod';
import SelectedShippingMethod from './SelectedShippingMethod';
import Checkout from './Checkout';
import PaymentMethod from './PaymentMethod';
import ShowAlert from './ShowAlert';

export default combineReducers({
  Products: Products,
  Vendors: Vendors,
  Basket: Basket,
  Orders: Orders,
  UserAddresses: UserAddresses,
  Users: Users,
  SelectedAddress: SelectedAddress,
  ShippingMethod: ShippingMethod,
  SelectedShippingMethod: SelectedShippingMethod,
  Checkout: Checkout,
  PaymentMethod: PaymentMethod,
  ShowAlert: ShowAlert,
});
