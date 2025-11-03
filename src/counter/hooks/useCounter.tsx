import { useState } from "react";

export const useCounter = (initialValue: number = 1) => {
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };
  const handleSubtrac = () => {
    setCounter((prevState) => prevState - 1);
  };
  const handleReset = () => {
    setCounter(initialValue);
  };

  return {
    //Props or values
    counter,
    //Methods or actions
    handleAdd,
    handleSubtrac,
    handleReset,
  };
};
