import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../Authentication/Auth";
import firebase from "../Authentication/Firebase";

export const OrderContext = createContext([]);

export const OrderContextProvider = ({ children }) => {
  const [uid, setUid] = useState(sessionStorage.getItem("uid"));
  let tempUid = sessionStorage.getItem("uid");

  useEffect(() => {
    setUid(sessionStorage.getItem("uid"));
  }, [tempUid]);

  const { userDetails } = useContext(AuthContext);

  const initialState = {
    orders: userDetails.myOrders,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const addOrderToDb = (order) => {
    if (state.orders && state.orders.length > 1) {
      dispatch({
        type: "APPEND_ORDER_TO_DB",
        payload: {
          order,
          uid,
        },
      });
    } else {
      dispatch({
        type: "ADD_ORDER_TO_DB",
        payload: {
          order,
          uid,
        },
      });
    }
  };

  return (
    <OrderContext.Provider value={{ orders: state.orders, addOrderToDb }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;

const OrderReducer = (state, action) => {
  const db = firebase.firestore();

  let userRef = sessionStorage.getItem("uid")
    ? db.collection("users").doc(action.payload.uid)
    : null;

  const AppendOrder = (order, prevOrders) => {
    return [order, ...prevOrders];
  };

  switch (action.type) {
    case "ADD_ORDER_TO_DB":
      try {
        userRef.update({
          myOrders: action.payload.order,
        });
      } catch (error) {
        alert(error);
      }

      return {
        orders: action.payload.order,
      };
    case "APPEND_ORDER_TO_DB":
      let orders = AppendOrder(action.payload.order, state.orders);
      try {
        userRef.update({
          myOrders: orders,
        });
      } catch (error) {
        console.log(error);
      }

      return {
        orders,
      };
    default:
      return state;
  }
};
