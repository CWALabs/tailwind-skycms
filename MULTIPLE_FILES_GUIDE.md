# Multiple HTML Files & Content Scanning

## Your Question Answered

**Q: How do you handle situations where total classes go beyond one HTML file?**

**A: The `content` configuration tells Tailwind which files to scan. It automatically combines class names from ALL files and generates CSS for all of them.**

---

## How It Works

### Your Current Configuration

```javascript
// tailwind.config.js
content: [
  "./src/**/*.{html,js,jsx,ts,tsx}",
  "./**/*.html"
]
```

This tells Tailwind:
1. Scan all HTML/JS/TS files in `./src/` folder and subfolders
2. Scan **ALL** `.html` files anywhere in the project

### The Scanning Process

```
Tailwind Build Finds:
├─ index.html
├─ pricing.html
├─ about.html
├─ any other .html file
└─ all .html in any subfolder

↓

Scans each file for class attributes:
├─ index.html contains: text-brand-500, font-montserrat, animate-float
├─ pricing.html contains: scale-105, text-4xl, border-accent-400
├─ about.html contains: w-32, h-32, rounded-full

↓

Combines ALL found classes:
text-brand-500, font-montserrat, animate-float, scale-105, 
text-4xl, border-accent-400, w-32, h-32, rounded-full, ...

↓

Generates CSS for ALL combined classes:
dist/tailwind.css includes CSS for every class above
```

---

## Real Example: Growing Website

### Setup

Your project now has:
```
d:\source\tailwind-css\
├── index.html        (Home page)
├── pricing.html      (Pricing page) 
├── about.html        (About page)
└── dist/
    └── tailwind.css  (Single compiled file for ALL pages!)
```

### What Happens

#### File 1: index.html
```html
<h1 class="text-brand-500 font-montserrat">Welcome</h1>
<div class="animate-float">Floating box</div>
```
Classes found: `text-brand-500`, `font-montserrat`, `animate-float`

#### File 2: pricing.html  
```html
<div class="scale-105 border-accent-400">Featured plan</div>
<span class="text-4xl">$99</span>
```
Classes found: `scale-105`, `border-accent-400`, `text-4xl`

#### File 3: about.html
```html
<div class="w-32 h-32 rounded-full">Profile pic</div>
```
Classes found: `w-32`, `h-32`, `rounded-full`

#### Build Process
```
1. Scans index.html
   Found: text-brand-500, font-montserrat, animate-float

2. Scans pricing.html  
   Found: scale-105, border-accent-400, text-4xl

3. Scans about.html
   Found: w-32, h-32, rounded-full

4. Combines all
   Total: 9 classes found

5. Generates CSS for all 9
   Writes to: dist/tailwind.css

6. ONE CSS file works for ALL pages!
   ✅ index.html links: dist/tailwind.css
   ✅ pricing.html links: dist/tailwind.css
   ✅ about.html links: dist/tailwind.css
```

---

## File Size Growth Pattern

```
Single File (index.html):
├─ Classes: ~40
└─ CSS Size: 17.87 KB

Add File 2 (pricing.html):
├─ New Classes: ~15
├─ Total Classes: ~55
└─ CSS Size: 20.15 KB (+2.28 KB)

Add File 3 (about.html):
├─ New Classes: ~5 (many reused from other pages)
├─ Total Classes: ~60
└─ CSS Size: 20.15 KB (no change - all classes already included!)
```

**Key insight:** File size only grows when you use **NEW** classes, not when you reuse existing ones.

---

## Content Pattern Guide

### Pattern: `"./src/**/*.{html,js,jsx,ts,tsx}"`

**Matches:**
```
src/index.html                    ✓
src/pages/contact.html            ✓
src/pages/blog/post.html          ✓
src/components/header.jsx         ✓
src/utils/helpers.ts              ✓
```

**Doesn't match:**
```
index.html                        ✗ (root level, not in src/)
pages/contact.html                ✗ (root level, not in src/)
dist/tailwind.js                  ✗ (not HTML/JS/TS/JSX/TSX)
```

### Pattern: `"./**/*.html"`

**Matches:**
```
index.html                        ✓ (any HTML file anywhere)
pricing.html                      ✓
about.html                        ✓
pages/contact.html                ✓
content/blog/post.html            ✓
a/b/c/d/e/deeply/nested.html     ✓
```

**Doesn't match:**
```
template.htm                      ✗ (wrong extension)
page.HTML                         ✗ (uppercase)
styles.css                        ✗ (not HTML)
```

---

## Complete File Tree Example

```
📁 Project
├── 📄 index.html                    ← Scanned ✓
├── 📄 pricing.html                  ← Scanned ✓
├── 📄 about.html                    ← Scanned ✓
├── 📄 contact.html                  ← Scanned ✓ (would be found)
├── 📂 pages/
│   ├── 📄 features.html             ← Scanned ✓
│   ├── 📄 blog.html                 ← Scanned ✓
│   └── 📂 blog/
│       ├── 📄 post-1.html           ← Scanned ✓
│       └── 📄 post-2.html           ← Scanned ✓
├── 📂 src/
│   ├── 📄 templates.html            ← Scanned ✓
│   ├── 📄 components.jsx            ← Scanned ✓ (has content pattern)
│   └── 📂 pages/
│       ├── 📄 home.html             ← Scanned ✓
│       └── 📄 dashboard.html        ← Scanned ✓
├── 📂 dist/
│   └── 📄 tailwind.css              ← OUTPUT (CSS for all above!)
└── 📄 tailwind.config.js
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
      "./**/*.html"
    ]
```

**Result:** One `tailwind.css` file that works for all HTML pages!

---

## How to Add New Pages

### Scenario: You create contact.html

```html
<!-- contact.html -->
<form class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <input class="w-full px-4 py-2 border border-gray-300 rounded mb-4" />
  <button class="bg-brand-500 text-white font-montserrat py-2 px-6 rounded hover:bg-brand-600">
    Send Message
  </button>
</form>
```

Classes used: `max-w-md`, `mx-auto`, `p-6`, `bg-white`, `rounded-lg`, `shadow-md`, `w-full`, `px-4`, `py-2`, `border`, `border-gray-300`, `mb-4`, `bg-brand-500`, `text-white`, `font-montserrat`, `hover:bg-brand-600`

### What Happens Next

```
1. You create contact.html ✓
2. File automatically matches "./**/*.html" pattern ✓
3. You run: npm run build
4. Tailwind scans contact.html ✓
5. Finds new classes like max-w-md, shadow-md, etc.
6. Updates dist/tailwind.css with new CSS ✓
7. contact.html can now link to dist/tailwind.css ✓
```

### No Changes to Config Needed!

You don't need to modify `tailwind.config.js`. The pattern `./**/*.html` already covers all new files automatically.

---

## Comparison: Single vs Multiple Files

### With Single File (index.html only)

```
├── index.html (contains all classes)
├── tailwind.config.js
└── dist/tailwind.css (17.87 KB)
```

❌ Problem: New pages can't use custom classes they don't define  
❌ Problem: All HTML in one file (not scalable)  
❌ Problem: Harder to maintain

### With Multiple Files (index + pricing + about)

```
├── index.html (home page classes)
├── pricing.html (pricing page classes)
├── about.html (about page classes)
├── tailwind.config.js (shared config)
└── dist/tailwind.css (20.15 KB - covers ALL pages!)
```

✅ Solution: ONE CSS file works for all pages  
✅ Solution: Each page in separate HTML file  
✅ Solution: Easy to add new pages (auto-scanned)  
✅ Solution: Classes automatically combined across files  

---

## Tips for Multiple Files

### 1. Consistent Naming
```
✓ Good: index.html, pricing.html, about.html, contact.html
✓ Good: pages/home.html, pages/pricing.html, pages/about.html
✗ Bad: HOME.html, About Page.html, contact-us-page.html
```

### 2. Link All Pages to Same CSS
```html
<!-- Every page should link same CSS file -->

<!-- index.html -->
<link rel="stylesheet" href="dist/tailwind.css">

<!-- pricing.html -->
<link rel="stylesheet" href="dist/tailwind.css">

<!-- about.html -->
<link rel="stylesheet" href="dist/tailwind.css">

<!-- ✓ Correct: All same file -->
```

### 3. Rebuild After Structural Changes
```bash
# Add new page with new classes
npm run build

# Or watch for automatic rebuilds
npm run watch
```

### 4. Keep CSS File Link Path Consistent
```
If files are in different folders:

pages/
├── index.html
│   <link href="../dist/tailwind.css">  ✓ Correct
└── nested/
    └── about.html
        <link href="../../dist/tailwind.css">  ✓ Correct
```

---

## Scale to Hundreds of Pages

Even with 100+ HTML files, Tailwind handles it perfectly:

```
Website with 100+ pages:
├── pages/
│   ├── home.html
│   ├── products.html
│   ├── pricing.html
│   ├── blog/
│   │   ├── post-1.html
│   │   ├── post-2.html
│   │   ... (many more)
│   └── ... (many more pages)
├── dist/tailwind.css (single file!)
└── tailwind.config.js

Result: All pages use ONE CSS file!
- Scanned: 100+ HTML files
- Combined: ~500 unique classes
- Generated: Single optimized CSS file
- File size: Still just 20-50 KB (depends on classes)
```

The content pattern automatically discovers and processes all files!

---

## Your Current Status

```
✅ index.html (home)         - 17.87 KB initial
✅ pricing.html (pricing)    - +2.28 KB added
✅ about.html (about)        - no additional growth
✅ dist/tailwind.css         - 20.15 KB total

Pattern: "./**/*.html"       - Covers all current & future HTML files
Ready for: contact.html, blog.html, features.html, etc.
No config changes needed!
```

---

## Summary: The Golden Rule

```
┌─────────────────────────────────────────────┐
│ MULTIPLE FILES RULE:                        │
│                                             │
│ 1. Content patterns find all HTML files     │
│ 2. Build scans ALL files for classes       │
│ 3. Combines all class names together       │
│ 4. Generates ONE CSS file for all pages    │
│                                             │
│ Result: Add unlimited pages automatically!  │
└─────────────────────────────────────────────┘
```

Your config is already perfect for this! 🎉
