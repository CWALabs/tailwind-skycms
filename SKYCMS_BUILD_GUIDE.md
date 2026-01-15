# SkyCMS Tailwind Build System

## Overview

This build system creates a production-ready, self-hosted Tailwind CSS distribution specifically for SkyCMS, eliminating the need for CDN dependencies and enabling dynamic class generation.

---

## Build Commands

### Standard Build (CSS Only)
```bash
npm run build
```
Generates static CSS files:
- `dist/tailwind.css` (unminified)
- `dist/tailwind.min.css` (minified)

### SkyCMS Build (Runtime JS)
```bash
npm run build:skycms
```
Creates SkyCMS-specific distribution in `dist/skycms/`:
- `tailwind-runtime.js` (Tailwind engine)
- `tailwind-config.js` (custom theme)
- `tailwind-bundle.js` (combined file)
- `README.md` (documentation)
- `example-template.html` (usage example)

### Complete Build (Both)
```bash
npm run build:all
```
Runs both standard and SkyCMS builds

### Development Watch
```bash
npm run watch
```
Auto-rebuilds CSS on file changes (development only)

---

## What Gets Built

### Output Structure
```
dist/
├── tailwind.css              # Standard CSS build (20 KB)
├── tailwind.min.css          # Minified CSS (smaller)
└── skycms/
    ├── tailwind-runtime.js   # Tailwind JS engine (398 KB)
    ├── tailwind-config.js    # Custom theme config (2 KB)
    ├── tailwind-bundle.js    # Combined (400 KB)
    ├── README.md             # Distribution docs
    └── example-template.html # Usage example
```

---

## Distribution Files Explained

### 1. tailwind-runtime.js (398 KB)
The Tailwind CSS JavaScript engine that:
- Parses HTML for class names
- Generates CSS dynamically
- Supports all Tailwind utilities
- Handles custom configurations

**When to use:** Recommended for separate file setup

### 2. tailwind-config.js (2 KB)
Your custom theme configuration:
- Brand colors (cyan/teal palette)
- Accent colors (orange/yellow palette)
- Custom fonts (Montserrat, Roboto, Inter)
- Custom animations (float, slide-in, fade-in)

**When to use:** Always needed with runtime.js

### 3. tailwind-bundle.js (400 KB)
Combined file containing both runtime + config

**When to use:** Simpler deployment, but less cache flexibility

---

## Usage in SkyCMS

### Recommended: Separate Files
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="/dist/skycms/tailwind-config.js"></script>
  <script src="/dist/skycms/tailwind-runtime.js"></script>
</head>
<body class="bg-gray-50">
  <!-- SkyCMS content here -->
</body>
</html>
```

**Benefits:**
- Config cached separately (2 KB)
- Update theme without re-downloading engine
- Better long-term cache efficiency

### Alternative: Combined Bundle
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="/dist/skycms/tailwind-bundle.js"></script>
</head>
<body class="bg-gray-50">
  <!-- SkyCMS content here -->
</body>
</html>
```

**Benefits:**
- Single HTTP request
- Simpler HTML

---

## Deployment Checklist

### 1. Build Distribution
```bash
npm run build:skycms
```

### 2. Copy to Web Server
```bash
# Copy entire dist/skycms directory
cp -r dist/skycms /var/www/html/assets/tailwind/
```

### 3. Configure Cache Headers

**Nginx:**
```nginx
location ~* \.js$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

**Apache:**
```apache
<FilesMatch "\.(js)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
```

### 4. Update SkyCMS Templates
Use the paths from your deployment location:
```html
<script src="/assets/tailwind/tailwind-config.js"></script>
<script src="/assets/tailwind/tailwind-runtime.js"></script>
```

### 5. Test
- Load a SkyCMS page
- Verify custom classes work (e.g., `bg-brand-500`)
- Check browser cache headers

---

## Custom Theme Reference

### Brand Colors
```html
<!-- Primary brand (cyan/teal) -->
<div class="bg-brand-500 text-white">...</div>
<div class="text-brand-600">...</div>
<div class="border-brand-400">...</div>

<!-- Available: brand-50 through brand-900 -->
```

### Accent Colors
```html
<!-- Accent (orange/yellow) -->
<button class="bg-accent-500 hover:bg-accent-600">...</button>
<div class="text-accent-400">...</div>

<!-- Available: accent-50 through accent-900 -->
```

### Custom Fonts
```html
<!-- Montserrat -->
<h1 class="font-montserrat">...</h1>

<!-- Roboto -->
<p class="font-roboto">...</p>

<!-- Inter -->
<span class="font-inter">...</span>
```

### Custom Animations
```html
<!-- Float animation -->
<div class="animate-float">🎈</div>

<!-- Slide in from left -->
<div class="animate-slide-in-left">...</div>

<!-- Slide in from right -->
<div class="animate-slide-in-right">...</div>

<!-- Fade in -->
<div class="animate-fade-in">...</div>
```

---

## Performance

### File Sizes
| File | Size | Gzipped | Cacheable |
|------|------|---------|-----------|
| tailwind-runtime.js | 398 KB | ~80 KB | ✅ Forever |
| tailwind-config.js | 2 KB | <1 KB | ✅ Forever |
| tailwind-bundle.js | 400 KB | ~81 KB | ✅ Forever |

### Load Times (Typical)
| Scenario | First Visit | Returning Visitor |
|----------|-------------|-------------------|
| **Separate files** | ~500ms | ~0ms (cached) |
| **Combined bundle** | ~450ms | ~0ms (cached) |

### Cache Efficiency
```
User Journey with Separate Files:

Visit 1: Download 398 KB runtime + 2 KB config
Visit 2: Use cached files (0 KB)
Visit 3: Use cached files (0 KB)

Update theme: Download 2 KB config only
```

---

## Rebuilding After Changes

### When to Rebuild

**Configuration Changes:**
```bash
# Modified tailwind-config.js
npm run build:skycms

# Only config file changes, 2 KB update
```

**Static CSS Changes:**
```bash
# Modified HTML files or added new pages
npm run build

# Regenerates static CSS (if using hybrid approach)
```

**Both:**
```bash
npm run build:all
```

---

## Troubleshooting

### Classes Not Working
**Problem:** Tailwind class doesn't apply styling

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify script tags are in `<head>` before content
3. Ensure files are served with correct MIME type (`application/javascript`)
4. Clear browser cache (Ctrl+Shift+R)

### Slow Page Load
**Problem:** Pages take long to render

**Solutions:**
1. Verify cache headers are set correctly
2. Use gzip compression on web server
3. Consider serving from CDN
4. Check Network tab in DevTools for repeated downloads

### Custom Theme Not Working
**Problem:** Custom colors/fonts don't work

**Solutions:**
1. Verify `tailwind-config.js` loads before `tailwind-runtime.js`
2. Check browser console for config errors
3. Rebuild distribution: `npm run build:skycms`
4. Verify config syntax is valid JavaScript

---

## Production Checklist

- [ ] Built distribution: `npm run build:skycms`
- [ ] Deployed `dist/skycms/` to web server
- [ ] Configured cache headers (1 year expiry)
- [ ] Updated SkyCMS templates with correct paths
- [ ] Tested custom classes (brand-500, font-montserrat, etc.)
- [ ] Verified caching works (check Network tab)
- [ ] Tested on multiple pages
- [ ] No console errors
- [ ] Confirmed self-hosted (no CDN warnings)

---

## Summary

✅ **Production Ready** - Self-hosted, no CDN warnings
✅ **Dynamic** - Any Tailwind class works without rebuild
✅ **Cacheable** - Browser caching fully supported
✅ **Custom Theme** - Brand colors, fonts, animations included
✅ **Flexible** - Choose separate or combined files
✅ **Simple** - One-command build process

**Build command:** `npm run build:skycms`
**Output:** `dist/skycms/` ready to deploy
