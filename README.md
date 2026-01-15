# SkyCMS Tailwind CSS Build

[![Build Distribution](https://github.com/YOUR-USERNAME/YOUR-REPO/actions/workflows/build.yml/badge.svg)](https://github.com/YOUR-USERNAME/YOUR-REPO/actions/workflows/build.yml)

This project contains the Tailwind CSS build setup for the SkyCMS website. It compiles Tailwind CSS into a ready-to-use CSS file and provides a self-hosted JavaScript runtime for dynamic styling.

## 🌟 Features

- **Custom Brand Styling** - Pre-configured with SkyCMS brand colors, fonts, and animations
- **Multiple Distribution Formats** - Compiled CSS and JavaScript runtime options
- **CDN Ready** - Automatically published to jsDelivr for easy integration
- **GitHub Actions** - Automated builds on every push
- **Production Optimized** - Minified outputs for best performance

## 🚀 Quick Start

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the CSS:
   ```bash
   npm run build
   ```

The compiled CSS will be available at `dist/tailwind.css` and `dist/tailwind.min.css`.

## 📋 Available Commands

- **`npm run build`** - Build both regular and minified CSS files (creates `dist/tailwind.css` and `dist/tailwind.min.css`)
- **`npm run watch`** - Watch for changes and rebuild automatically (for development)
- **`npm run build:minify`** - Build only the minified CSS for production (creates `dist/tailwind.min.css`)
- **`npm run build:skycms`** - Build self-hosted JavaScript runtime distribution (creates `dist/skycms/`)
- **`npm run build:all`** - Build everything: CSS and JavaScript runtime distributions

## 📁 Project Structure

```
tailwind-skycms/
├── src/
│   └── input.css                    # Source CSS with Tailwind directives
├── dist/
│   ├── tailwind.css                 # Compiled CSS output
│   ├── tailwind.min.css             # Minified CSS output
│   └── skycms/                      # Self-hosted JavaScript runtime
│       ├── tailwind-bundle.js       # Combined runtime + config
│       ├── tailwind-runtime.js      # Tailwind engine only
│       └── tailwind-config.js       # Configuration only
├── .gUsing in Your Projects

### Option 1: Via CDN (Easiest - Recommended)

Use jsDelivr to load files directly from this GitHub repository:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyCMS Website</title>
    
    <!-- Option A: Use compiled CSS (faster, production-ready) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/dist/tailwind.min.css">
 link rel="stylesheet" href="path/to/dist/tailwind.min.css">
```

#### Using JavaScript Runtime

```html
<!-- Combined bundle (config + runtime) -->
<script src="path/to/dist/skycms/tailwind-bundle.js"></script>

<!-- OR separate files -->
<script src="path/to/dist/skycms/tailwind-config.js"></script>
<script src="path/to/dist/skycms/tailwind-runtime.js"></script

### Basic HTML Example

Include the compiled CSS file in your HTML `<head>` section:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyCMS Website</title>
    
    <!-- Link to the compiled Tailwind CSS -->
    <link rel="stylesheet" href="path/to/dist/tailwind.css">
</head>
<body>
    <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-blue-600 mt-8">
            Welcome to SkyCMS
        </h1>
        <p class="text-gray-700 mt-4">
            This page is styled with Tailwind CSS!
        </p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Click Me
        </button>
    </div>
</body>
</html>
```

### For Production

Use the minified version for better performance:

```html
<link rel="stylesheet" href="path/to/dist/tailwind.min.css">
```

### Path Examples

Depending on where your HTML file is located relative to this project:

- **Same directory as `dist/` folder:**
  ```html
  <link rel="stylesheet" href="dist/tailwind.css">
  ```

- **In a `public/` or `www/` folder:**
  ```html
  <link rel="stylesheet" href="../tailwind-css/dist/tailwind.css">
  ```

- **Using absolute path (local development):**
  ```html
  <link rel="stylesheet" href="/dist/tailwind.css">
  ```

## ⚙️ Customization

### Customizing Your Tailwind Build

This project is already configured with a custom Tailwind theme including:
- **Custom brand colors** (cyan/teal tones)
- **Custom accent colors** (orange/yellow palette)
- **Custom gray scale**
- **Custom fonts** (Montserrat, Roboto, Inter)
- **Custom animations** (float, cloud animations, fade/slide effects)

All customization is done in [tailwind.config.js](tailwind.config.js) and built into your CSS files.

### How to Customize and Build

1. **Edit the configuration** in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#00DEDE",  // Your custom brand color
          600: "#00ADB5",
        },
        // Add more custom colors...
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        // Add custom fonts...
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        // Add custom animations...
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        // Define animation keyframes...
      },
    },
  },
}
```

2. **Rebuild the CSS** to apply your changes:
   ```bash
   npm run build
   ```

3. **Use your custom classes** in HTML:
   ```html
   <!-- Custom brand colors -->
   <div class="bg-brand-500 text-accent-400">Brand styled content</div>
   
   <!-- Custom fonts -->
   <h1 class="font-montserrat">Heading with Montserrat</h1>
   
   <!-- Custom animations -->
   <div class="animate-float">Floating element</div>
   <div class="animate-slide-in-left">Slide in from left</div>
   ```

### Available Custom Classes

**Brand Colors:**
- `bg-brand-500`, `text-brand-600`, `border-brand-700`

**Accent Colors:**
- `bg-accent-{25,50,100,200,300,400,500,600,700,800,900,950}`

**Custom Fonts:**
- `font-montserrat`, `font-roboto`, `font-inter`

**Animations:**
- `animate-float` - Gentle up/down floating
- `animate-pulse-slow` - Slow pulsing effect
- `animate-cloud-float-1/2/3` - Cloud-like floating patterns
- `animate-fade-in` - Fade in effect
- `animate-slide-in-left/right/up/bottom` - Slide in from different directions

### Adding Your Own CSS

Edit `src/input.css` to add custom styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom CSS here */
.custom-button {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
```

After editing, run `npm run build` to compile your changes.

### Configuring Content Paths

Update `tailwind.config.js` to scan your HTML/template files for Tailwind classes:

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "../skycms/**/*.html",  // Add your SkyCMS template paths
    "../public/**/*.html",
  ],
  // ...
}
```

This ensures Tailwind only includes the classes you actually use, keeping the file size small.

## 🔄 Documentation

### Project Documentation
- **[CDN_USAGE.md](CDN_USAGE.md)** - Complete guide to using files via jsDelivr CDN
- **[SKYCMS_BUILD_GUIDE.md](SKYCMS_BUILD_GUIDE.md)** - Detailed build process documentation
- **[CDN_VS_BUILD_PROCESS.md](CDN_VS_BUILD_PROCESS.md)** - Understanding runtime vs compiled approaches
- *🤖 Automated Builds

This project uses GitHub Actions to automatically:
- Build the distribution on every push to `main`
- Commit and push the built files back to the repository
- Make files instantly available via jsDelivr CDN

The workflow runs automatically - no manual intervention needed!

## 🛠️ Troubleshooting

**Issue:** CSS file is very large
- **Solution:** Make sure the `content` paths in `tailwind.config.js` point to your actual template files. Tailwind will only include the classes you're actually using.

**Issue:** Styles not updating
- **Solution:** Use `npm run watch` during development, or rebuild with `npm run build` after making changes.

**Issue:** Classes not working
- **Solution:** Verify the CSS file is properly linked in your HTML and that you've rebuilt after adding new classes.

**Issue:** CDN not showing latest changes
- **Solution:** Wait a few minutes for jsDelivr cache to update, or purge cache at https://www.jsdelivr.com/tools/purge

**Issue:** Custom colors/fonts not included in CSS
- **Solution:** Make sure you're using the classes in your HTML files. See [CDN_VS_BUILD_PROCESS.md](CDN_VS_BUILD_PROCESS.md) for details.

## 📝 License

MIT
   ```bash
   npm run watch
   ```

2. Edit your HTML files and add Tailwind classes

3. The CSS will automatically rebuild when you save changes to `src/input.css` or any files matching the `content` patterns in `tailwind.config.js`

## 📦 Output Files

- **`dist/tailwind.css`** - Full CSS file (use for development)
- **`dist/tailwind.min.css`** - Minified CSS file (use for production)

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Play (Online Playground)](https://play.tailwindcss.com/)

## 🛠️ Troubleshooting

**Issue:** CSS file is very large
- **Solution:** Make sure the `content` paths in `tailwind.config.js` point to your actual template files. Tailwind will only include the classes you're actually using.

**Issue:** Styles not updating
- **Solution:** Use `npm run watch` during development, or rebuild with `npm run build` after making changes.

**Issue:** Classes not working
- **Solution:** Verify the CSS file is properly linked in your HTML and that you've rebuilt after adding new classes.
