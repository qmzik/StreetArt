export const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
export const NAME_REGEXP = /^(?!!@#\$%\^&.*\(\)-="№%:,\.;_\+1234567890$)([A-ZА-Я][a-zа-я]{1,70})$/;
export const USERNAME_REGEXP = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
