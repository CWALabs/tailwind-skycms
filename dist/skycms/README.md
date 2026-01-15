# SkyCMS Tailwind CSS Distribution

Generated on: 2026-01-15T16:27:57.800Z

## Files Included

### Option 1: Separate Files (Recommended)
- **tailwind-runtime.js** - Tailwind CSS engine (with banner comments)
- **tailwind-config.js** - Your custom theme configuration (minified + banner)

**Usage:**
```html
<script src="/dist/skycms/tailwind-config.js"></script>
<script src="/dist/skycms/tailwind-runtime.js"></script>
```

**Benefits:**
- Configuration cached separately
- Update config without re-downloading engine
- Better cache efficiency

### Option 2: Combined Bundle
- **tailwind-bundle.js** - Everything in one file (minified + banner)

**Usage:**
```html
<script src="/dist/skycms/tailwind-bundle.js"></script>
```

**Benefits:**
- Single HTTP request
- Simpler deployment

## File Sizes

All files include informative banner comments explaining their purpose.

| File | Size | Purpose |
|------|------|---------|
| tailwind-runtime.js | 398.27 KB | Tailwind CSS engine |
| tailwind-config.js | 1.46 KB | Custom theme (minified) |
| tailwind-bundle.js | 399.54 KB | Combined (all-in-one) |

## Deployment

1. Copy `dist/skycms/` contents to your web server
2. Reference the files in your SkyCMS page templates
3. All Tailwind classes will work dynamically

## Cache Strategy

**For best performance, configure your web server:**

### Nginx
```nginx
location ~* \.js$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### Apache
```apache
<FilesMatch "\.(js)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
```

## Production Notes

✅ **Production Ready** - No CDN warnings
✅ **Self-Hosted** - Full control
✅ **Minified** - Configuration is minified for optimal size
✅ **Dynamic** - Works with any Tailwind class
✅ **Cacheable** - Browser caching supported
✅ **Documented** - All files include banner comments
✅ **Theme Included** - Custom colors, fonts, animations

## Support

For more information about your custom theme, see `tailwind.config.js` in the project root.
