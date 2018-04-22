// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import { SUCCESS_LOGIN, 
  ERROR_INVALID_EMAIL, ERROR_INVALID_PARAM_LOGIN,
  SUCCESS_REGISTER, 
  ERROR_INVALID_PARAM_REGISTER, ERROR_EMAIL_EXISTS_REGISTER } from './LogToasts'
import { ToastSuccess, ToastError } from './LogToasts'
import { login } from '../Redux/LoginRedux'

function checkLoginResponse(responseJson, props) {
  if (responseJson.code == '400') {
      ToastError(ERROR_INVALID_EMAIL);
  } else if (responseJson.code == '401') {
      ToastError(ERROR_INVALID_PARAM_LOGIN);
  } else {
      const { navigate } = props.navigation;
          
      ToastSuccess(SUCCESS_LOGIN);
      props.login(responseJson.user.id, responseJson.token.accessToken);
      navigate('UserProfile');
      
  }
}

function checkRegisterResponse(responseJson, props) {
  if (responseJson.code == '400') {
      ToastError(ERROR_INVALID_PARAM_REGISTER);
  } else if (responseJson.code == '409') {
      ToastError(ERROR_EMAIL_EXISTS_REGISTER);
  } else {
      const { navigate } = props.navigation;
      navigate('Login');
      ToastSuccess(SUCCESS_REGISTER);
  }
}

export function loginAPI(email, password, props) {
  fetch("http://192.168.1.75:3000/v1/auth/login", {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: email,
          password: password
      }),
  })
  .then(
    (response) => response.json()
  )
  .then(
    (responseJson) => checkLoginResponse(responseJson, props)
  )
  .catch((error) => {
      console.error(error);
  });
}

export function registerAPI(name, email, password, props) {
  fetch("http://192.168.1.75:3000/v1/auth/register", {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: email,
          name: name,
          password: password
      }),
  })
  .then((response) => response.json())
  .then(
      (responseJson) => checkRegisterResponse(responseJson, props)
  )
  .catch((error) => {
      console.error(error);
  });
}

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser
  }
}

// let's return back our create method as the default.
export default {
  create
}
