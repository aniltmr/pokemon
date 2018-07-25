import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';

export const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk)
    )
  );
ReactDOM.render(
    <Provider  store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
