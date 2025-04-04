# Decap CMS Integration Guide for Jacques' Website

This guide explains how Decap CMS (formerly Netlify CMS) has been integrated with Jacques' website to provide content management capabilities, particularly for the newsletter section.

## Overview

Decap CMS (formerly Netlify CMS) is a Git-based content management system that allows you to edit content directly through a user-friendly admin interface. The changes are committed to your Git repository, giving you complete control over your content.

## What's Been Implemented

1. **CMS Admin Interface**: Available at `/admin` on your website.
2. **Content Collections**:
   - **Newsletter**: For publishing regular leadership insights and updates.
   - **Resources**: For managing downloadable content, videos, and articles.
   - **Blog Posts**: For longer-form content and insights.
   - **Testimonials**: For managing client testimonials.

3. **Frontend Components**:
   - Newsletter section on the homepage
   - Newsletter archive page
   - Individual newsletter pages
   - Content loading utilities

## How to Use the CMS

### Accessing the Admin Interface

1. Go to `https://your-website.com/admin/`
2. Sign in using Netlify Identity (you'll need to be invited by the site administrator)

### Creating a New Newsletter

1. In the admin dashboard, click on the "Newsletter" collection
2. Click the "New Newsletter" button
3. Fill in the required fields:
   - Title
   - Publish Date
   - Featured Image (optional)
   - Summary
   - Newsletter Content (using the rich text editor)
   - Tags (select one or more categories)
4. Click "Save" to save as a draft, or publish directly
5. If saved as a draft, use the "Editorial Workflow" to review and then publish

### Editing Existing Content

1. Navigate to the collection containing the content you want to edit
2. Click on the item you want to modify
3. Make your changes
4. Save or publish when done

## Technical Implementation

### Configuration Files

- `/public/admin/config.yml`: Contains the Netlify CMS configuration
- `/public/admin/index.html`: The admin interface entry point

### Content Structure

- All content is stored in the `/content` directory:
  - `/content/newsletter`: Newsletter posts
  - `/content/resources`: Resource materials
  - `/content/blog`: Blog posts
  - `/content/testimonials`: Client testimonials

### Content Format

All content files are written in Markdown with YAML frontmatter, making them easy to read and modify even without the CMS.

Example newsletter frontmatter:
```yaml
---
title: "Leadership in Times of Change"
date: 2025-04-04T10:00:00Z
thumbnail: "/images/uploads/leadership-change.jpg"
summary: "Effective leadership strategies for navigating organizational change..."
tags: 
  - leadership
  - organizational-development
---
```

### Deployment Notes

When deploying to Netlify:

1. Make sure to enable "Identity" service in your Netlify dashboard
2. Enable "Git Gateway" to allow Netlify CMS to commit to your repository
3. Set up invite-only registration for Netlify Identity
4. Invite team members who should have access to the CMS

## Media Handling

- Images and files uploaded through the CMS are stored in `/public/images/uploads/`
- These media files are committed to your Git repository
- For large media files, consider using Netlify Large Media or a similar solution

## Customization

You can customize the CMS further by modifying the `/public/admin/config.yml` file:

- Add new collections
- Modify existing fields
- Change preview templates
- Adjust media handling

## Need Help?

For more information about Decap CMS, check out:
- [Decap CMS Documentation](https://decapcms.org/docs/intro/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
