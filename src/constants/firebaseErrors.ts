import { AuthErrors } from 'src/enums';

export const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': AuthErrors.EMAIL_ALREADY_IN_USE,
  'auth/invalid-email': AuthErrors.INVALID_EMAIL,
  'auth/weak-password': AuthErrors.PASSWORD_TOO_WEAK,
  'auth/user-disabled': AuthErrors.ACCOUNT_DISABLED,
  'auth/invalid-credential': AuthErrors.INVALID_CREDENTIALS,
};
