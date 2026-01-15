# Using SkyCMS Tailwind via jsDelivr CDN

## 🚀 CDN Links

Once your distribution files are pushed to GitHub, they're automatically available via jsDelivr CDN:

### ⭐ Production (Recommended - Version Tags)
Use version tags for stable, predictable releases:

```html
<!-- Combined Bundle (Recommended) -->
<script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@1.0.0/dist/skycms/tailwind-bundle.js"></script>

<!-- OR Separate Files -->
<script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@1.0.0/dist/skycms/tailwind-config.js"></script>
<script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@1.0.0/dist/skycms/tailwind-runtime.js"></script>

<!-- CSS Output -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@1.0.0/dist/tailwind.min.css">
```

**Benefits:**
- ✅ No surprise updates or breaking changes
- ✅ You control when to upgrade
- ✅ Stable and predictable
- ✅ Can test new versions before switching

### 🔧 Development (Latest from Main Branch)
Use `@main` for development and testing the latest features:

```html
<!-- Combined Bundle -->
<script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@main/dist/skycms/tailwind-bundle.js"></script>

<!-- CSS Output -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@main/dist/tailwind.min.css">
```

**Note:** Using `@main` means you'll automatically get the latest changes, which could include breaking changes.

## 📝 Usage Instructions

The repository is hosted at `https://github.com/CWALabs/tailwind-skycms`

### Production Site Example (Recommended)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My SkyCMS Site</title>
  
  <!-- Option 1: Use runtime JS (like current CDN approach) -->
  <script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@1.0.0/dist/skycms/tailwind-bundle.js"></script>
  
  <!-- Option 2: Use compiled CSS (faster, production-ready) -->
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@1.0.0/dist/tailwind.min.css"> -->
</head>
<body>
  <h1 class="text-brand-500 font-montserrat text-4xl">Hello SkyCMS!</h1>
</body>
</html>
```

### Development/Testing Example
```html
<head>
  <!-- Use @main for latest features (auto-updates) -->
  <script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@main/dist/skycms/tailwind-bundle.js"></script>
</headou're ready to release a stable version:

```bash
# Make sure your dist/ files are built and committed
npm run build:all
git add dist/
git commit -m "Build distribution for v1.0.0"

# Create and push the tag
git tag 1.0.0
git push origin 1.0.0
```

**Tag Naming:**
- Use semantic versioning: `1.0.0`, `1.0.1`, `1.1.0`, `2.0.0`
- **Don't use** the `v` prefix (jsDelivr works better without it)
- Major version (1.x.x) = breaking changes
- Minor version (x.1.x) = new features
- Patch version (x.x.1) = bug fixes

### Step 2: Users Reference the Tag

Production sites use the tag version:
```html
<script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@1.0.0/dist/skycms/tailwind-bundle.js"></script>
```

### Step 3: Release Updates

When you have improvements:
```bash
# Build and commit
npm run build:all
git add dist/
git commit -m "Build distribution for v1.1.0"

# Create new tag
git tag 1.1.0
git push origin 1.1.0
```

Users can then upgrade by changing `@1.0.0` to `@1.1.0` in their HTML when ready.

### Alternative: Using Commit Hash (Not Recommended)
You can also pin to specific commits, but tags are clearer:
For production sites, pin to a specific version to prevent unexpected changes:

### Using Git Tags
Create a release tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Then use:
```html
<script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@v1.0.0/dist/skycms/tailwind-bundle.js"></script>
```

### Using Commit Hash
```html
<script src="https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@abc1234/dist/skycms/tailwind-bundle.js"></script>
```

## 🎯 Which Approach to Use?

### Runtime JavaScript (tailwind-bundle.js)
- ✅ No build process needed on your site
- ✅ All Tailwind features available
- ❌ Larger file size (~398 KB)
- ❌ Slower initial page load
- **Best for:** Development, prototyping, dynamic sites

### Compiled CSS (tailwind.min.css)
### Check Available Files
- **Main branch:** `https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@main/dist/skycms/`
- **Specific version:** `https://cdn.jsdelivr.net/gh/CWALabs/tailwind-skycms@1.0.0/dist/skycms/`

### View All Available Versions
Check all published tags/versions:
```
https://data.jsdelivr.com/v1/packages/gh/CWALabs/tailwind-skycms
```

### Test a File
Click on `tailwind-bundle.js` in the directory listing to verify it loads correctly.
- **Best for:** Production sites, better performance
Best Practices

**For Production Sites:**
- ✅ Always use version tags (e.g., `@1.0.0`)
- ✅ Test new versions before upgrading
- ✅ Document which version you're using
- ❌ Don't use `@main` - you'll get unexpected updates

**For Development:**
- ✅ Use `@main` to test latest features
- ✅ Switch to a version tag before going live

**Tag Versioning:**
- ✅ Create a new tag for each release
- ✅ Use semantic versioning (1.0.0, 1.1.0, 2.0.0)
- ✅ Keep a changelog of what changed
- ❌ Don't delete old tags - users might depend on them

**CDN Tips:**
- jsDelivr has a global CDN with high availability
- Files are cached aggressively - purge cache at https://www.jsdelivr.com/tools/purge if needed
- The CDN is completely free with no limits
- Check available versions: `https://data.jsdelivr.com/v1/packages/gh/CWALabs/tailwind-skycms`ur files
3. Click on `tailwind-bundle.js` to verify it loads

## 💡 Tips

- jsDelivr has a global CDN with high availability
- Files are cached aggressively - purge cache at https://www.jsdelivr.com/tools/purge if needed
- Use `@main` for development, specific versions for production
- The CDN is completely free with no limits
