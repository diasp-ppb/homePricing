// a library to wrap and simplify api calls

import { SUCCESS_LOGIN,
  ERROR_INVALID_EMAIL, ERROR_INVALID_PARAM_LOGIN,
  SUCCESS_REGISTER,
  ERROR_INVALID_PARAM_REGISTER, ERROR_EMAIL_EXISTS_REGISTER } from './LogToasts'
import { ToastSuccess, ToastError } from './LogToasts'
import { login } from '../Redux/LoginRedux'

export const baseURL = "http://172.30.8.202:3000";


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
  fetch(baseURL + "/v1/auth/login", {
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
  fetch(baseURL + "/v1/auth/register", {
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
