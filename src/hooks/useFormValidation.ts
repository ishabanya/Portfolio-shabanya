import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormData {
  [key: string]: string;
}

export interface UseFormValidationReturn {
  values: FormData;
  errors: FormErrors;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (name: string, value: string) => void;
  setError: (name: string, error: string) => void;
  clearError: (name: string) => void;
  clearErrors: () => void;
  validateField: (name: string, value: string) => string | null;
  validateForm: () => boolean;
  setSubmitting: (submitting: boolean) => void;
  resetForm: () => void;
}

const validateValue = (value: string, rule: ValidationRule): string | null => {
  // Required validation
  if (rule.required && (!value || value.trim() === '')) {
    return 'This field is required';
  }

  // Skip other validations if field is empty and not required
  if (!value || value.trim() === '') {
    return null;
  }

  // Minimum length validation
  if (rule.minLength && value.length < rule.minLength) {
    return `Must be at least ${rule.minLength} characters long`;
  }

  // Maximum length validation
  if (rule.maxLength && value.length > rule.maxLength) {
    return `Must be no more than ${rule.maxLength} characters long`;
  }

  // Pattern validation
  if (rule.pattern && !rule.pattern.test(value)) {
    return 'Please enter a valid format';
  }

  // Custom validation
  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
};

export const useFormValidation = (
  initialValues: FormData,
  validationRules: ValidationRules
): UseFormValidationReturn => {
  const [values, setValues] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const setError = useCallback((name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const validateField = useCallback((name: string, value: string): string | null => {
    const rule = validationRules[name];
    if (!rule) return null;
    
    return validateValue(value, rule);
  }, [validationRules]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isFormValid = true;

    Object.keys(validationRules).forEach(name => {
      const value = values[name] || '';
      const error = validateField(name, value);
      
      if (error) {
        newErrors[name] = error;
        isFormValid = false;
      }
    });

    setErrors(newErrors);
    return isFormValid;
  }, [values, validateField, validationRules]);

  const setSubmitting = useCallback((submitting: boolean) => {
    setIsSubmitting(submitting);
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    isValid,
    isSubmitting,
    setValue,
    setError,
    clearError,
    clearErrors,
    validateField,
    validateForm,
    setSubmitting,
    resetForm,
  };
};

// Validation rule presets
export const emailValidation: ValidationRule = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  custom: (value: string) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  }
};

export const nameValidation: ValidationRule = {
  required: true,
  minLength: 2,
  maxLength: 50,
  custom: (value: string) => {
    if (value && !/^[a-zA-Z\s'-]+$/.test(value)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return null;
  }
};

export const subjectValidation: ValidationRule = {
  required: true,
  minLength: 5,
  maxLength: 100
};

export const messageValidation: ValidationRule = {
  required: true,
  minLength: 10,
  maxLength: 1000
};