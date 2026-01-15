# Quick Reference: Build Process vs CDN

## TL;DR - The Difference in 30 Seconds

**CDN (tailwind.js):**
- Reads `window.tailwind.config = {}`
- Generates CSS for **ALL** values in config
- No HTML scanning needed
- Large file, slow loading

**Build (npm run build):**
- Reads `tailwind.config.js`
- Scans HTML for class names
- Generates CSS for **only** used classes
- Small file, fast loading

**KEY**: Your config just says what's **available**. HTML says what's **used**. Build only generates CSS for what's **used**.

---

## What You Did (Solution)

```javascript
// 1. Defined custom config ✅
tailwind.config.js:
  colors: { brand: { 500: "#00DEDE" } }

// 2. Used it in HTML ✅
index.html:
  class="text-brand-500"

// 3. Built CSS ✅
npm run build
  → Found "text-brand-500" in HTML
  → Matched to colors.brand.500 in config
  → Generated .text-brand-500 { color: #00DEDE; }
```

---

## Your Custom Classes (Now Available)

### Colors
- `bg-brand-500`, `text-brand-500`, `border-brand-500`, etc.
- `bg-accent-300`, `text-accent-500`, `border-accent-700`, etc.
- `bg-gray-50` through `bg-gray-950` (custom grays)

### Fonts  
- `font-montserrat` - Bold, modern headlines
- `font-roboto` - Clean body text
- `font-inter` - Minimal, professional

### Animations
- `animate-float` - Smooth floating motion
- `animate-cloud-float-1`, `-2`, `-3` - Cloud movements
- `animate-fade-in` - Fade in effect
- `animate-slide-in-left`, `-right`, `-up`, `-down` - Slide directions

---

## Common Questions

**Q: Why isn't my new custom color showing in CSS?**
A: Add it to HTML first, then rebuild:
```html
<div class="bg-brand-700">Content</div>
```
Then: `npm run build`

**Q: Do I need to use every custom value?**
A: No! Only the ones you actually use in HTML get CSS generated.

**Q: Can I add colors dynamically?**
A: Not with build process (it's static). Use the `safelist` in config for classes that might be dynamically generated.

**Q: Is the CDN slower?**
A: Yes. The JavaScript must generate CSS on every page load. Better for development, not production.

**Q: Why are my fonts not working?**
A: Make sure Google Fonts are imported in HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
```

---

## Quick Commands

```bash
# Build CSS once
npm run build

# Watch for changes and rebuild automatically
npm run watch

# Build minified version
npm run build

# File locations
src/input.css              ← Source CSS
dist/tailwind.css          ← Compiled output
dist/tailwind.min.css      ← Minified output
tailwind.config.js         ← Configuration
```

---

## File Checklist

- [x] `package.json` - Dependencies and scripts
- [x] `tailwind.config.js` - Custom theme config
- [x] `src/input.css` - Tailwind directives
- [x] `index.html` - Using custom classes
- [x] `dist/tailwind.css` - Compiled with custom CSS
- [x] `dist/tailwind.min.css` - Minified version

---

## Integration Steps (For SkyCMS)

1. **Copy the CSS file**:
   ```
   Copy dist/tailwind.css to your SkyCMS assets folder
   ```

2. **Link in HTML**:
   ```html
   <link rel="stylesheet" href="/path/to/tailwind.css">
   ```

3. **Add Google Fonts** (for custom font families):
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Roboto:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```

4. **Use custom classes**:
   ```html
   <h1 class="text-brand-500 font-montserrat">Title</h1>
   <button class="bg-brand-600 text-white font-montserrat">
     Click Me
   </button>
   ```

---

## Key Files Updated

| File | What Changed |
|------|-------------|
| `index.html` | Now uses custom brand/accent colors, custom fonts, and animations |
| `dist/tailwind.css` | Now includes CSS for all custom values (was 912 lines, now 980 lines) |
| `SOLUTION_SUMMARY.md` | ✨ NEW - Complete solution explanation |
| `CDN_VS_BUILD_PROCESS.md` | ✨ NEW - Deep dive into differences |
| `VISUAL_COMPARISON.md` | ✨ NEW - Visual diagrams of both approaches |

---

## Testing

Open `index.html` in a browser and verify:
- ✅ Title has cyan color (brand-500)
- ✅ Buttons have brand colors (brand-600)
- ✅ Feature cards have brand borders
- ✅ Fonts look custom (Montserrat/Roboto)
- ✅ Floating animation on heading
- ✅ Slide animations on feature cards

---

## Status: ✅ COMPLETE

Your Tailwind CSS build is fully operational with custom theme! 🎉

Next step: Use `dist/tailwind.css` in your SkyCMS website.
