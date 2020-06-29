import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import './styles/app.css';
import VastComponent from './components/VastComponent/VastComponent';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <VastComponent />
  </Provider>,
  document.getElementById('container'),
);
