import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import {
  RecoilRoot,
} from 'recoil';

import { app_spec } from "./appSpec";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
      <App spec={app_spec}/>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
