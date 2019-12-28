import axios from 'axios';
import { history } from './routing.js';
import * as ROUTES from './constants/routes'

const isHandlerEnabled = (config={}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
    false : true
}

const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    let statusCode = error.response.status
    if (statusCode === 401) {
      // Auth issue; are you logged in?
      localStorage.clear();
      history.replace(ROUTES.LOGIN);
    }
  }
  return Promise.reject({ ...error })
}

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response
}

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `JWT ${token}` : '';
    return config;
  });

  instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  )

  return instance;
};

export default fetchClient();