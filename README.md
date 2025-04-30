# Jacques Evens Camille - Professional Website

A modern, responsive website for Jacques Evens Camille, Executive Leadership Coach, Business Consultant, and Organizational Development Expert.

## Features

- Sleek, minimalist design
- Interactive AI-powered conversation feature
- Responsive layout for all devices
- Resource library with articles and videos
- Professional portfolio and services showcase
- Newsletter subscription

## Technologies Used

- Next.js for frontend framework
- React for component-based UI
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Google Gemini AI API for the conversation feature
- Netlify CMS for content management

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Google Gemini API key to `NEXT_PUBLIC_GEMINI_API_KEY`
4. Run the development server:
   ```
   npm run dev
   ```
5. For production build:
   ```
   npm run build
   npm run start
   ```

## Deployment

This website is configured for deployment on Netlify:

1. Connect your repository to Netlify
2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add the environment variables in Netlify dashboard
4. Deploy

## Content Management

The website uses Netlify CMS for content management:

1. Access the admin panel at `/admin`
2. Log in using Netlify Identity
3. Edit content through the user-friendly interface

## Contact

For any questions or suggestions, please feel free to reach out through the contact form on the website.
