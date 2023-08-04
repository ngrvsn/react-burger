import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileButtons from '../profile-buttons/profile-buttons';
import { editUser, getUser } from '../../services/actions/users';

import styles from './profile.module.css';

export const ProfilePage = () => {
  const user = useSelector(state => state.user.user);
  const getUserStart = useSelector(state => state.user.getUserStart);
  const getUserError = useSelector(state => state.user.getUserError);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name || '');
  const [login, setLogin] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    getUser(dispatch);
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLogin(user.email);
      setIsFormDirty(false);
    }
  }, [user]);

  const newName = el => {
    setName(el.target.value);
    setIsFormDirty(true);
  }

  const newLogin = el => {
    setLogin(el.target.value);
    setIsFormDirty(true);
  }

  const newPassword = el => {
    setPassword(el.target.value);
    setIsFormDirty(true);
  }

  const cancelButton = () => {
    setName(user.name);
    setLogin(user.email);
    setPassword('');
    setIsFormDirty(false);
  }

  const saveButton = async (el) => {
    el.preventDefault();
    await editUser(login, password, name, dispatch);
    setPassword('');
    setIsFormDirty(false);
  }

  const hasChanges = () => {
    if (!isFormDirty || getUserStart) {
      return false;
    }
  
    if (name !== user.name) {
      return true;
    }
  
    if (login !== user.email) {
      return true;
    }
  
    if (password.length > 0) {
      return true;
    }
  
    return false;
  };
  
  if (getUserStart || getUserError) {
    return null;
  }

  return (
    <main className={styles.main}>
      <div className={styles.sidebar}><ProfileButtons /></div>

      <section className={styles.section}>
        <form className = {styles.inputs} onSubmit={saveButton}>
          <Input
            onChange={newName}
            value={name}
            name={'name'}
            type={'text'}
            placeholder="Имя"
            extraClass="mt-6"
            icon={'EditIcon'}
          />
          <EmailInput
            onChange={newLogin}
            value={login}
            name={'login'}
            isIcon={true}
            placeholder="Логин"
            extraClass="mt-6 mb-6"
          />
          <Input
            onChange={newPassword}
            value={password}
            name={'password'}
            placeholder="Пароль"
            extraClass="mb-6"
            type={'password'}
            icon={'EditIcon'}
          />

          {hasChanges() && <div className={styles.buttons}>
            <Button onClick={cancelButton} htmlType="button" type="secondary">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" >
              Сохранить
            </Button>
          </div>}
        </form>
      </section>
    </main>
  );
};
