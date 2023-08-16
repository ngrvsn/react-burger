import React, { useState, ChangeEvent,  FormEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/users';
import { TAuthorisation } from '../../utils/types';

import styles from './reset-password.module.css';

export const ResetPasswordPage: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPasswordStart = useSelector((state: { [prop: string]: TAuthorisation }) => state.user.resetPasswordStart);
  const { state } = location;
  const [password, setPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const inputPassword = (el: ChangeEvent<HTMLInputElement>) => {
    setPassword(el.target.value);
}


  const inputCode = (el: ChangeEvent<HTMLInputElement>) => {
    setCode(el.target.value);
  }

  const onSave = async (el: FormEvent) => {
    el.preventDefault();

    try {
        const success = await resetPassword(password, code, dispatch);
        if (success) {
            navigate('/login', { replace: true });
        }
    } catch (error) {
    }
}

  const isButtonDisabled = resetPasswordStart || password.trim().length === 0 || code.trim().length === 0;

  if (!state?.from) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.header}>Восстановление пароля</h2>
      <form className={styles.inputs} onSubmit={onSave}>
        <Input
          onChange={inputPassword}
          value={password}
          name={'password'}
          type={'text'}
          placeholder="Введите новый пароль"
          disabled={resetPasswordStart}
        />
        <Input
          onChange={inputCode}
          value={code}
          name={'code'}
          type={'text'}
          placeholder="Введите код из письма"
          extraClass="mt-6"
          disabled={resetPasswordStart}
        />
        <Button
          onClick={onSave}
          htmlType="submit"
          type="primary"
          extraClass="mt-6 mb-6"
          disabled={isButtonDisabled}
        >
          Сохранить
        </Button>
      </form>
  
      <div className={styles.remember}>
        Вспомнили пароль?
        <Link className={styles.text} to='/login'>
          Войти
        </Link>
      </div>
    </main>
  );
};
