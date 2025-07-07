# 🚀 AZELLAR WEBSITE - GITHUB TO NETLIFY DEPLOYMENT GUIDE

## Prerequisites ✅

- GitHub account
- Netlify account (free)
- Git installed locally
- Your Azellar website code

## Step 1: Prepare Your Repository 📁

### 1.1 Create GitHub Repository
```bash
# Go to GitHub.com and create a new repository named "azellar-website"
# Choose public or private (your choice)
# DO NOT initialize with README, .gitignore, or license
```

### 1.2 Initialize Git in Your Project
```bash
# Navigate to your frontend directory
cd /app/frontend

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Azellar website with advanced features"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/azellar-website.git

# Push to GitHub
git push -u origin main
```

### 1.3 Create Production Build Configuration

Create a `.env.production` file:
```bash
# Create production environment file
cat > .env.production << EOL
# Production environment variables
REACT_APP_ENVIRONMENT=production
REACT_APP_API_URL=https://api.azellar.com
GENERATE_SOURCEMAP=false
EOL
```

### 1.4 Create Netlify Configuration

Create `netlify.toml` in your project root:
```bash
cat > netlify.toml << EOL
[build]
  # Build command
  command = "npm run build"
  
  # Publish directory
  publish = "build"
  
  # Environment variables
  environment = { NODE_VERSION = "18" }

[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.html]
  pretty_urls = true

[[redirects]]
  # Handle client-side routing
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  # Security headers
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:;"

[[headers]]
  # Cache static assets
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
EOL
```

### 1.5 Update Package.json Scripts
Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "build": "react-scripts build",
    "start": "react-scripts start",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build:prod": "NODE_ENV=production npm run build",
    "preview": "npm run build && npx serve -s build"
  }
}
```

### 1.6 Create .gitignore
```bash
cat > .gitignore << EOL
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/

# OS
Thumbs.db
EOL
```

## Step 2: Deploy to Netlify 🌐

### Method A: GitHub Integration (Recommended)

#### 2.1 Connect Netlify to GitHub
1. **Visit [Netlify.com](https://netlify.com)**
2. **Sign up/Login** with GitHub account
3. **Click "New site from Git"**
4. **Choose "GitHub"** as your provider
5. **Authorize Netlify** to access your repositories

#### 2.2 Configure Deployment
1. **Select your repository**: `azellar-website`
2. **Configure build settings**:
   ```
   Branch to deploy: main
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: build
   ```
3. **Add environment variables** (if needed):
   ```
   NODE_VERSION: 18
   REACT_APP_ENVIRONMENT: production
   ```
4. **Click "Deploy site"**

#### 2.3 Custom Domain Setup (Optional)
1. **Go to Site settings > Domain management**
2. **Click "Add custom domain"**
3. **Enter your domain**: `azellar.com`
4. **Configure DNS** at your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```
5. **Enable HTTPS** (automatic with Netlify)

### Method B: Manual Deployment

#### 2.1 Build Locally
```bash
# Create production build
npm run build

# Test build locally (optional)
npx serve -s build
```

#### 2.2 Drag & Drop Deploy
1. **Visit [Netlify.com](https://netlify.com)**
2. **Drag the `build` folder** to the deploy area
3. **Your site is live!**

## Step 3: Configure Advanced Features ⚙️

### 3.1 Environment Variables
In Netlify dashboard:
1. **Site settings > Environment variables**
2. **Add variables**:
   ```
   NODE_ENV: production
   REACT_APP_API_URL: https://api.azellar.com
   GENERATE_SOURCEMAP: false
   ```

### 3.2 Build Hooks
For automatic rebuilds:
1. **Site settings > Build & deploy > Build hooks**
2. **Add build hook**: "Content Update Hook"
3. **Use webhook URL** for content management systems

### 3.3 Deploy Previews
Netlify automatically creates:
- **Deploy previews** for pull requests
- **Branch deploys** for feature branches
- **Rollback capabilities** for quick reverts

### 3.4 Forms Setup (if using contact forms)
1. **Add to HTML forms**:
   ```html
   <form netlify>
   ```
2. **Configure in Netlify dashboard**
3. **Set up notifications**

## Step 4: Performance Optimization 🚀

### 4.1 Lighthouse Score Optimization
Your site should achieve:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### 4.2 Build Optimization
```json
{
  "build": {
    "environment": {
      "NODE_OPTIONS": "--max_old_space_size=4096"
    }
  }
}
```

### 4.3 Asset Optimization
- **Images**: Automatically optimized by Netlify
- **CSS/JS**: Minified during build
- **Gzip**: Enabled by default

## Step 5: Monitoring & Analytics 📊

### 5.1 Netlify Analytics
- **Enable in Site settings**
- **View traffic, performance, and errors**
- **Set up alerts**

### 5.2 Custom Analytics
Add Google Analytics or your preferred service:
```javascript
// Add to public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Step 6: Continuous Deployment ♻️

### 6.1 Automatic Deploys
Every push to `main` branch triggers automatic deployment:
```bash
# Make changes to your code
git add .
git commit -m "Update website content"
git push origin main

# Netlify automatically builds and deploys! 🎉
```

### 6.2 Deploy Commands
```bash
# Deploy status
npx netlify status

# Deploy preview
npx netlify deploy

# Deploy to production
npx netlify deploy --prod
```

## Step 7: Domain & SSL 🔒

### 7.1 Custom Domain Setup
1. **Buy domain** from any registrar
2. **Add to Netlify**:
   - Site settings > Domain management
   - Add custom domain
3. **Update DNS** at registrar:
   ```
   CNAME: www -> your-site.netlify.app
   A: @ -> 75.2.60.5
   ```

### 7.2 SSL Certificate
- **Automatic HTTPS** with Let's Encrypt
- **Force HTTPS redirect**
- **HSTS headers** for security

## Troubleshooting 🔧

### Common Issues:

#### Build Fails
```bash
# Check build logs in Netlify dashboard
# Common fixes:
npm install  # Missing dependencies
npm run build  # Test locally first
```

#### Routing Issues
Add to `public/_redirects`:
```
/*    /index.html   200
```

#### Environment Variables
Ensure all required variables are set in Netlify dashboard.

#### Performance Issues
- Enable asset optimization
- Check bundle size with `npm run build`
- Use lazy loading for images

## Quick Deployment Checklist ✅

- [ ] Code pushed to GitHub
- [ ] Netlify account connected
- [ ] Build command: `npm run build`
- [ ] Publish directory: `build`
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)
- [ ] SSL enabled
- [ ] Deploy previews working
- [ ] Forms configured (if applicable)
- [ ] Analytics setup

## Final URLs

After deployment, your site will be available at:
- **Netlify URL**: `https://your-site-name.netlify.app`
- **Custom Domain**: `https://azellar.com` (if configured)

## Support

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **Community**: [community.netlify.com](https://community.netlify.com)

🎉 **Congratulations! Your Azellar website is now live on Netlify with automatic deployments!**