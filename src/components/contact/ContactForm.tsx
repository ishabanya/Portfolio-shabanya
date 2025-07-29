import { memo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useFormValidation, emailValidation, nameValidation, subjectValidation, messageValidation } from '../../hooks/useFormValidation';
import { useBackgroundSync, useNetworkStatus } from '../../hooks/usePWA';

interface ContactFormProps {
  className?: string;
}

interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const ContactForm = memo<ContactFormProps>(({ className = '' }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  });
  
  // PWA hooks
  const { syncData } = useBackgroundSync();
  const networkStatus = useNetworkStatus();

  // Form validation setup
  const {
    values,
    errors,
    isValid,
    setValue,
    validateForm,
    resetForm
  } = useFormValidation(
    {
      user_name: '',
      user_email: '',
      subject: '',
      message: '',
      honeypot: '' // Honeypot field for spam prevention
    },
    {
      user_name: nameValidation,
      user_email: emailValidation,
      subject: subjectValidation,
      message: messageValidation
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot spam check
    if (values.honeypot) {
      console.log('Spam detected');
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    });

    try {
      // Check if online, if not queue for background sync
      if (!networkStatus.online) {
        const formData = {
          user_name: values.user_name,
          user_email: values.user_email,
          subject: values.subject,
          message: values.message
        };

        const syncSuccess = await syncData('contact-form-sync', formData);
        
        if (syncSuccess) {
          setSubmissionState({
            isSubmitting: false,
            isSuccess: true,
            isError: false,
            errorMessage: ''
          });

          // Reset form
          resetForm();

          // Show offline success message
          setTimeout(() => {
            setSubmissionState(prev => ({ 
              ...prev, 
              isSuccess: false 
            }));
          }, 8000);
        } else {
          throw new Error('Failed to queue message for sending');
        }
        return;
      }

      // Online - send immediately via EmailJS
      const result = await emailjs.sendForm(
        'service_your_service_id', // Replace with your EmailJS service ID
        'template_your_template_id', // Replace with your EmailJS template ID
        formRef.current!,
        'your_public_key' // Replace with your EmailJS public key
      );

      console.log('Email sent successfully:', result.text);
      
      setSubmissionState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: ''
      });

      // Reset form after successful submission
      resetForm();

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmissionState(prev => ({ ...prev, isSuccess: false }));
      }, 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      
      // If online but failed, try background sync as fallback
      if (networkStatus.online) {
        try {
          const formData = {
            user_name: values.user_name,
            user_email: values.user_email,
            subject: values.subject,
            message: values.message
          };

          await syncData('contact-form-sync', formData);
          
          setSubmissionState({
            isSubmitting: false,
            isSuccess: true,
            isError: false,
            errorMessage: ''
          });

          resetForm();
          
          setTimeout(() => {
            setSubmissionState(prev => ({ ...prev, isSuccess: false }));
          }, 8000);
        } catch (syncError) {
          setSubmissionState({
            isSubmitting: false,
            isSuccess: false,
            isError: true,
            errorMessage: 'Failed to send message. Please try again or contact me directly.'
          });
        }
      } else {
        setSubmissionState({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: 'Failed to send message. Please check your connection and try again.'
        });
      }

      // Hide error message after 8 seconds
      setTimeout(() => {
        setSubmissionState(prev => ({ ...prev, isError: false, errorMessage: '' }));
      }, 8000);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Send me a message</h3>
        <p className="text-gray-600">
          I'd love to hear from you. Send me a message and I'll respond as soon as possible.
        </p>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {submissionState.isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {submissionState.isError && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {submissionState.errorMessage}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={values.honeypot}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Name Field */}
        <div>
          <label 
            htmlFor="user_name" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={values.user_name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 
              focus:ring-4 focus:outline-none ${
                errors.user_name 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            placeholder="Enter your full name"
            aria-describedby={errors.user_name ? 'user_name-error' : undefined}
            aria-invalid={errors.user_name ? 'true' : 'false'}
            disabled={submissionState.isSubmitting}
          />
          {errors.user_name && (
            <p 
              id="user_name-error" 
              className="mt-2 text-sm text-red-600 flex items-center"
              role="alert"
            >
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.user_name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label 
            htmlFor="user_email" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={values.user_email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 
              focus:ring-4 focus:outline-none ${
                errors.user_email 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            placeholder="Enter your email address"
            aria-describedby={errors.user_email ? 'user_email-error' : undefined}
            aria-invalid={errors.user_email ? 'true' : 'false'}
            disabled={submissionState.isSubmitting}
          />
          {errors.user_email && (
            <p 
              id="user_email-error" 
              className="mt-2 text-sm text-red-600 flex items-center"
              role="alert"
            >
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.user_email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label 
            htmlFor="subject" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 
              focus:ring-4 focus:outline-none ${
                errors.subject 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            placeholder="What's this about?"
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            aria-invalid={errors.subject ? 'true' : 'false'}
            disabled={submissionState.isSubmitting}
          />
          {errors.subject && (
            <p 
              id="subject-error" 
              className="mt-2 text-sm text-red-600 flex items-center"
              role="alert"
            >
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 
              resize-vertical focus:ring-4 focus:outline-none ${
                errors.message 
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            placeholder="Tell me about your project, question, or just say hello!"
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={errors.message ? 'true' : 'false'}
            disabled={submissionState.isSubmitting}
          />
          {errors.message && (
            <p 
              id="message-error" 
              className="mt-2 text-sm text-red-600 flex items-center"
              role="alert"
            >
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.message}
            </p>
          )}
          <div className="mt-1 text-sm text-gray-500">
            {(values.message || '').length}/1000 characters
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={submissionState.isSubmitting || !isValid}
          whileHover={{ scale: submissionState.isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: submissionState.isSubmitting ? 1 : 0.98 }}
          className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 
            flex items-center justify-center space-x-2 ${
              submissionState.isSubmitting || !isValid
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
            }`}
        >
          {submissionState.isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </motion.button>

        {/* Form Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            * Required fields. Your information is secure and will never be shared.
          </p>
        </div>
      </form>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;