import { ErrorMessages } from 'src/enums';

export const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': ErrorMessages.EMAIL_ALREADY_IN_USE,
  'auth/invalid-email': ErrorMessages.INVALID_EMAIL,
  'auth/weak-password': ErrorMessages.PASSWORD_TOO_WEAK,
  'auth/user-disabled': ErrorMessages.ACCOUNT_DISABLED,
  'auth/invalid-credential': ErrorMessages.INVALID_CREDENTIALS,
  'permission-denied': ErrorMessages.PERMISSION_DENIED,
};
