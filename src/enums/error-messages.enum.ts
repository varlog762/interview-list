export enum ErrorMessagesEnum {
  INVALID_EMAIL = 'The email address is invalid',
  EMAIL_ALREADY_IN_USE = 'This email is already in use',
  ENTER_PASSWORD = 'Please enter a password',
  INVALID_PASSWORD_MIN_LENGTH = 'Password is too short',
  INVALID_PASSWORD_UPPERCASE = 'Password must contain at least one uppercase letter',
  INVALID_PASSWORD_LOWERCASE = 'Password must contain at least one lowercase letter',
  INVALID_PASSWORD_NUMBER = 'Password must contain at least one number',
  INVALID_PASSWORD_SPECIAL = 'Password must contain at least one special character',
  PASSWORD_TOO_WEAK = 'The password is too weak',
  PASSWORDS_DONT_MATCH = 'Passwords do not match',
  INVALID_CREDENTIALS = 'Invalid email or password',
  ACCOUNT_DISABLED = 'This user account has been disabled',
  PERMISSION_DENIED = 'Permission denied',
  REQUIRED_FIELD = 'This field is required',
  UNKNOWN_ERROR = 'An unknown error occurred',
}