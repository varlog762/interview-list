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

/**
 * Checks if the given email address is valid.
 * @param {string} email - The email address to validate.
 * @returns {string | boolean} An error message if the email is invalid, or true if it is valid.
 */
export const validateEmailInput = (email: string): string | boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(email) || ErrorMessagesEnum.INVALID_EMAIL;
};

/**
 * Checks if the given password is valid.
 * @param {string} password - The password to validate.
 * @returns {string | boolean} An error message if the password is invalid, or true if it is valid.
 * Password requirements:
 * - Minimum length: 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
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

/**
 * Checks if the given input value is not empty.
 * @param {string} inputValue - The value to validate.
 * @returns {string | boolean} An error message if the value is empty, or true if it is not empty.
 */
export const validateRequiredInput = (inputValue: string): boolean | string =>
  !!inputValue || ErrorMessagesEnum.REQUIRED_FIELD;

/**
 * Retrieves a user-friendly error message based on the provided error.
 * If the error is a FirebaseError, it returns a predefined message
 * corresponding to the error code. Otherwise, it returns a default
 * unknown error message.
 *
 * @param error - The error object which can be a standard Error or a FirebaseError.
 * @returns A string representing the user-friendly error message.
 */
export const getErrorMessage = (error: Error | FirebaseError): string => {
  if (error instanceof FirebaseError) {
    return firebaseErrorMessages[error.code] ?? ErrorMessagesEnum.UNKNOWN_ERROR;
  }

  return ErrorMessagesEnum.UNKNOWN_ERROR;
};

/**
 * Creates a new InterviewInputInterface with default values.
 * The created object has an unique identifier and default values for the other properties.
 * @returns A new InterviewInputInterface object.
 */
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

/**
 * Creates a new InterviewStageInterface with default values.
 * The created object has an unique identifier and default values for the other properties.
 * @returns A new InterviewStageInterface object.
 */
export const createNewStage = (): InterviewStageInterface => {
  const newStageId = uuidv4();

  return {
    interviewStageId: newStageId,
    interviewStageName: '',
    interviewStageDate: '',
    interviewStageComment: '',
  };
};

/**
 * Returns a user-friendly string representation of the given salary range.
 * If both minSalary and maxSalary are 0, it returns a hyphen.
 * If minSalary is 0, it returns maxSalary as a string.
 * If minSalary equals maxSalary, it returns minSalary as a string.
 * Otherwise, it returns a range string in the format "minSalary - maxSalary".
 * @param {number} minSalary - The minimum salary.
 * @param {number} maxSalary - The maximum salary.
 * @returns {string} A user-friendly string representation of the salary range.
 */
export const displaySalary = (minSalary: number, maxSalary: number): string => {
  if (!minSalary && !maxSalary) return '-';
  if (!minSalary) return `${maxSalary}`;
  if (minSalary === maxSalary) return `${minSalary}`;

  return `${minSalary} - ${maxSalary}`;
};

/**
 * Determines the color of the status badge based on the interview status.
 *
 * @param {string} status - The current status of the interview.
 * @returns {string} - The color name corresponding to the interview status.
 *
 * The function maps different interview statuses to predefined color names:
 * - 'Offer' maps to a positive color.
 * - 'Reject' maps to a negative color.
 * - 'Scheduled' maps to a primary color.
 * - 'Canceled' maps to a warning color.
 * - 'Pending' and any unrecognized status map to an info color.
 */
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

/**
 * Maps an interview status to a corresponding color hex value.
 *
 * @param {string} status - The current status of the interview.
 * @returns {string} - The hex color value associated with the interview status.
 *
 * The function maps different interview statuses to predefined color hex values:
 * - 'Offer' maps to the positive color hex value.
 * - 'Reject' maps to the negative color hex value.
 * - 'Scheduled' maps to the primary color hex value.
 * - 'Canceled' maps to the warning color hex value.
 * - 'Pending' and any unrecognized status map to the info color hex value.
 */
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
