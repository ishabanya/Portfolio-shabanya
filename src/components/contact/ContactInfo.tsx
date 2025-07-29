import { memo } from 'react';
import { motion } from 'framer-motion';

interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
  description: string;
  color: string;
}

interface ContactInfoProps {
  className?: string;
}

const ContactInfo = memo<ContactInfoProps>(({ className = '' }) => {
  const contactItems: ContactInfoItem[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      content: 'contact@shabanyakishore.dev',
      href: 'mailto:contact@shabanyakishore.dev',
      description: 'Send me an email and I\'ll respond within 24 hours',
      color: 'blue'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      content: '+91 98765 43210',
      href: 'tel:+919876543210',
      description: 'Available Monday-Friday, 9 AM - 6 PM IST',
      color: 'green'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Location',
      content: 'Chennai, Tamil Nadu',
      description: 'Open to remote work and relocation opportunities',
      color: 'purple'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Response Time',
      content: '< 24 hours',
      description: 'I typically respond to messages within a day',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-blue-50 to-blue-100',
          icon: 'text-blue-600',
          border: 'border-blue-200',
          hover: 'hover:from-blue-100 hover:to-blue-200'
        };
      case 'green':
        return {
          bg: 'from-green-50 to-green-100',
          icon: 'text-green-600',
          border: 'border-green-200',
          hover: 'hover:from-green-100 hover:to-green-200'
        };
      case 'purple':
        return {
          bg: 'from-purple-50 to-purple-100',
          icon: 'text-purple-600',
          border: 'border-purple-200',
          hover: 'hover:from-purple-100 hover:to-purple-200'
        };
      case 'orange':
        return {
          bg: 'from-orange-50 to-orange-100',
          icon: 'text-orange-600',
          border: 'border-orange-200',
          hover: 'hover:from-orange-100 hover:to-orange-200'
        };
      default:
        return {
          bg: 'from-gray-50 to-gray-100',
          icon: 'text-gray-600',
          border: 'border-gray-200',
          hover: 'hover:from-gray-100 hover:to-gray-200'
        };
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in touch</h3>
        <p className="text-gray-600">
          Let's discuss your project or just have a friendly chat. I'm always open to new opportunities and interesting conversations.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactItems.map((item, index) => {
          const colors = getColorClasses(item.color);
          const CardComponent = item.href ? motion.a : motion.div;
          
          return (
            <CardComponent
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-gradient-to-br ${colors.bg} ${colors.hover} border ${colors.border} 
                rounded-xl p-6 transition-all duration-300 cursor-pointer group
                hover:shadow-lg hover:shadow-${item.color}-100/50`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${colors.icon} bg-white rounded-lg flex items-center 
                justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className={`font-medium ${colors.icon} mb-2`}>
                  {item.content}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Link indicator */}
              {item.href && (
                <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  <span>Click to contact</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </CardComponent>
          );
        })}
      </div>

      {/* Additional Contact Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          Prefer a different approach?
        </h4>
        <p className="text-gray-600 mb-4">
          You can also reach out through my social media channels or schedule a call directly.
        </p>
        <div className="flex flex-wrap gap-3">
          <motion.a
            href="https://linkedin.com/in/shabanyakishore"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </motion.a>
          
          <motion.a
            href="https://calendly.com/shabanyakishore"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg 
              hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule Call
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
});

ContactInfo.displayName = 'ContactInfo';

export default ContactInfo;