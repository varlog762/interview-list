import { FirebaseError } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

import type {
  InterviewInputInterface,
  InterviewStageInterface,
} from 'src/models';
import {
  ErrorMessagesEnum,
  InterviewStatusEnum,
  ColorNamesEnum,
} from 'src/enums';
import { firebaseErrorMessages, brandColors } from 'src/constants';

export const validateEmailInput = (email: string): string | boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(email) || ErrorMessagesEnum.INVALID_EMAIL;
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
    return ErrorMessagesEnum.ENTER_PASSWORD;
  }

  if (password.length < minLength) {
    return ErrorMessagesEnum.INVALID_PASSWORD_MIN_LENGTH;
  }
  if (!hasUppercaseLetter) {
    return ErrorMessagesEnum.INVALID_PASSWORD_UPPERCASE;
  }
  if (!hasLowercaseLetter) {
    return ErrorMessagesEnum.INVALID_PASSWORD_LOWERCASE;
  }
  if (!hasNumber) {
    return ErrorMessagesEnum.INVALID_PASSWORD_NUMBER;
  }
  if (!hasSpecialCharacter) {
    return ErrorMessagesEnum.INVALID_PASSWORD_SPECIAL;
  }

  return true;
};

export const validateRequiredInput = (inputValue: string): boolean | string =>
  !!inputValue || ErrorMessagesEnum.REQUIRED_FIELD;

export const getErrorMessage = (error: Error | FirebaseError): string => {
  if (error instanceof FirebaseError) {
    return firebaseErrorMessages[error.code] ?? ErrorMessagesEnum.UNKNOWN_ERROR;
  }

  return ErrorMessagesEnum.UNKNOWN_ERROR;
};

export const createNewInterview = (): InterviewInputInterface => {
  const newInterviewId = uuidv4();

  return {
    id: newInterviewId,
    companyName: '',
    vacancyLink: '',
    hrName: '',
    telegramUsername: '',
    whatsAppUsername: '',
    hrPhoneNumber: '',
    minSalary: 0,
    maxSalary: 0,
    status: InterviewStatusEnum.SCHEDULED,
    createdAt: new Date(),
  };
};

export const createNewStage = (): InterviewStageInterface => {
  const newStageId = uuidv4();

  return {
    interviewStageId: newStageId,
    interviewStageName: '',
    interviewStageDate: '',
    interviewStageComment: '',
  };
};

export const displaySalary = (minSalary: number, maxSalary: number): string => {
  if (!minSalary && !maxSalary) return '-';
  if (!minSalary) return `${maxSalary}`;
  if (minSalary === maxSalary) return `${minSalary}`;

  return `${minSalary} - ${maxSalary}`;
};

export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case InterviewStatusEnum.OFFER:
      return ColorNamesEnum.POSITIVE;
    case InterviewStatusEnum.REJECT:
      return ColorNamesEnum.NEGATIVE;
    case InterviewStatusEnum.SCHEDULED:
      return ColorNamesEnum.PRIMARY;
    case InterviewStatusEnum.CANCELED:
      return ColorNamesEnum.WARNING;
    case InterviewStatusEnum.PENDING:
      return ColorNamesEnum.INFO;
    default:
      return ColorNamesEnum.INFO;
  }
};

export const getColorHexByStatus = (status: string): string => {
  switch (status) {
    case InterviewStatusEnum.OFFER:
      return brandColors.POSITIVE;
    case InterviewStatusEnum.REJECT:
      return brandColors.NEGATIVE;
    case InterviewStatusEnum.SCHEDULED:
      return brandColors.PRIMARY;
    case InterviewStatusEnum.CANCELED:
      return brandColors.WARNING;
    case InterviewStatusEnum.PENDING:
      return brandColors.INFO;
    default:
      return brandColors.INFO;
  }
};
