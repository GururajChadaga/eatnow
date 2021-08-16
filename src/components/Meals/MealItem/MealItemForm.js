import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef } from 'react';

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(+amountInputRef.current.value);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: `amount_${props.id}`,
          type: 'number',
          min: '1',
          max: '5',
          defaultValue: '1',
          step: '1',
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
