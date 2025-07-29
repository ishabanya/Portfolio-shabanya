import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactForm from '../../../components/contact/ContactForm';

expect.extend(toHaveNoViolations);

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  sendForm: jest.fn().mockResolvedValue({ text: 'OK' }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...cleanProps } = props;
      return <div {...cleanProps}>{children}</div>;
    },
    button: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...cleanProps } = props;
      return <button {...cleanProps}>{children}</button>;
    },
    form: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...cleanProps } = props;
      return <form {...cleanProps}>{children}</form>;
    },
    input: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...cleanProps } = props;
      return <input {...cleanProps}>{children}</input>;
    },
    textarea: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...cleanProps } = props;
      return <textarea {...cleanProps}>{children}</textarea>;
    },
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

describe('ContactForm Simple Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ContactForm />);
    // Look for the form element directly since it may not have role="form"
    const form = screen.getByRole('button', { name: /send message/i }).closest('form');
    expect(form).toBeInTheDocument();
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

  it('displays submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows character count for message field', () => {
    render(<ContactForm />);
    expect(screen.getByText('0/1000 characters')).toBeInTheDocument();
  });

  it('displays security notice', () => {
    render(<ContactForm />);
    expect(screen.getByText(/your information is secure and will never be shared/i)).toBeInTheDocument();
  });

  it('should be accessible', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});