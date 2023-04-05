import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo, //null, de esta manera al recargar la pagina no se eliminara la sesion iniciada
  foodItems: null,
  cartShow: false, //para que sea responsive
  cartItems: cartInfo,
};
