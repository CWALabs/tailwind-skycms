# Using SkyCMS Tailwind via jsDelivr CDN

## 🚀 CDN Links

Once your distribution files are pushed to GitHub, they're automatically available via jsDelivr CDN:

### Latest Version (Main Branch)
```html
<!-- Combined Bundle (Recommended) -->
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/dist/skycms/tailwind-bundle.js"></script>

<!-- OR Separate Files -->
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/dist/skycms/tailwind-config.js"></script>
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/dist/skycms/tailwind-runtime.js"></script>

<!-- CSS Output -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/dist/tailwind.min.css">
```

### Specific Version (Recommended for Production)
Replace `@main` with a specific commit hash or tag:
```html
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@COMMIT-HASH/dist/skycms/tailwind-bundle.js"></script>
```

## 📝 Setup Instructions

### Step 1: Replace Placeholders
Replace `YOUR-USERNAME` and `YOUR-REPO` with your actual GitHub username and repository name.

For example, if your repo is at `https://github.com/johnsmith/tailwind-skycms`:
```html
<script src="https://cdn.jsdelivr.net/gh/johnsmith/tailwind-skycms@main/dist/skycms/tailwind-bundle.js"></script>
```

### Step 2: Use in Your HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My SkyCMS Site</title>
  
  <!-- Option 1: Use runtime JS (like current CDN approach) -->
  <script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/dist/skycms/tailwind-bundle.js"></script>
  
  <!-- Option 2: Use compiled CSS (faster, production-ready) -->
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/dist/tailwind.min.css"> -->
</head>
<body>
  <h1 class="text-brand-500 font-montserrat text-4xl">Hello SkyCMS!</h1>
</body>
</html>
```

## 🔄 Automatic Updates

Every time you push to your `main` branch:
1. GitHub Actions builds the distribution
2. Commits the `dist/` files to your repository
3. jsDelivr automatically picks up the changes
4. Your CDN URLs serve the latest version (may take a few minutes to update cache)

## 🏷️ Version Pinning (Best Practice)

For production sites, pin to a specific version to prevent unexpected changes:

### Using Git Tags
Create a release tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Then use:
```html
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@v1.0.0/dist/skycms/tailwind-bundle.js"></script>
```

### Using Commit Hash
```html
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@abc1234/dist/skycms/tailwind-bundle.js"></script>
```

## 🎯 Which Approach to Use?

### Runtime JavaScript (tailwind-bundle.js)
- ✅ No build process needed on your site
- ✅ All Tailwind features available
- ❌ Larger file size (~398 KB)
- ❌ Slower initial page load
- **Best for:** Development, prototyping, dynamic sites

### Compiled CSS (tailwind.min.css)
- ✅ Much smaller file size
- ✅ Faster page loads (pure CSS)
- ✅ Production-ready
- ❌ Only includes classes you've used
- **Best for:** Production sites, better performance

## 🔍 Verifying Your CDN Links

After your first build completes:
1. Go to `https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/dist/skycms/`
2. You should see a directory listing of your files
3. Click on `tailwind-bundle.js` to verify it loads

## 💡 Tips

- jsDelivr has a global CDN with high availability
- Files are cached aggressively - purge cache at https://www.jsdelivr.com/tools/purge if needed
- Use `@main` for development, specific versions for production
- The CDN is completely free with no limits
