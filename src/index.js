import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore, compose, applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Import Components
import { Login, Protected, Dashboard, About, Blog, ListCar } from './components';

import reducers from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Protected>
              <Dashboard />
            </Protected>}
          />
          <Route path='/about' element={
            <Protected>
              <About />
            </Protected>}
          />
          <Route path='/blog' element={
            <Protected>
              <Blog />
            </Protected>}
          />
          <Route path='/car' element={
            <Protected>
              <ListCar />
            </Protected>}
          />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
