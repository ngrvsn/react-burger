import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, ReactElement  } from 'react';
import { getCookie } from '../../services/cookies';
import { getUser } from '../../services/actions/users';
import { RootState, useSelector, useDispatch, AppDispatch } from '../../utils/types';

type TProtectedRouteElementProp = {
    element: ReactElement;
    noNeedAuth: boolean;
  };


  export function ProtectedRouteElement({ element, noNeedAuth }: TProtectedRouteElementProp) {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const [authUser, setAuthUser] = useState(false);
    const location = useLocation();


    const init = async () => {
        await getUser(dispatch);
        setAuthUser(true);
    };

    useEffect(() => {
        if (getCookie('token') && (localStorage.getItem('refreshToken'))) {
            init();
        } else {
            setAuthUser(true);
        }
        // eslint-disable-next-line
    }, []);

    
    if (!authUser) return null



    if (noNeedAuth) {
        return user ? <Navigate to="/" replace /> : element;
      } else {
        return user ? element : <Navigate to="/login" replace state={{ from: location.pathname }} />;
      }
    };

    
