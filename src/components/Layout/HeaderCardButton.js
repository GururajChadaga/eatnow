import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCardButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.quantity;
  }, 0);

  useEffect(() => {
    if (items.length > 0) {
      setBtnIsHighlighted(true);
      const btnAnimationTimer = setTimeout(() => {
        setBtnIsHighlighted(false);
      }, 300);
      return () => {
        clearTimeout(btnAnimationTimer);
      };
    }
  }, [items]);

  const btnClasses = `${classes.button}  ${btnIsHighlighted && classes.bump}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
