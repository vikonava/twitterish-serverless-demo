import "@babel/polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Amplify, { Auth } from "aws-amplify";

import awsConfig from '../config/aws.json';
import configureStore from './redux/store'

import Application from './Application';


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.UserPoolId.split('_')[0],
    userPoolId: awsConfig.UserPoolId,
    userPoolWebClientId: awsConfig.UserPoolClientId,
    identityPoolId: awsConfig.IdentityPoolId,
  },
  API: {
    endpoints: [
      {
        name: "comments",
        endpoint: awsConfig.ServiceEndpoint,
        region: awsConfig.ServiceEndpoint.split('.')[2],
      },
    ]
  }
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>
, document.getElementById('root'));
