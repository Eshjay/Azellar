# AZELLAR WEBSITE - LOCAL SETUP GUIDE

## Step-by-Step Instructions to Run Locally

### Prerequisites
Before starting, make sure you have these installed on your computer:
1. **Node.js** (version 16 or higher) - Download from https://nodejs.org/
2. **Yarn** package manager - Install with: `npm install -g yarn`
3. **Git** - Download from https://git-scm.com/

### Step 1: Download the Code to Your Computer

#### Option A: If you have access to a Git repository
```bash
git clone [your-repository-url]
cd azellar-website
```

#### Option B: Manual file transfer (if no Git repo)
1. Create a new folder on your computer called `azellar-website`
2. Copy all files from `/app/frontend/` to your local folder
3. Make sure you have this structure:
```
azellar-website/
├── src/
├── public/
├── package.json
├── tailwind.config.js
├── craco.config.js
└── README.md
```

### Step 2: Install Dependencies
Open your terminal/command prompt and run:
```bash
cd azellar-website
yarn install
```

This will download all required packages (React, Tailwind CSS, Framer Motion, etc.)

### Step 3: Start the Development Server
```bash
yarn start
```

The website will automatically open in your browser at: http://localhost:3000

### Step 4: For Production Build (Optional)
To create optimized files for hosting:
```bash
yarn build
```

This creates a `build/` folder with optimized files ready for deployment.

## Project Structure Explanation

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.js    # Top navigation bar
│   ├── Footer.js        # Footer component
│   ├── ThemeToggle.js   # Dark/light theme switcher
│   ├── ScrollToTop.js   # Auto-scroll to top on navigation
│   └── ...
├── pages/              # Main page components
│   ├── Home.js         # Homepage
│   ├── About.js        # About page
│   ├── Services.js     # Services page
│   ├── Support.js      # Support page
│   ├── Academy.js      # Training page
│   ├── Contact.js      # Contact page
│   ├── FAQ.js          # FAQ page
│   ├── Blog.js         # Blog page
│   └── ClientPortal.js # Client portal
├── contexts/           # React Context providers
│   └── ThemeContext.js # Theme management
├── utils/              # Utility functions
│   └── heroImages.js   # Optimized hero image management
├── data/               # Static data
│   └── blogData.js     # Blog content
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # App entry point
```

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Create production build
- `yarn test` - Run tests
- `yarn eject` - Eject from Create React App (not recommended)

## Key Features

✅ **Performance Optimized**
- Fast-loading hero sections with image preloading
- Optimized images with compression
- Smooth scroll-to-top on navigation

✅ **Dark/Light Theme**
- Complete theme system with persistence
- Smooth transitions between themes
- Theme toggle in bottom-left corner

✅ **Responsive Design**
- Mobile-first approach
- Works on all device sizes
- Modern CSS with Tailwind

✅ **Interactive Components**
- Service calculator
- Testimonials slider
- Advanced contact forms
- Database visualization

## Customization

### To change colors:
Edit `tailwind.config.js` and modify the color palette:
```javascript
colors: {
  'azellar-navy': '#1e3a8a',
  'azellar-blue': '#3b82f6',
  'azellar-teal': '#22d3ee',
  // Add your colors here
}
```

### To add new pages:
1. Create new file in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation link in `src/components/Navigation.js`

### To modify content:
- Blog posts: Edit `src/data/blogData.js`
- Services: Edit `src/pages/Services.js`
- Team info: Edit `src/pages/About.js`

## Troubleshooting

### Common Issues:

**Issue: "Module not found" errors**
Solution: Run `yarn install` to install missing dependencies

**Issue: Port 3000 already in use**
Solution: Kill the process or use a different port:
```bash
yarn start -- --port 3001
```

**Issue: Build fails**
Solution: Clear cache and reinstall:
```bash
rm -rf node_modules yarn.lock
yarn install
yarn start
```

**Issue: Theme not working**
Solution: Make sure `ThemeContext.js` is properly imported in `App.js`

## Deployment Options

### 1. Netlify (Recommended)
1. Run `yarn build`
2. Drag the `build/` folder to Netlify
3. Or connect your Git repository for automatic deployments

### 2. Vercel
1. Connect your GitHub repository
2. Vercel automatically detects React and builds

### 3. GitHub Pages
1. Install gh-pages: `yarn add --dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/azellar-website",
"scripts": {
  "predeploy": "yarn build",
  "deploy": "gh-pages -d build"
}
```
3. Run: `yarn deploy`

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure all dependencies are installed (`yarn install`)
3. Verify Node.js version is 16+ (`node --version`)
4. Try clearing browser cache and restarting the dev server

## Next Steps

Once running locally, you can:
- Customize colors and branding
- Add your own content
- Modify or add pages
- Deploy to your preferred hosting service
- Connect to a real backend API for forms and data

The codebase is well-organized and documented for easy customization and extension.