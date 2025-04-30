# Deployment Guide for Jacques Camille Website

This guide explains how to deploy the Jacques Camille website to Netlify.

## Prerequisites

- A GitHub account
- A Netlify account
- Access to the repository at https://github.com/edcadet10/jacques-camille-website

## Deployment Steps

1. **Fork or Clone the Repository**
   - If you don't have direct access to the repository, fork it to your GitHub account
   - If you have access, you can use it directly

2. **Set Up Netlify**
   - Log in to your Netlify account
   - Click "New site from Git"
   - Choose GitHub as your Git provider
   - Authorize Netlify to access your GitHub account
   - Select the jacques-camille-website repository

3. **Configure Build Settings**
   - Build command: `npm install --legacy-peer-deps && npm run build`
   - Publish directory: `.next`
   - Click "Show advanced" to set up environment variables

4. **Set Environment Variables**
   - Add the following environment variables:
     - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key
     - `NEXT_PUBLIC_SITE_URL`: Your Netlify site URL (can be updated after deployment)
     - `NEXT_PUBLIC_SITE_NAME`: "Jacques Evens Camille - Executive Leadership Coach"
     - `NETLIFY_IDENTITY_ENABLED`: true

5. **Deploy the Site**
   - Click "Deploy site"
   - Wait for the build and deployment to complete
   - Netlify will provide a temporary URL for your site (e.g., random-name.netlify.app)

6. **Set Up Custom Domain (Optional)**
   - In the Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Follow the instructions to configure your domain's DNS settings

7. **Set Up Netlify Identity for CMS**
   - Go to the "Identity" tab in your Netlify dashboard
   - Click "Enable Identity"
   - Under "Registration preferences", choose "Invite only"
   - Enable "Git Gateway" in the "Services" section

8. **Invite Admin Users**
   - In the Identity tab, click "Invite users"
   - Enter the email addresses of users who should have admin access
   - They will receive an invitation email to create their account

9. **Test the Website**
   - Visit your Netlify site URL to ensure everything works correctly
   - Test the conversation feature by asking a question
   - Test the newsletter signup form
   - Access the admin panel at `/admin` and log in using your Netlify Identity account

## Post-Deployment Notes

- The Gemini API key should be kept secure. Only add it to Netlify environment variables, never commit it directly to the repository.
- If you encounter any issues with the API integration, check the browser console for error messages.
- To update content, use the Netlify CMS admin interface at `/admin` for editors, or push changes to the GitHub repository for developers.

## Production Checklist

Before considering the site fully ready for production, ensure:

1. All test files have been removed (demo.html, test-chat.tsx)
2. The Gemini API key is properly set in Netlify environment variables
3. Security headers are properly configured in netlify.toml
4. The newsletter signup functionality is working correctly
5. All links and navigation work as expected
6. The site is responsive on all devices
7. The admin CMS is accessible and functioning

## Troubleshooting

If you encounter issues with the deployment:

1. Check the Netlify deployment logs for errors
2. Ensure all environment variables are correctly set
3. Verify that all dependencies are installing correctly
4. Test locally using `npm run dev` to identify any code-related issues
