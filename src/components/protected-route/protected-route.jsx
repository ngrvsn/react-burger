import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../services/cookies';
import PropTypes from 'prop-types';
import { getUser } from '../../services/actions/users';
import { useDispatch, useSelector } from 'react-redux';


export function ProtectedRouteElement({ element, noNeedAuth }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
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
    }, []);

    if (!authUser) return null

    if (noNeedAuth) {
        return user ? <Navigate to="/" replace /> : element;
      } else {
        return user ? element : <Navigate to="/login" replace state={{ from: location.pathname }} />;
      }
    };

    
ProtectedRouteElement.propTypes = {
    element: PropTypes.node.isRequired,
    noNeedAuth: PropTypes.bool.isRequired
}