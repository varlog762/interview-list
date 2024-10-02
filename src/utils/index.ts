import { authErrors } from 'src/enums';

export const validateEmailInput = (email: string): string | boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(email) || authErrors.INVALID_EMAIL;
};

export const validatePasswordInput = (value: string): string | boolean => {
  const minLength = 8;
  const hasUppercaseLetter = /[A-Z]/.test(value);
  const hasLowercaseLetter = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    value
  );

  if (value.length < minLength) {
    return authErrors.INVALID_PASSWORD_MIN_LENGTH;
  }
  if (!hasUppercaseLetter) {
    return authErrors.INVALID_PASSWORD_UPPERCASE;
  }
  if (!hasLowercaseLetter) {
    return authErrors.INVALID_PASSWORD_LOWERCASE;
  }
  if (!hasNumber) {
    return authErrors.INVALID_PASSWORD_NUMBER;
  }
  if (!hasSpecialCharacter) {
    return authErrors.INVALID_PASSWORD_SPECIAL;
  }

  return true;
};
