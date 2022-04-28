// import Modal from "../UI/Modal";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Cartcontext from "../../Store/Cart-context";
import Checkout from "./checkout";
import react from "react";
const Cart = (props) => {
  const [issubmitting, setIssubmitting] = useState(false);
  const [didsubmit, setDidsubmit] = useState(false);
  const [ischeckout, setIsCheckOut] = useState(false);
  const cartCtx = useContext(Cartcontext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const orderHAndler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIssubmitting(true);
    await fetch(
      "https://react-http-4e214-default-rtdb.firebaseio.com/orders.json",
      {
        /// sending user data to the given link of firebase
        method: "POST",
        body: JSON.stringify({
          // using stringfy to send the data in string formata
          user: userData,
          orderItems: cartCtx.items, /// cardCtx used to take the items which take the input
        }),
      }
      );
      setDidsubmit(true);
   cartCtx.clearCart();
    setIssubmitting(false);
  };
  const modalactions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button-alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHAndler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );
  const cartmodalcontent = (
    <react.Fragment>
      {" "}
      {CartItems}
      <div className={classes.total}>
        <span> Total amount</span>
        <span> {totalAmount}</span>
      </div>
      {ischeckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!ischeckout && modalactions}
    </react.Fragment>
  );
  const issubmittingmodal = <p>sendingorder data...</p>;

  const didsubmitmodalcon = (
    <react.Fragment>
    <p>successfully sent the order....</p>
    
      <div className={classes.actions}>
      <button onClick={props.onClose} className={classes.button}>
        Close
      </button>
      </div>
    
    </react.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!issubmitting && !didsubmit && cartmodalcontent}
      {issubmitting && issubmittingmodal}
      {!issubmitting && didsubmit && didsubmitmodalcon}
    </Modal>
  );
};

export default Cart;
