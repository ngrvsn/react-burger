import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { WebSocketStart, WebSocketsClose } from '../../../services/actions/orders-all';
import { WebSocketStartUser, WebSocketsCloseUser } from '../../../services/actions/orders-user';
import { getCookie } from '../../../services/cookies';

import { FeedInfo } from './feed-info';


const FeedInfoPage = () => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/feed')) {
 
        dispatch(WebSocketStart());
    } 

    return () => {
        dispatch(WebSocketsClose());
    };
}, [location.pathname]);

useEffect(() => {
  if (location.pathname.startsWith('/profile/orders')) {

      if (token !== undefined) {
dispatch(WebSocketStartUser(token));
}
  } 

  return () => {
      dispatch(WebSocketsCloseUser());
  };
}, [location.pathname]);


  return (
    <div>

      <FeedInfo />
    </div>
  );
};

export default FeedInfoPage;
