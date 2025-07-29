import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactForm from '../../../components/contact/ContactForm';
import { mockFormData } from '../../utils/test-utils';
import emailjs from '@emailjs/browser';

expect.extend(toHaveNoViolations);

// Mock EmailJS
jest.mock('@emailjs/browser');
const mockedEmailjs = emailjs as jest.Mocked<typeof emailjs>;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock PWA hooks
jest.mock('../../../hooks/usePWA', () => ({
  useBackgroundSync: () => ({
    syncData: jest.fn().mockResolvedValue(true),
  }),
  useNetworkStatus: () => ({
    online: true,
    effectiveType: '4g',
  }),
}));

describe('ContactForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedEmailjs.sendForm.mockResolvedValue({ text: 'OK' });
  });

  it('renders without crashing', () => {
    render(<ContactForm />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('displays all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows the correct form title', () => {
    render(<ContactForm />);
    expect(screen.getByText('Send me a message')).toBeInTheDocument();
  });

  it('has proper form labels and accessibility', async () => {
    const { container } = render(<ContactForm />);
    
    // Check that all inputs have proper labels
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(subjectInput).toBeRequired();
    expect(messageInput).toBeRequired();
    
    // Run accessibility tests
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('validates required fields', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    // Should show validation errors for empty fields
    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates name format', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(nameInput, 'A'); // Too short
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/must be at least 2 characters long/i)).toBeInTheDocument();
    });
  });

  it('validates message length', async () => {
    render(<ContactForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    await user.type(messageInput, 'Short'); // Too short
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/must be at least 10 characters long/i)).toBeInTheDocument();
    });
  });

  it('shows character count for message field', () => {
    render(<ContactForm />);
    
    expect(screen.getByText('0/1000 characters')).toBeInTheDocument();
  });

  it('updates character count as user types', async () => {
    render(<ContactForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    await user.type(messageInput, 'Hello world');
    
    expect(screen.getByText('11/1000 characters')).toBeInTheDocument();
  });

  it('clears validation errors when user starts typing', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Submit empty form to trigger validation
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });
    
    // Start typing to clear error
    await user.type(nameInput, 'John');
    
    await waitFor(() => {
      expect(screen.queryByText(/this field is required/i)).not.toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(<ContactForm />);
    
    // Fill out form with valid data
    await user.type(screen.getByLabelText(/full name/i), mockFormData.valid.user_name);
    await user.type(screen.getByLabelText(/email address/i), mockFormData.valid.user_email);
    await user.type(screen.getByLabelText(/subject/i), mockFormData.valid.subject);
    await user.type(screen.getByLabelText(/message/i), mockFormData.valid.message);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    // Should call EmailJS
    await waitFor(() => {
      expect(mockedEmailjs.sendForm).toHaveBeenCalledWith(
        'service_your_service_id',
        'template_your_template_id',
        expect.any(HTMLFormElement),
        'your_public_key'
      );
    });
  });

  it('shows loading state during submission', async () => {
    // Mock delayed response
    mockedEmailjs.sendForm.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ text: 'OK' }), 100))
    );
    
    render(<ContactForm />);
    
    // Fill out form
    await user.type(screen.getByLabelText(/full name/i), mockFormData.valid.user_name);
    await user.type(screen.getByLabelText(/email address/i), mockFormData.valid.user_email);
    await user.type(screen.getByLabelText(/subject/i), mockFormData.valid.subject);
    await user.type(screen.getByLabelText(/message/i), mockFormData.valid.message);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    // Should show loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.queryByText(/sending/i)).not.toBeInTheDocument();
    });
  });

  it('shows success message after successful submission', async () => {
    render(<ContactForm />);
    
    // Fill out and submit form
    await user.type(screen.getByLabelText(/full name/i), mockFormData.valid.user_name);
    await user.type(screen.getByLabelText(/email address/i), mockFormData.valid.user_email);
    await user.type(screen.getByLabelText(/subject/i), mockFormData.valid.subject);
    await user.type(screen.getByLabelText(/message/i), mockFormData.valid.message);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });

  it('shows error message when submission fails', async () => {
    mockedEmailjs.sendForm.mockRejectedValue(new Error('Network error'));
    
    render(<ContactForm />);
    
    // Fill out and submit form
    await user.type(screen.getByLabelText(/full name/i), mockFormData.valid.user_name);
    await user.type(screen.getByLabelText(/email address/i), mockFormData.valid.user_email);
    await user.type(screen.getByLabelText(/subject/i), mockFormData.valid.subject);
    await user.type(screen.getByLabelText(/message/i), mockFormData.valid.message);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    // Fill out form
    await user.type(nameInput, mockFormData.valid.user_name);
    await user.type(emailInput, mockFormData.valid.user_email);
    await user.type(subjectInput, mockFormData.valid.subject);
    await user.type(messageInput, mockFormData.valid.message);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    // Wait for success and form reset
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
    
    // Form fields should be empty
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(subjectInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  it('prevents spam with honeypot field', async () => {
    render(<ContactForm />);
    
    // Find and fill honeypot field (should be hidden)
    const honeypotField = screen.getByDisplayValue('');
    fireEvent.change(honeypotField, { target: { value: 'spam' } });
    
    // Fill out other fields
    await user.type(screen.getByLabelText(/full name/i), mockFormData.valid.user_name);
    await user.type(screen.getByLabelText(/email address/i), mockFormData.valid.user_email);
    await user.type(screen.getByLabelText(/subject/i), mockFormData.valid.subject);
    await user.type(screen.getByLabelText(/message/i), mockFormData.valid.message);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    // Should not call EmailJS
    expect(mockedEmailjs.sendForm).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation properly', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Tab through form fields
    nameInput.focus();
    await user.tab();
    expect(emailInput).toHaveFocus();
    
    await user.tab();
    expect(subjectInput).toHaveFocus();
    
    await user.tab();
    expect(messageInput).toHaveFocus();
    
    await user.tab();
    expect(submitButton).toHaveFocus();
  });

  it('displays security notice', () => {
    render(<ContactForm />);
    expect(screen.getByText(/your information is secure and will never be shared/i)).toBeInTheDocument();
  });
});