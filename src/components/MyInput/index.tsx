import React, { useState } from 'react';
import classNames from 'classnames';
import s from './myInput.module.scss';

type TMyInput = {
  label: string;
  inputValue: string;
  textArea?: boolean;
  disabled: boolean;
  isValid?: boolean;
  onChange: (arg: string) => void;
};

export const MyInput = ({
  label,
  inputValue,
  textArea = false,
  disabled,
  isValid = true,
  onChange,
}: TMyInput) => {
  return (
    <div className={classNames(s.input, {[s.error]: !isValid})}>
      <label htmlFor={label}>{label}</label>
      {textArea ? (
        <textarea
          id={label}
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <input
          id={label}
          type="text"
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required
        />
      )}
    </div>
  );
};
