export const validateEmailInput = (email: string): string | boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(email) || 'Please enter a valid email address';
};

export const validatePasswordInput = (value: string): string | boolean => {
  const minLength = 8;
  const hasUppercaseLetter = /[A-Z]/.test(value);
  const hasLowercaseLetter = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    value
  );

  if (value.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  if (!hasUppercaseLetter) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!hasLowercaseLetter) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!hasNumber) {
    return 'Password must contain at least one number';
  }
  if (!hasSpecialCharacter) {
    return 'Password must contain at least one special character';
  }

  return true;
};
