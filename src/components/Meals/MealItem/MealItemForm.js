import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef } from 'react';

const MealItemForm = (props) => {
  const quantityInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(+quantityInputRef.current.value);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label='Quantity'
        input={{
          id: `quantity_${props.id}`,
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
