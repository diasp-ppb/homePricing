// a library to wrap and simplify api calls

import { SUCCESS_LOGIN,
    ERROR_INVALID_EMAIL, ERROR_INVALID_PARAM_LOGIN,
    SUCCESS_REGISTER,
    ERROR_INVALID_PARAM_REGISTER, ERROR_EMAIL_EXISTS_REGISTER,
    LOGOUT_SUCCESS,
    UPDATE_USER_PREFERENCES,
    ERROR_AREAS, ERROR_PRICES,
    error_area, error_price, error_service,
    ToastWarning } from './LogToasts'
  import { ToastSuccess, ToastError } from './LogToasts'
  import { login } from '../Redux/LoginRedux'
  
  export const baseURL = "http://172.30.5.172:3000"
  
  export function checkRegisterResponse(responseJson, thisUser) {
      if (responseJson.code == '400') {
          ToastError(ERROR_INVALID_PARAM_REGISTER);
      } else if (responseJson.code == '409') {
          ToastError(ERROR_EMAIL_EXISTS_REGISTER);
      } else {
          const { navigate } = thisUser.props.navigation;
          navigate('Login');
          ToastSuccess(SUCCESS_REGISTER);
      }
  }
  
  export function checkLoginResponse(responseJson, thisUser) {
  
      if (responseJson.code == '400') {
          thisUser.setState({password : ''});
          ToastError(ERROR_INVALID_EMAIL);
      } else if (responseJson.code == '401') {
          thisUser.setState({password : ''});
          ToastError(ERROR_INVALID_PARAM_LOGIN);
      } else {
          const { navigate } = thisUser.props.navigation;
          ToastSuccess(SUCCESS_LOGIN);
          thisUser.props.login(responseJson.user, responseJson.token.accessToken);
          navigate('userStack');
      }
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


  
  
  function isNotNumeric(num){
      return isNaN(num);
  }
  
  
  export function validateArea(minArea, maxArea) {
      let valid = true;
  
      if(minArea != "") {
          if(isNotNumeric(minArea)) {
              valid = false;
              ToastWarning(error_area('min'));
          }
      }
  
      if (maxArea != "") {
          if(isNotNumeric(maxArea)) {
              valid = false;
              ToastWarning(error_area('max'));
          }
      }
      if(minArea != "" && maxArea != "") {
          if (parseInt(minArea) >= parseInt(maxArea)) {
              valid = false;
              ToastWarning(ERROR_AREAS);
          }
      }
  
      return valid;
  }
  
  export function validatePrices(minPrice, maxPrice) {
      let valid = true;
  
      if(minPrice != "") {
          if (isNotNumeric(minPrice)) {
              valid = false;
              ToastWarning(error_price('min'));
          }
      }
  
      if (maxPrice != "") {
          if(isNotNumeric(maxPrice)) {
              valid = false;
              ToastWarning(error_price('max'));
          }
      }
  
      if(minPrice != "" && maxPrice != "") {
          if (parseInt(minPrice) >= parseInt(maxPrice)) {
              valid = false;
              ToastWarning(ERROR_PRICES);
          }
      }
  
      return valid;
  }
  
  export function validateService(service, desc) {
      let valid = true;
  
      if (service != "") {
          if(isNotNumeric(service)) {
              valid = false;
              ToastWarning(error_service(desc));
          }
      }
  
      return valid;
  }
  
  export function validateServices(hospitalDist, hospitalQtn, schoolDistance, schoolQuantity, workDistance) {
      let hospDist = validateService(hospitalDist, 'hosp_dist');
      let hospQtn = validateService(hospitalQtn, 'hosp_qtn');
      let schoolDist = validateService(schoolDistance, 'school_dist');
      let schoolQtn = validateService(schoolQuantity, 'school_qtn');
      let work = validateService(workDistance, 'work');
  
      if (hospDist && hospQtn && schoolDist && schoolQtn && work)
          return true;
      else return false;
  }
  
  export function registerAPI(email, password, thisUser) {
      fetch(baseURL + "/v1/auth/register", {
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
          (responseJson) => checkRegisterResponse(responseJson, thisUser)
      )
      .catch(
          (error) => console.error(error)
      );
  }
  
  export function loginAPI(email, password, thisUser) {
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
          (responseJson) => checkLoginResponse(responseJson, thisUser)
      )
      .catch(
          (error) => console.error(error)
      );
  }
  
  export function logoutAPI(props) {
      const { navigate } = props.navigation;
      props.logout();
      navigate('visitorStack');
      ToastSuccess(LOGOUT_SUCCESS);
  }
  
  export function updateUserPreferences(bodyContent, props) {
      const url = baseURL + '/v1/users/preferences';
      const auth = 'Bearer ' + props.user.token;
      fetch(url, {
          method: 'PATCH',
          headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json',
          'Authorization' : auth
          },
          body: bodyContent,
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if (responseJson.code == '400') {
              ToastError("Error: " + responseJson.errors[0].messages[0]);
            } else {
              ToastSuccess(UPDATE_USER_PREFERENCES);
              const { navigate } = props.navigation;
              navigate('LaunchScreen');
            }
          })
      .catch((error) => console.error(error));
  }
  
  export function setUserPreferences(resp, thisUser) {
      if(resp.code === '401') {
          console.error('Jwt expired!');
      }
  
      let services = resp.services.map(function(item) {
          return {
              service: item.service,
              distance: item.distance,
              quantity: item.quantity
          };
      });
  
      if(services.length === 0) {
          thisUser.setState({getData: false});
          return;
      }

      var tipology = resp.tipology != null ? resp.tipology.toUpperCase() : null;

      thisUser.setState({
        loaded: true,
        goal: resp.finality,
        propertyType: resp.type,
        tipology: tipology,
        minArea: resp.areaMin != null ? resp.areaMin : "",
        maxArea: resp.areaMax != null ? resp.areaMax : "",
        minPrice: resp.priceMin,
        maxPrice: resp.priceMax,
        hospitalDist: services[0].distance,
        hospitalQtn: services[0].quantity,
        schoolDist: services[1].distance,
        schoolQtn: services[1].quantity,
        workPlace: resp.workAddress,
        workDistance: resp.workMaxDistance != null ? resp.workMaxDistance : ""
      });
  }
  
  export function setUserPreferencesHouseSearch(resp, thisUser)
  {
      if(resp.code === '401') {
          console.error('Jwt expired!');
      }
  
      let services = resp.services.map(function(item) {
          return {
              service: item.service,
              distance: item.distance,
              quantity: item.quantity
          };
      });
      
      if (services[0].distance != "") {
          if(services[0].distance > 0) {
              thisUser.setState({ hospital: true });
          }
      }
  
      if (services[0].quantity != "") {
          if(services[0].quantity > 0) {
              thisUser.setState({ hospital: true });
          }
      }
  
      if (services[1].distance != "") {
          if(services[1].distance > 0) {
              thisUser.setState({ school: true });
          }
      }
  
      if (services[1].quantity != "") {
          if(services[1].quantity > 0) {
              thisUser.setState({ school: true });
          }   
      }

      var rent = false;
      var buy = false;

      if (resp.finality != "") {
        rent = resp.finality.toUpperCase() == "ALUGAR" ? true : false;
        buy = resp.finality.toUpperCase() == "COMPRAR" ? true : false;
      }
  
      thisUser.setState({
          loaded: true,
          rent: rent,
          buy: buy,
          propertyType: resp.type,
          tipology: resp.tipology != null ? resp.tipology.toUpperCase() : null,
          minArea: resp.areaMin,
          maxArea: resp.areaMax,
          minPrice: resp.priceMin,
          maxPrice: resp.priceMax,
          workLocation: resp.workAddress,
          workDistance: resp.workMaxDistance
        });
  }
  
  export function getUserPreferences(thisUser, userPref) {
      const url = baseURL + '/v1/users/preferences';
      const auth = 'Bearer ' + thisUser.props.user.token;
  
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
      .then((resp) => {
          if(resp.services.length > 0) {
            if(userPref) {
                setUserPreferences(resp, thisUser);
            } else {
                setUserPreferencesHouseSearch(resp, thisUser);
            }
        } else thisUser.setState({ getData: false});
      })
      .catch((error) => console.error(error));
  }
  
export function createFavoriteAPI(user, house, token){
  const auth = 'Bearer ' + token;
  fetch(baseURL + "/v1/favorites/create", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : auth,
    },
    body: JSON.stringify({
      userId: user,
      houseId: house
    }),
  })
    .then((response) => response.json())
    .then(
      () => { ToastSuccess("House added to favorites!"); }
    )
    .catch((error) => {
      console.error(error);
    });
}

export function deleteFavoriteAPI(user, house, token){
  const auth = 'Bearer ' + token;
  fetch(baseURL + "/v1/favorites/remove", {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : auth
    },
    body: JSON.stringify({
      userId: user,
      houseId: house
    }),
  })
    .then(() => { ToastSuccess("House removed from favorites."); })
    .catch((error) => {
      console.error(error);
    });
}


