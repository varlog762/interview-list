import { ErrorMessagesEnum } from 'src/enums';

export const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': ErrorMessagesEnum.EMAIL_ALREADY_IN_USE,
  'auth/invalid-email': ErrorMessagesEnum.INVALID_EMAIL,
  'auth/weak-password': ErrorMessagesEnum.PASSWORD_TOO_WEAK,
  'auth/user-disabled': ErrorMessagesEnum.ACCOUNT_DISABLED,
  'auth/invalid-credential': ErrorMessagesEnum.INVALID_CREDENTIALS,
  'permission-denied': ErrorMessagesEnum.PERMISSION_DENIED,
};
