import { Toast } from 'native-base'

export function loginSuccess() {
    Toast.show({
        text: 'Login bem-sucedido :)',
        buttonText: 'Ok!',
        duration: 5000,
        type: "success",
    });
}

export function registerSuccess() {
    Toast.show({
        text: 'Registo bem-sucedido :)',
        buttonText: 'Ok!',
        duration: 5000,
        type: "success",
    });
}

export function missingFields() {
    Toast.show({
        text: 'Preencha os campos em falta!',
        buttonText: 'Ok!',
        duration: 10000,
        type: "warning",
    });
}

export function loginInvalidEmail() {
    Toast.show({
        text: 'E-mail inválido!',
        buttonText: 'Ok!',
        duration: 10000,
        type: "danger",
    });
}

export function loginInvalidParam() {
    Toast.show({
        text: 'E-mail ou palavra-passe incorreto(s)!',
        buttonText: 'Ok!',
        duration: 10000,
        type: "danger",
    });
}

export function registerInvalidParam() {
    Toast.show({
        text: 'Parâmetro(s) inválido(s)!',
        buttonText: 'Ok!',
        duration: 10000,
        type: "danger",
    });
}

export function registerEmailExists() {
    Toast.show({
        text: 'E-mail já existe!',
        buttonText: 'Ok!',
        duration: 10000,
        type: "danger",
    });
}

