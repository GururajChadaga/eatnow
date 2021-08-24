import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const cancelCheckoutHandler = () => {
    setShowCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    const ordersUrl =
    `${process.env.REACT_APP_EATNOW_API}/orders.json`;
    setIsOrdering(true);
    await fetch(ordersUrl, {
      method: 'POST',
      body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
    });
    setIsOrdering(false);
    setOrderPlaced(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {!showCheckout && cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{totalPrice}</span>
      </div>
      {showCheckout && hasItems && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={cancelCheckoutHandler}
        />
      )}
      {(!showCheckout || !hasItems) && modalActions}
    </Fragment>
  );

  const orderingModalContent = <p>Ordering...</p>;
  const orderPlacedModalContent = (
    <Fragment>
      <p>Your order has been placed.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isOrdering && !orderPlaced && cartModalContent}
      {isOrdering && orderingModalContent}
      {orderPlaced && orderPlacedModalContent}
    </Modal>
  );
};

export default Cart;
