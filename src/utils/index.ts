import { AuthErrors } from 'src/enums';
import { firebaseErrorMessages } from 'src/constants';

export const validateEmailInput = (email: string): string | boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(email) || AuthErrors.INVALID_EMAIL;
};

export const validatePasswordInput = (password: string): string | boolean => {
  const minLength = 8;
  const hasUppercaseLetter = /[A-Z]/.test(password);
  const hasLowercaseLetter = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    password
  );

  if (!password) {
    return AuthErrors.ENTER_PASSWORD;
  }

  if (password.length < minLength) {
    return AuthErrors.INVALID_PASSWORD_MIN_LENGTH;
  }
  if (!hasUppercaseLetter) {
    return AuthErrors.INVALID_PASSWORD_UPPERCASE;
  }
  if (!hasLowercaseLetter) {
    return AuthErrors.INVALID_PASSWORD_LOWERCASE;
  }
  if (!hasNumber) {
    return AuthErrors.INVALID_PASSWORD_NUMBER;
  }
  if (!hasSpecialCharacter) {
    return AuthErrors.INVALID_PASSWORD_SPECIAL;
  }

  return true;
};

export const getErrorMessage = (errorCode: string): string => {
  return firebaseErrorMessages[errorCode] ?? AuthErrors.UNKNOWN_ERROR;
};
