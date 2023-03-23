import React from 'react';
import { getNewId } from '../services/idService';

export default function RadioButton({
  id = getNewId(),
  name = 'radioName',
  children,
  buttonChecked = false,
  onButtonClick = null,
}) {
  function handleRadioButtonChange() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <div className="flex flex-row items-center space-x-2 mb-4">
      <input
        type={'radio'}
        id={id}
        name={name}
        checked={buttonChecked}
        onChange={handleRadioButtonChange}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
