import { memo } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  handle: string;
}

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = memo<SocialLinksProps>(({ className = '' }) => {
  const socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: portfolioData.personal.linkedin,
      handle: '@shabanya-kishore-yadagini',
      description: 'Professional network and career updates',
      color: 'blue',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: portfolioData.personal.github,
      handle: '@ishabanya',
      description: 'Open source projects and code repositories',
      color: 'gray',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/shabanyakishore',
      handle: '@shabanyakishore',
      description: 'Tech insights and industry discussions',
      color: 'sky',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/shabanyakishore',
      handle: '@shabanyakishore',
      description: 'Behind-the-scenes and personal updates',
      color: 'pink',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: `mailto:${portfolioData.personal.email}`,
      handle: portfolioData.personal.email,
      description: 'Direct email for professional inquiries',
      color: 'red',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Resume',
      url: '/resume.pdf',
      handle: 'Download PDF',
      description: 'Complete professional background and experience',
      color: 'green',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'hover:bg-blue-50',
          text: 'text-blue-600',
          border: 'hover:border-blue-300'
        };
      case 'gray':
        return {
          bg: 'hover:bg-gray-50',
          text: 'text-gray-700',
          border: 'hover:border-gray-300'
        };
      case 'sky':
        return {
          bg: 'hover:bg-sky-50',
          text: 'text-sky-500',
          border: 'hover:border-sky-300'
        };
      case 'pink':
        return {
          bg: 'hover:bg-pink-50',
          text: 'text-pink-500',
          border: 'hover:border-pink-300'
        };
      case 'red':
        return {
          bg: 'hover:bg-red-50',
          text: 'text-red-500',
          border: 'hover:border-red-300'
        };
      case 'green':
        return {
          bg: 'hover:bg-green-50',
          text: 'text-green-600',
          border: 'hover:border-green-300'
        };
      default:
        return {
          bg: 'hover:bg-gray-50',
          text: 'text-gray-600',
          border: 'hover:border-gray-300'
        };
    }
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Connect with me</h3>
        <p className="text-gray-600">
          Follow me on social media or connect directly through any of these platforms.
        </p>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {socialLinks.map((link, index) => {
          const colors = getColorClasses(link.color);
          
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' && link.name !== 'Resume' ? '_blank' : undefined}
              rel={link.name !== 'Email' && link.name !== 'Resume' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group bg-white border border-gray-200 ${colors.border} ${colors.bg} 
                rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer`}
            >
              {/* Icon and Name */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`${colors.text} group-hover:scale-110 transition-transform duration-200`}>
                    {link.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                    {link.name}
                  </h4>
                </div>
                
                {/* External link indicator */}
                {link.name !== 'Email' && link.name !== 'Resume' && (
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 
                    opacity-0 group-hover:opacity-100 transition-all duration-200" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </div>

              {/* Handle */}
              <p className={`font-medium ${colors.text} mb-2 text-sm`}>
                {link.handle}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {link.description}
              </p>

              {/* Hover effect indicator */}
              <div className="mt-4 flex items-center text-xs text-gray-500 
                group-hover:text-gray-700 opacity-0 group-hover:opacity-100 
                transition-all duration-200">
                <span>
                  {link.name === 'Email' ? 'Send email' : 
                   link.name === 'Resume' ? 'Download' : 
                   'Visit profile'}
                </span>
                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r 
          from-blue-50 to-purple-50 border border-blue-100 rounded-full px-6 py-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-gray-700 font-medium">
            Available for new opportunities and collaborations
          </p>
        </div>
      </motion.div>
    </div>
  );
});

SocialLinks.displayName = 'SocialLinks';

export default SocialLinks;