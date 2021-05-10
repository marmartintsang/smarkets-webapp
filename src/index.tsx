import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from '@/containers/App';
import Detail from '@/containers/Detail';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <Switch>
    <Route exact path="/">
      <App />
    </Route>
    <Route exact path="/detail/:eventId">
      <Detail />
    </Route>
  </Switch>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
