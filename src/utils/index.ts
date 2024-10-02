export const validateEmailInput = (value: string): string | boolean => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(value) || 'Please enter a valid email address';
};

export const validatePasswordInput = (value: string): string | boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[@$!%*?&#]/.test(value);

  if (value.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  } else if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter';
  } else if (!hasLowerCase) {
    return 'Password must contain at least one lowercase letter';
  } else if (!hasNumber) {
    return 'Password must contain at least one number';
  } else if (!hasSpecialChar) {
    return 'Password must contain at least one special character';
  }

  return true;
};
