import './assets/styles/App.less';

import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router } from 'react-router-dom';

import App from './App';
import { getPersonsFx, getReservationsFx } from './model';
import { clearAllReservations } from './model/repositories';

//clearAllReservations();
getPersonsFx();
getReservationsFx();

ReactDOM.render(

  <Router>
    <App />
  </Router>

  ,
  document.getElementById('root')
);

