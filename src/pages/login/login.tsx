import React, { useState, ChangeEvent, FormEvent, FC } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { signIn } from '../../services/actions/users';
import { RootState, useSelector, useDispatch } from '../../utils/types';

import styles from './login.module.css';

export const LoginPage: FC = () => {
  const loginStart = useSelector((state: RootState) => state.user.loginStart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const { state } = location;

  const inputEmail = (el: ChangeEvent<HTMLInputElement>): void => {
    const { value } = el.target;
    setEmail(value);
  };

  const inputPassword = (el: ChangeEvent<HTMLInputElement>): void => {
    const { value } = el.target;
    setPassword(value);
  };

  const regButton = async (el: FormEvent) => {
    el.preventDefault();

    try {
      const success = await signIn(email, password, dispatch);
      if (success) {
        navigate(state?.from ? state.from : '/', { replace: true });
      }
    } catch (error) {
     
    }
  };

  const isButtonDisabled = email.length === 0 || password.length === 0;

  return (
    <main className={styles.main}>
      <h2 className={styles.header}>Вход</h2>
      <form className={styles.inputs} onSubmit={regButton}>
        <EmailInput
          onChange={inputEmail}
          extraClass="mt-6 mb-6"
          value={email}
          name={'email'}
          placeholder="email"
          disabled={loginStart}
          data-testid="login"
        />
        <Input
          onChange={inputPassword}
          value={password}
          name={'password'}
          type={'text'}
          placeholder="Пароль"
          disabled={loginStart}
          data-testid="password"
        />
        <Button
          disabled={isButtonDisabled || loginStart} 
          htmlType="submit"
          type="primary"
          extraClass="mt-6 mb-6"
          data-testid="submit"
        >
          Войти
        </Button>
      </form>

      <div className={styles.textQuestion}>
        Вы — новый пользователь?
        <Link className={styles.text} to='/register'>
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.textQuestion} >
        Забыли пароль?
        <Link className={styles.text} to='/forgot-password'>
          Восстановить пароль    
        </Link>
      </div>
    </main>
  );
};
