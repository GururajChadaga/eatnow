import classes from './Checkout.module.css';
import useInput from '../../hooks/useInput';

const isNotEmpty = (value) => {
  return value.trim() !== '';
};

const isFiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputBlurHandler: nameBlurHandler,
    inputChangeHandler: nameChangeHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: street,
    isValid: streetIsValid,
    hasError: streetHasError,
    inputBlurHandler: streetBlurHandler,
    inputChangeHandler: streetChangeHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: postalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    inputBlurHandler: postalCodeBlurHandler,
    inputChangeHandler: postalCodeChangeHandler,
    reset: resetPostalCode,
  } = useInput(isFiveChars);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    inputBlurHandler: cityBlurHandler,
    inputChangeHandler: cityChangeHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  let formIsValid = true;
  formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      nameBlurHandler();
      streetBlurHandler();
      postalCodeBlurHandler();
      cityBlurHandler();
      return;
    }
    props.onConfirm({
      name,
      street,
      postalCode,
      city,
    });
    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameClasses = nameHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const streetClasses = streetHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const postalCodeClasses = postalCodeHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const cityClasses = cityHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          value={postalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
      </div>
      <div className={classes.actions}>
        <button
          type='button'
          className={classes['button--alt']}
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={classes.button}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
