import React, { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MyButton } from '../../MyButton';
import s from './user.module.scss';
import { MyInput } from '../../MyInput';
import { useDispatch, useSelector } from '../../../services/store';
import { getUsersSelector, updateUser } from '../../../services/slices/Users';

export const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);
  const [redact, setRedact] = useState(true);

  const user = useMemo(() => {
    return users.find((us) => id && us.id === +id) || null;
  }, [users, id]);

  const handleSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUser(user));
      console.log(user, 'user');
    }
  }, [user, dispatch]);

  const handleInputChange = useCallback((field: string, value: string) => {
    if (user) {
      dispatch(updateUser({ ...user, [field]: value }));
    }
  }, [user, dispatch]);

  const handleAddressChange = useCallback((field: string, value: string) => {
    if (user) {
      dispatch(updateUser({
        ...user,
        address: { ...user.address, [field]: value }
      }));
    }
  }, [user, dispatch]);

  if (!user) {
    return <div className={s.user}>Пользователь не найден...</div>;
  }

  const renderInput = (label: string, field: string, value: string, isAddress = false) => (
    <MyInput
      label={label}
      inputValue={value}
      onChange={(value) => isAddress ? handleAddressChange(field, value) : handleInputChange(field, value)}
      isValid={value.length >= 1}
      disabled={redact}
    />
  );

  return (
    <div className={s.user}>
      <header className={s.user__header}>
        <h1 className={s.user__title}>Профиль пользователя</h1>
        <MyButton text="Редактировать" onClick={() => setRedact(!redact)} />
      </header>
      <form className={s.user__form} onSubmit={handleSubmitForm}>
        <div className={s.user__inputs}>
          {renderInput("Name", "name", user.name)}
          {renderInput("User name", "username", user.username)}
          {renderInput("Email", "email", user.email)}
          {renderInput("Street", "street", user.address.street, true)}
          {renderInput("City", "city", user.address.city, true)}
          {renderInput("Zip code", "zipcode", user.address.zipcode, true)}
          {renderInput("Phone", "phone", user.phone)}
          {renderInput("Website", "website", user.website)}
          <MyInput
            label="Comment"
            inputValue={user.comment || ''}
            onChange={(value) => handleInputChange("comment", value)}
            textArea
            disabled={redact}
          />
        </div>
        <div className={s.user__button}>
          <MyButton type="submit" text="Отправить" disabled={redact} />
        </div>
      </form>
    </div>
  );
};