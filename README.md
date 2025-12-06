# 🍔 Foodies - Share Your Favorite Meals

A modern, full-stack web application built with Next.js that allows food enthusiasts to discover, share, and explore delicious meals from around the world.

## 🌐 Live Demo

**[View Live Demo](https://foodies-kappa-puce.vercel.app)**

## ✨ Features

- 🍕 **Browse Meals** - Explore a collection of delicious recipes with beautiful images
- 📝 **Share Recipes** - Add your own favorite meals with images and detailed instructions
- 🖼️ **Image Upload** - Upload meal images up to 20MB with client-side validation
- 🗄️ **Cloud Database** - Powered by Neon Postgres for reliable data storage
- ☁️ **CDN Image Hosting** - Fast image delivery via Vercel Blob Storage
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔒 **Input Sanitization** - XSS protection for user-generated content
- ⚡ **Server Actions** - Modern Next.js server-side data mutations

## 🚀 Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **React Hook Form** - Form validation and management
- **SweetAlert2** - Beautiful alert dialogs

### Backend

- **Neon Postgres** - Serverless PostgreSQL database
- **Vercel Blob** - Cloud object storage for images
- **Server Actions** - Next.js server-side mutations

### Utilities

- **Slugify** - URL-friendly slug generation
- **XSS** - Cross-site scripting protection

## Project Structure

```
foodies/
├── app/                      # Next.js App Router
│   ├── meals/               # Meals pages
│   │   ├── [mealsSlug]/    # Dynamic meal detail page
│   │   ├── share/          # Share meal form
│   │   └── page.js         # Meals list page
│   ├── community/          # Community page
│   └── layout.js           # Root layout
├── components/             # React components
│   └── meals/             # Meal-related components
│       ├── image-picker.js
│       └── meal-item.js
├── lib/                   # Utility functions
│   ├── db.js             # Database connection
│   └── meals.js          # Meal CRUD operations
├── public/               # Static assets
├── initdb.mjs           # Database initialization script
└── next.config.js       # Next.js configuration
```

---

Made with ❤️ and Next.js
