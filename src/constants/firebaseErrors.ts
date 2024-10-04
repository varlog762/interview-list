import { authErrors } from 'src/enums';

export const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': authErrors.EMAIL_ALREADY_IN_USE,
  'auth/invalid-email': authErrors.INVALID_EMAIL,
  'auth/weak-password': authErrors.PASSWORD_TOO_WEAK,
  'auth/user-disabled': authErrors.ACCOUNT_DISABLED,
  'auth/user-not-found': authErrors.USER_NOT_FOUND,
  'auth/wrong-password': authErrors.INCORRECT_PASSWORD,
};
