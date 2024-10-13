import React from 'react';
import classnames from 'classnames';
import s from './myButton.module.scss';

type MyButtonProps = {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
};

export const MyButton = ({
  text,
  onClick,
  type = 'button',
  disabled = false,
}: MyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classnames(s.button, { [s.submitBtn]: type === 'submit' })}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
