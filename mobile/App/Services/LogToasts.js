import { Toast } from 'native-base'

export const WARN_MISSING = 'Preencha os campos em falta!';

export const SUCCESS_LOGIN = 'Login bem-sucedido :)';
export const ERROR_INVALID_EMAIL = 'E-mail inválido!';
export const ERROR_INVALID_PARAM_LOGIN = 'E-mail ou palavra-passe incorreto(s)!';

export const SUCCESS_REGISTER = 'Registo bem-sucedido :)';
export const ERROR_INVALID_PARAM_REGISTER = 'Parâmetro(s) inválido(s)!';
export const ERROR_EMAIL_EXISTS_REGISTER = 'E-mail já existe!';

const DURATION_ERROR_MSG = 10000;
const DURATION_WARN_MSG = 10000;
const DURATION_SUCCESS_MSG = 5000;

const CLOSE_MSG = 'Ok!';

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
