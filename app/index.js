import React from 'react';
import ReactDOM from 'react-dom';
import { login } from './api';
import App from './App';
import './index.css';

(async () => {
  // try to login with cookie
  const { user, requireMfa } = await login();

  // init app
  const domContainer = document.createElement('div');
  document.body.appendChild(domContainer);
  document.body.style.margin = '0';
  document.body.style.fontFamily = 'sans-serif';
  document.body.style.color = '#fff';
  document.body.style.backgroundColor = '#090909';

  ReactDOM.render(
    <div className="wrapper">
      <App user={user} requireMfa={requireMfa} />
    </div>,
    domContainer
  );
})();
