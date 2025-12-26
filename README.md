# Portfolio - Y Shabanya Kishore

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features include project showcases, skills visualization, contact forms, and comprehensive SEO optimization.

## 🚀 Live Demo

The portfolio is deployed on Vercel and can be accessed at your custom domain once deployed.

## ✨ Features

- **Modern Design**: Clean, responsive design with smooth animations
- **Project Showcase**: Detailed project cards with technologies and metrics
- **Skills Visualization**: Interactive skill cards with experience levels
- **Contact Integration**: Working contact form with EmailJS integration
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Performance**: Optimized with lazy loading, code splitting, and PWA features
- **Accessibility**: WCAG compliant with comprehensive testing

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **SEO**: React Helmet, Structured Data
- **Testing**: Jest, React Testing Library
- **Build Tool**: Create React App
- **Deployment**: Vercel

## 🚀 Deployment to Vercel

This project is optimized for Vercel deployment. Follow these steps:

### 1. Prerequisites

- A [Vercel account](https://vercel.com)
- Your GitHub repository pushed to GitHub

### 2. Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the framework settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run vercel-build` (or `npm run build`)
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 3. Environment Variables

Set up the following environment variables in Vercel:

```bash
# EmailJS Configuration (Required for contact form)
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Google Analytics (Optional)
REACT_APP_GA_MEASUREMENT_ID=your_google_analytics_measurement_id
```

### 4. Deploy

Click "Deploy" and Vercel will:
- Install dependencies
- Run the build process
- Generate SEO files automatically
- Deploy to a live URL

### 5. Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 💻 Local Development

### Installation

```bash
# Clone the repository
git clone https://github.com/ishabanya/Portfolio-shabanya.git
cd Portfolio-shabanya

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

### Available Scripts

- `npm start` - Runs the development server
- `npm test` - Launches the test runner
- `npm run build` - Creates production build
- `npm run vercel-build` - Build command for Vercel deployment
- `npm run generate:seo` - Generates SEO files (sitemap, robots.txt)

### Environment Setup

Create a `.env` file in the root directory:

```bash
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: Google Analytics
REACT_APP_GA_MEASUREMENT_ID=your_measurement_id
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common UI components
│   ├── contact/        # Contact form components
│   ├── projects/       # Project showcase components
│   ├── seo/           # SEO components
│   └── skills/        # Skills visualization
├── data/              # Static data and content
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## 📈 Performance Features

- Code splitting with React.lazy()
- Image lazy loading
- Service worker for caching
- Optimized bundle sizes
- SEO-friendly meta tags
- Structured data for search engines

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Y Shabanya Kishore - [yadaginishabanya@gmail.com](mailto:yadaginishabanya@gmail.com)

Project Link: [https://github.com/ishabanya/Portfolio-shabanya](https://github.com/ishabanya/Portfolio-shabanya)
# Portfolio Update - Fri Dec 26 21:30:05 IST 2025
