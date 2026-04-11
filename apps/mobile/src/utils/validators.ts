import { ERROR_MESSAGES } from './constants';

export const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password: string): boolean => {
    // Minimum 8 characters
    return password.length >= 8;
  },

  isValidName: (name: string): boolean => {
    return name.trim().length >= 2;
  },

  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  },

  validateEmail: (email: string): string | null => {
    if (!email) return 'Email is required';
    if (!validators.isValidEmail(email)) return ERROR_MESSAGES.INVALID_EMAIL;
    return null;
  },

  validatePassword: (password: string): string | null => {
    if (!password) return 'Password is required';
    if (!validators.isValidPassword(password)) return ERROR_MESSAGES.PASSWORD_WEAK;
    return null;
  },

  validateName: (name: string): string | null => {
    if (!name) return 'Name is required';
    if (!validators.isValidName(name)) return 'Name must be at least 2 characters';
    return null;
  },

  validatePhone: (phone: string): string | null => {
    if (!phone) return null; // Phone is optional
    if (!validators.isValidPhone(phone)) return 'Invalid phone number';
    return null;
  },

  validateRegistration: (email: string, password: string, name: string) => {
    const errors: { [key: string]: string } = {};

    const emailError = validators.validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validators.validatePassword(password);
    if (passwordError) errors.password = passwordError;

    const nameError = validators.validateName(name);
    if (nameError) errors.name = nameError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateLogin: (email: string, password: string) => {
    const errors: { [key: string]: string } = {};

    const emailError = validators.validateEmail(email);
    if (emailError) errors.email = emailError;

    if (!password) errors.password = 'Password is required';

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
