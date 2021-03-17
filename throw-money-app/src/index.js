import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store'
import { ConnectedRouter } from 'connected-react-router'
import * as History from 'history';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// history使用
const history = History.createBrowserHistory();
// createStoreに定義されているstateを、reduxにおけるstate管理対象とする
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
