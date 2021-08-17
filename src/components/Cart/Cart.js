import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
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
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{totalPrice}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} disabled>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
