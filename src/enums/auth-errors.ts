export enum authErrors {
  INVALID_EMAIL = 'Please enter a valid email address',
  ENTER_PASSWORD = 'Please enter a password',
  INVALID_PASSWORD_MIN_LENGTH = 'Password is too short',
  INVALID_PASSWORD_UPPERCASE = 'Password must contain at least one uppercase letter',
  INVALID_PASSWORD_LOWERCASE = 'Password must contain at least one lowercase letter',
  INVALID_PASSWORD_NUMBER = 'Password must contain at least one number',
  INVALID_PASSWORD_SPECIAL = 'Password must contain at least one special character',
  PASSWORDS_DONT_MATCH = 'Passwords do not match',
}
