import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../../services/actions/users';

import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rememberPassword = useSelector(state => state.user.rememberPassword);
  const [email, setEmail] = useState('');

  const handleEmailChange = (el) => setEmail(el.target.value);

  const handleForgotButtonClick = (el) => {
    el.preventDefault();

    if (email.length === 0) {
      alert('Введите email');
      return;
    }

    forgotPassword(email, dispatch).then((success) => {
      if (success) {
        navigate('/reset-password', { replace: true, state: { from: location.pathname } });
      }
    });
  };

  const isButtonDisabled = email.length === 0;

  return (
    <main className={styles.main}>
      <h2 className={styles.header}>Восстановление пароля</h2>
      <form className={styles.inputs} onSubmit={handleForgotButtonClick}>
        <EmailInput
          onChange={handleEmailChange}
          value={email}
          name="email"
          type="text"
          placeholder="Введите email"
          extraClass="mt-6 mb-6"
          disabled={rememberPassword}
        />
        <Button
          htmlType="submit"
          type="primary"
          disabled={rememberPassword || isButtonDisabled}
          extraClass="mb-6"
        >
          Восстановить
        </Button>
      </form>

      <div className={styles.remember}>
        Вспомнили пароль?
        <Link className={styles.text} to="/login">
          Войти
        </Link>
      </div>
    </main>
  );
};
