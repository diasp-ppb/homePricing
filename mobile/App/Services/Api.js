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

export const baseURL = "http://172.30.8.9:3000"

export function checkRegisterResponse(responseJson, props) {
    if (responseJson.code === '400') {
        ToastError(ERROR_INVALID_PARAM_REGISTER);
    } else if (responseJson.code === '409') {
        ToastError(ERROR_EMAIL_EXISTS_REGISTER);
    } else {
        const { navigate } = props.navigation;
        navigate('Login');
        ToastSuccess(SUCCESS_REGISTER);
    }
}

export function checkLoginResponse(responseJson, props) {

    if (responseJson.code === '400') {
        ToastError(ERROR_INVALID_EMAIL);
    } else if (responseJson.code === '401') {
        ToastError(ERROR_INVALID_PARAM_LOGIN);
    } else {
        const { navigate } = props.navigation;

        ToastSuccess(SUCCESS_LOGIN);
        props.login(responseJson.user, responseJson.token.accessToken);
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

    if(minArea !== "") {
        if(isNotNumeric(minArea)) {
            valid = false;
            ToastWarning(error_area('min'));
        }
    }

    if (maxArea !== "") {
        if(isNotNumeric(maxArea)) {
            valid = false;
            ToastWarning(error_area('max'));
        }
    }
    if(minArea !== "" && maxArea !== "") {
        if (parseInt(minArea) >= parseInt(maxArea)) {
            valid = false;
            ToastWarning(ERROR_AREAS);
        }
    }

    return valid;
}

export function validatePrices(minPrice, maxPrice) {
    let valid = true;

    if(minPrice !== "") {
        if (isNotNumeric(minPrice)) {
            valid = false;
            ToastWarning(error_price('min'));
        }
    }

    if (maxPrice !== "") {
        if(isNotNumeric(maxPrice)) {
            valid = false;
            ToastWarning(error_price('max'));
        }
    }

    if(minPrice !== "" && maxPrice !== "") {
        if (parseInt(minPrice) >= parseInt(maxPrice)) {
            valid = false;
            ToastWarning(ERROR_PRICES);
        }
    }

    return valid;
}

export function validateService(service, desc) {
    let valid = true;

    if (service !== "") {
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
    .then(
        (response) => response.json()
    )
    .then(
        (responseJson) => checkRegisterResponse(responseJson, props)
    )
    .catch(
        (error) => console.error(error)
    );
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
    .catch(
        (error) => console.error(error)
    );
}

export function logoutAPI(props) {
    const { navigate } = props.navigation;
    props.logout();
    navigate('LaunchScreen');
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
    .then(
        (responseJson) => {
            ToastSuccess(UPDATE_USER_PREFERENCES);
            const { navigate } = props.navigation;
            navigate('UserProfile');
        })
    .catch((error) => console.error(error));
}

export function getUserPreferences(thisUser) {

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

        thisUser.setState({
          goal: resp.finality,
          propertyType: resp.type,
          tipology: resp.tipology,
          minArea: resp.areaMin !== null ? resp.areaMin : "",
          maxArea: resp.areaMax !== null ? resp.areaMax : "",
          minPrice: resp.priceMin !== null ? resp.priceMin : "",
          maxPrice: resp.priceMax !== null ? resp.priceMax : "",
          hospitalDist: services[0].distance !== null ? services[0].distance : "",
          hospitalQtn: services[0].quantity !== null ? services[0].quantity : "",
          schoolDist: services[1].distance !== null ? services[1].distance : "",
          schoolQtn: services[1].quantity !== null ? services[1].quantity : "",
          workPlace: resp.workAddress,
          workDistance: resp.workMaxDistance !== null ? resp.workMaxDistance : ""
        });
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
      'Authorization' : auth
    },
    body: JSON.stringify({
      userId: user,
      houseId: house
    }),
  })
    .then((response) => response.json())
    .then(
      (responseJson) => responseJson
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
    .then()
    .catch((error) => {
      console.error(error);
    });
}


