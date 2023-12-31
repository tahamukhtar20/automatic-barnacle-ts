/* eslint-disable import/prefer-default-export */

export function validateEmail(value: string): boolean {
    return /^[^@]+@[^@]+$/.test(value);
}

export function validateUserName(value: string): boolean {
    return value.length >= 6;
}
