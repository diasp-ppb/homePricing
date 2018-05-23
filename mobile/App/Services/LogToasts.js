import { Toast } from 'native-base'

export const WARN_MISSING = 'Preencha os campos em falta!';

export const SUCCESS_LOGIN = 'Login bem-sucedido :)';
export const ERROR_INVALID_EMAIL = 'E-mail inválido!';
export const ERROR_INVALID_PARAM_LOGIN = 'E-mail ou palavra-passe incorreto(s)!';

export const SUCCESS_REGISTER = 'Registo bem-sucedido :)';
export const ERROR_INVALID_PARAM_REGISTER = 'E-mail inválido!';
export const ERROR_EMAIL_EXISTS_REGISTER = 'E-mail já existe!';

export const UPDATE_USER_PREFERENCES = 'Preferências atualizadas com sucesso!';
export const ERROR_AREAS = 'Área mínima não pode ser maior que a máxima!';
export const ERROR_PRICES = 'Preço mínimo não pode ser maior que o máximo!';

export const LOGOUT_SUCCESS = 'Logout bem-sucedido!';

const DURATION_ERROR_MSG = 10000;
const DURATION_WARN_MSG = 10000;
const DURATION_SUCCESS_MSG = 5000;

const CLOSE_MSG = 'Ok!';

export function error_area(area) {
    if(area == 'min') {
        return 'Área mínima inválida.';
    } else return 'Área máxima inválida.';
}

export function error_price(price) {
    if(price == 'min') {
        return 'Preço mínimo inválido.';
    } else return 'Preço máximo inválido.';
}

export function error_service(service) {
    if(service == "hosp_dist") {
        return 'Raio de distância de hospitais inválido.';
    } else if (service == "hosp_qtn") {
        return 'Quantidade de hospitais inválida.';
    } else if (service == "school_dist") {
        return 'Raio de distância de escolas inválido.'
    } else if (service == "school_qtn") {
        return 'Quantidade de escolas inválida.';
    } else if (service == "work") {
        return 'Raio de distância ao trabalho inválida.';
    }
}

export function ToastSuccess(message) {
    Toast.show({
        text: message,
        buttonText: CLOSE_MSG,
        duration: DURATION_SUCCESS_MSG,
        type: "success",
    });
}

export function ToastError(message) {
    Toast.show({
        text: message,
        buttonText: CLOSE_MSG,
        duration: DURATION_ERROR_MSG,
        type: "danger",
    });
}


export function ToastWarning(message) {
    Toast.show({
        text: message,
        buttonText: CLOSE_MSG,
        duration: DURATION_WARN_MSG,
        type: "warning",
    });
}
