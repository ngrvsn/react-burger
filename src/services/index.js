import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const composeEnhancers = composeWithDevTools({ trace: true });

export const initStore = () => {
  const initialState = {
    burgerConstructor: {
      buns: {},
      ingredients: {},
    },
  };

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
