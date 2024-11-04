import { FirebaseError } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

import { ErrorMessages } from 'src/enums';
import { firebaseErrorMessages } from 'src/constants';

export const validateEmailInput = (email: string): string | boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(email) || ErrorMessages.INVALID_EMAIL;
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
    return ErrorMessages.ENTER_PASSWORD;
  }

  if (password.length < minLength) {
    return ErrorMessages.INVALID_PASSWORD_MIN_LENGTH;
  }
  if (!hasUppercaseLetter) {
    return ErrorMessages.INVALID_PASSWORD_UPPERCASE;
  }
  if (!hasLowercaseLetter) {
    return ErrorMessages.INVALID_PASSWORD_LOWERCASE;
  }
  if (!hasNumber) {
    return ErrorMessages.INVALID_PASSWORD_NUMBER;
  }
  if (!hasSpecialCharacter) {
    return ErrorMessages.INVALID_PASSWORD_SPECIAL;
  }

  return true;
};

export const validateRequiredInput = (inputValue: string): boolean | string =>
  !!inputValue || ErrorMessages.REQUIRED_FIELD;

export const getErrorMessage = (error: Error | FirebaseError): string => {
  if (error instanceof FirebaseError) {
    return firebaseErrorMessages[error.code] ?? ErrorMessages.UNKNOWN_ERROR;
  }

  return ErrorMessages.UNKNOWN_ERROR;
};

export const createNewStage = () => {
  const newStageId = uuidv4();

  return {
    interviewStageId: newStageId,
    interviewStageName: '',
    interviewStageDate: '',
    interviewStageComment: '',
  };
};
