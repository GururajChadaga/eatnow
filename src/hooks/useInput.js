import { useReducer } from 'react';

const initialState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  } else if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  } else if (action.type === 'RESET') {
    return initialState;
  }
  return initialState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };
  const inputChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };
  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  };
};

export default useInput;
