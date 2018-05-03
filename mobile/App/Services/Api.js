// a library to wrap and simplify api calls

import { SUCCESS_LOGIN,
  ERROR_INVALID_EMAIL, ERROR_INVALID_PARAM_LOGIN,
  SUCCESS_REGISTER,
  ERROR_INVALID_PARAM_REGISTER, ERROR_EMAIL_EXISTS_REGISTER } from './LogToasts'
import { ToastSuccess, ToastError } from './LogToasts'
import { login } from '../Redux/LoginRedux'

export const baseURL = "http://172.30.26.77";


export function checkLoginResponse(responseJson, props) {
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

export function checkRegisterResponse(responseJson, props) {
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

export function createBodyUserPreferences(goal, propertyType, tipology, 
    minArea, maxArea, 
    minPrice, maxPrice, 
    hospitalDist, hospitalQtn, 
    schoolDist, schoolQtn, 
    workPlace, workDistance)
    {
        return body = JSON.stringify({
            finality: goal,
            type: propertyType,
            tipology: tipology,
            areaMin: minArea,
            areaMax: maxArea,
            priceMin: minPrice,
            priceMax: maxPrice,
            services: [{
                service: 'Hospital',
                distance: hospitalDist,
                quantity: hospitalQtn
            },
            {
                service: 'School',
                distance: schoolDist,
                quantity: schoolQtn                
            }],
            workAddress: workPlace,
            workMaxDistance: workDistance
        });
}

export function updateUserPreferences(bodyContent, props) {
    var url = baseURL + '/v1/users/preferences';
    var auth = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjUzOTE1ODIsImlhdCI6MTUyNTM4Nzk4Mywic3ViIjoiNWFkN2Y2OTgxNTI1ODcwMDFlNDc4OWU3In0.Vy8Z2SAc0s6xkfy1tDSdYn2vDg6iubyQ6tGbFuHtFYk';
    
    fetch(url, {
        method: 'PATCH',
        headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : auth
        },
        body: bodyContent,
    })
    .catch((error) => { console.error(error); });
}

export function getUserPreferences(updateUserPreferences) {

    var url = baseURL + '/v1/users/preferences';
    var auth = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjUzOTE1ODIsImlhdCI6MTUyNTM4Nzk4Mywic3ViIjoiNWFkN2Y2OTgxNTI1ODcwMDFlNDc4OWU3In0.Vy8Z2SAc0s6xkfy1tDSdYn2vDg6iubyQ6tGbFuHtFYk';
    
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : auth
      }
    }).then(
      (response) => response.json()
    )
    .then((responseJson) => {

        if(responseJson.code == '401') {
            console.error('Jwt expired!');
        }

        var services = responseJson.services.map(function(item) {
            return {
                service: item.service,
                distance: item.distance,
                quantity: item.quantity
            };
        });

        if(services.length == 0) {
            updateUserPreferences.setState({getData: false});
            return;
        }

        updateUserPreferences.setState({goal: responseJson.finality});
        updateUserPreferences.setState({propertyType: responseJson.type});
        updateUserPreferences.setState({tipology: responseJson.tipology})
        updateUserPreferences.setState({minArea: responseJson.areaMin});
        updateUserPreferences.setState({maxArea: responseJson.areaMax});
        updateUserPreferences.setState({minPrice: responseJson.priceMin});
        updateUserPreferences.setState({maxPrice: responseJson.priceMax});
        updateUserPreferences.setState({workPlace: responseJson.workAddress});
        updateUserPreferences.setState({workDistance: responseJson.workMaxDistance});              
        updateUserPreferences.setState({hospitalDist: services[0].distance});
        updateUserPreferences.setState({hospitalQtn: services[0].quantity});
        updateUserPreferences.setState({schoolDist: services[1].distance});
        updateUserPreferences.setState({schoolQtn:services[1].quantity});
    }
    ).catch((error) => {
      console.error(error);
    });

}