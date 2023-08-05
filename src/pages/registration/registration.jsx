import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/users';


import styles from './registration.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSetLogin = (el) => setLogin(el.target.value);
  const handleSetEmail = (el) => setEmail(el.target.value);
  const handleSetPassword = (el) => setPassword(el.target.value);

  const handleRegisterButtonClick = async (el) => {
    el.preventDefault();

    if (login.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
      alert('Заполните все поля');
      return;
    }

    await register(email, password, login, dispatch).then((success) => {
      if (success) {
        navigate('/', { replace: true });
      }
    });
  };

  const isButtonDisabled = login.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0;

  return (
    <main className={styles.main}>
      <h2 className={styles.header}>Регистрация</h2>
      <form className={styles.inputs} onSubmit={handleRegisterButtonClick}>
        <Input
          onChange={handleSetLogin}
          value={login}
          name="login"
          type="text"
          placeholder="Имя"
          extraClass="mb-6"
          size="default"
        />
        <EmailInput
          onChange={handleSetEmail}
          value={email}
          name="email"
          type="text"
          placeholder="email"
          extraClass="mb-6"
        />
        <Input
          onChange={handleSetPassword}
          value={password}
          name="password"
          type="text"
          placeholder="Пароль"
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" disabled={isButtonDisabled}>
          Зарегистрироваться
        </Button>
      </form>

      <div className={styles.alreadyReg}>
        Уже зарегистрированы?
        <Link className={styles.text} to="/login">
          Войти
        </Link>
      </div>
    </main>
  );
};
