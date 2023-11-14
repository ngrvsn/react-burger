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

 /* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => {
  if (location.pathname.startsWith('/feed')) {
      dispatch(WebSocketStart());
  } 

  return () => {
      dispatch(WebSocketsClose());
  };
}, [location.pathname]);
/* eslint-enable react-hooks/exhaustive-deps */

 /* eslint-disable react-hooks/exhaustive-deps */
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
 /* eslint-disable react-hooks/exhaustive-deps */


  return (
    <div>

      <FeedInfo />
    </div>
  );
};

export default FeedInfoPage;
