# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js application to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer
- Repository pushed to GitHub

## Setup Steps

### 1. Update Instagram Handle

Before deploying, update your Instagram handle in these files:
- `app/custom-order/page.tsx` (line 23)
- `app/products/[id]/ProductPageClient.tsx` (line 56)

Replace `'https://www.instagram.com/direct/t/your_instagram_handle'` with your actual Instagram DM link.

### 2. Update Repository Name in next.config.js

In `next.config.js`, update the `basePath` to match your GitHub repository name:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

Replace `/your-repo-name` with your actual repository name (e.g., `/pipeclearner-shopping-project`).

### 3. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 4. Push Your Code

Make sure all your changes are committed and pushed to the `main` branch:

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 5. Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your Next.js application
- Export it as static HTML
- Deploy to GitHub Pages

You can monitor the deployment progress in the **Actions** tab of your repository.

### 6. Access Your Site

Once deployed, your site will be available at:
```
https://your-username.github.io/your-repo-name/
```

## Troubleshooting

### Build Fails

If the build fails, check the Actions tab for error logs. Common issues:
- Missing dependencies: Run `npm install` locally first
- TypeScript errors: Fix any type errors shown in the logs
- Image optimization: Ensure all images are in the `public` folder

### 404 Errors

If you get 404 errors:
- Verify the `basePath` in `next.config.js` matches your repository name
- Check that GitHub Pages is enabled and set to use GitHub Actions
- Wait a few minutes for DNS propagation

### Images Not Loading

- Ensure images are in the `public` folder
- Check image paths start with `/` (e.g., `/assets/image.jpg`)
- Verify `unoptimized: true` is set in `next.config.js`

## Alternative Deployment Options

If GitHub Pages doesn't work for your needs, consider:

1. **Vercel** (Recommended for Next.js)
   - Free tier available
   - Automatic deployments from GitHub
   - Visit: https://vercel.com

2. **Netlify**
   - Free tier available
   - Easy setup with GitHub
   - Visit: https://netlify.com

3. **Cloudflare Pages**
   - Free tier available
   - Fast global CDN
   - Visit: https://pages.cloudflare.com

## Local Testing

To test the production build locally:

```bash
npm run build
npx serve out
```

This will serve the static export on `http://localhost:3000`.

## Notes

- The site is exported as static HTML, so server-side features won't work
- Dynamic routes are pre-rendered at build time
- Client-side features (cart, filters, etc.) work normally
- Instagram integration requires users to have Instagram app or be logged in

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- GitHub Pages documentation: https://docs.github.com/pages
- Open an issue in your repository

---

Made with Bob