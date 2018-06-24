// a library to wrap and simplify api calls

import { SUCCESS_LOGIN,
  ERROR_INVALID_EMAIL, ERROR_INVALID_PARAM_LOGIN,
  SUCCESS_REGISTER,
  ERROR_INVALID_PARAM_REGISTER, ERROR_EMAIL_EXISTS_REGISTER,
  LOGOUT_SUCCESS,
  UPDATE_USER_PREFERENCES,
  ERROR_AREAS, ERROR_PRICES,
  error_area, error_service,
  ToastWarning } from './LogToasts'
import { ToastSuccess, ToastError } from './LogToasts'
import { login } from '../Redux/LoginRedux'
import {Keyboard} from 'react-native'

export const baseURL = "http://165.227.170.190:3000";

export function checkRegisterResponse(responseJson, thisUser) {
  if (responseJson.code == '400') {
    thisUser.setState({password : ''});
    thisUser.setState({confirmPassword : ''});
    ToastError(ERROR_INVALID_PARAM_REGISTER);
  } else if (responseJson.code == '409') {
    thisUser.setState({password : ''});
    thisUser.setState({confirmPassword : ''});
    ToastError(ERROR_EMAIL_EXISTS_REGISTER);
  } else {
    const { navigate } = thisUser.props.navigation;
    thisUser.props.login(responseJson.user, responseJson.token.accessToken);
    navigate('userStack');
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
    Keyboard.dismiss();
    navigate('userStack');
  }
}

export function createBodyUserPreferences(district, goal, propertyType, tipology,

                                          minArea, maxArea,
                                          minPrice, maxPrice,
                                          hospitalDist, hospitalQtn,
                                          schoolDist, schoolQtn,
                                          shopDist, shopQtn,
                                          transpDist, transpQtn,
                                          workPlace, workDistance)
{
  return body = JSON.stringify({
    district: district,
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
    },
    {
      service: 'Shopping',
      distance: shopDist,
      quantity: shopQtn
    },
    {
      service: 'Transport',
      distance: transpDist,
      quantity: transpQtn
    }
    ],
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
    } else if (minArea < 0) {
      valid = false;
      ToastWarning(error_area('min'));
    }
  }

  if (maxArea != "") {
    if(isNotNumeric(maxArea)) {
      valid = false;
      ToastWarning(error_area('max'));
    } else if (maxArea < 0) {
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

  if (parseInt(minPrice) >= parseInt(maxPrice)) {
    valid = false;
    ToastWarning(ERROR_PRICES);
  }

  return valid;
}

export function validateService(service, desc) {
  let valid = true;

  if (service != "") {
    if(isNotNumeric(service)) {
      valid = false;
      ToastWarning(error_service(desc));
    } else if (service < 0) {
      valid = false;
      ToastWarning(error_service(desc));
    }
  }

  return valid;
}

export function validateServices(hospitalDist, hospitalQtn,
  schoolDistance, schoolQuantity,
  shoppingDist, shoppingQtn,
  transportDist, transportQtn,
  workDistance) {
  let hospDist = validateService(hospitalDist, 'hosp_dist');
  let hospQtn = validateService(hospitalQtn, 'hosp_qtn');
  let schoolDist = validateService(schoolDistance, 'school_dist');
  let schoolQtn = validateService(schoolQuantity, 'school_qtn');
  let shopDist = validateService(shoppingDist, 'shop_dist');
  let shopQtn = validateService(shoppingQtn, 'shop_qtn');
  let transpDist = validateService(transportDist, 'transp_dist');
  let transpQtn = validateService(transportQtn, 'transp_qtn');
  let work = validateService(workDistance, 'work');

  if (hospDist && hospQtn && schoolDist && schoolQtn && shopDist && shopQtn && transpDist && transpQtn && work)
    return true;
  else
  {
    return false;
  }
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
    district: resp.district,
    goal: resp.finality,
    propertyType: resp.type,
    tipology: tipology,
    minArea: resp.areaMin != undefined ? resp.areaMin : "",
    maxArea: resp.areaMax != undefined ? resp.areaMax : "",
    minPrice: resp.priceMin,
    maxPrice: resp.priceMax,
    hospitalDist: services.length >= 0 ? services[0].distance : "",
    hospitalQtn: services.length >= 0 ? services[0].quantity : "",
    schoolDist: services.length >= 1 ? services[1].distance : "",
    schoolQtn: services.length >= 1 ? services[1].quantity : "",
    shopDist: services.length >= 2 ? services[2].distance : "",
    shopQtn: services.length >= 2 ? services[2].quantity : "",
    transpDist: services.length >= 3 ? services[3].distance : "",
    transpQtn: services.length >= 3 ? services[3].quantity : "",
    workPlace: resp.workAddress,
    workDistance: resp.workMaxDistance != null ? resp.workMaxDistance : ""
  });
}

function setServicesHouseSearch(services, thisUser) {
  if (services.length >= 0) {
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
  }

  if (services.length >= 1) {
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
  }

  if (services.length >= 2) {
    if (services[2].distance != "") {
      if(services[2].distance > 0) {
        thisUser.setState({ shopping: true });
      }
    }

    if (services[2].quantity != "") {
      if(services[2].quantity > 0) {
        thisUser.setState({ shopping: true });
      }
    }
  }

  if (services.length >= 3) {
    if (services[3].distance != "") {
      if(services[3].distance > 0) {
        thisUser.setState({ transport: true });
      }
    }

    if (services[3].quantity != "") {
      if(services[3].quantity > 0) {
        thisUser.setState({ transport: true });
      }
    }
  }
}

function parseDistrict(respDistrict) {
  let district = "Aveiro";
  switch (respDistrict) {
    case 'beja':
      district = 'Beja';
      break;
    case 'braga':
      district = 'Braga';
      break;
    case 'bragança':
      district = 'Bragança';
      break;
    case 'castelo branco':
      district = 'Castelo Branco';
      break;
    case 'coimbra':
      district = 'Coimbra';
      break;
    case 'evora':
      district = 'Évora';
      break;
    case 'faro':
      district = 'Faro';
      break;
    case 'guarda':
      district = 'Guarda';
      break;
    case 'leiria':
      district = 'Leiria';
      break;
    case 'lisboa':
      district = 'Lisboa';
      break;
    case 'portalegre':
      district = 'Portalegre';
      break;
    case 'porto':
      district = 'Porto';
      break;
    case 'santarem':
      district = 'Santarém';
      break;
    case 'setubal':
      district = 'Setúbal';
      break;
    case 'viana do castelo':
      district = 'Viana do Castelo';
      break;
    case 'vila real':
      district = 'Vila Real';
      break;
    case 'viseu':
      district = 'Viseu';
      break;
  }

  return district;
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

  setServicesHouseSearch(services, thisUser);

  var rent = false;
  var buy = false;

  if (resp.finality != null) {
    rent = resp.finality.toUpperCase() == "ALUGAR" ? true : false;
    buy = resp.finality.toUpperCase() == "COMPRAR" ? true : false;
  }

  let district = parseDistrict(resp.district);

  thisUser.setState({
    loaded: true,
    rent: rent,
    buy: buy,
    city: district,
    propertyType: resp.type,
    tipology: resp.tipology != null ? resp.tipology.toUpperCase() : null,
    minArea: resp.areaMin != null ? resp.areaMin : "",
    maxArea: resp.areaMax != null ? resp.areaMax : "",
    minPrice: resp.priceMin,
    maxPrice: resp.priceMax,
    workLocation: resp.workAddress,
    workDistance: resp.workMaxDistance != null ? resp.workMaxDistance : ""
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
      () => { ToastSuccess("Casa adicionada aos favoritos!"); }
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
    .then(() => { ToastSuccess("Casa removida dos favoritos."); })
    .catch((error) => {
      console.error(error);
    });
}


