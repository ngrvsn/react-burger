import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import { HomePage } from '../../pages/home/home';
import { IngredientsPage } from '../../pages/ingredients/ingredients';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import { LoginPage } from '../../pages/login/login';
import { ProfileOrdersPage } from '../../pages/profile-orders/profile-orders';
import { ProfilePage } from '../../pages/profile/profile';
import { RegisterPage } from '../../pages/registration/registration';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import Modal from '../modal/Modal';

import styles from './App.module.css';


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>

        <Route path="/register" element={<ProtectedRouteElement element={<RegisterPage />} 
          noNeedAuth={true} />} />
        <Route path="/login" element={<ProtectedRouteElement element={<LoginPage />} 
          noNeedAuth={true} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} 
          noNeedAuth={true} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />} 
          noNeedAuth={true} />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientsPage />}>
        <Route path="" element={<IngredientDetails />} />
        </Route>

        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} 
          noNeedAuth={false} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfileOrdersPage />} 
          noNeedAuth={false} />} />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<Modal onClose={() => { navigate(`/`) }}>
            <IngredientDetails />
          </Modal>} />
        </Routes>
      )}
    </div>
  );
}

export default App;