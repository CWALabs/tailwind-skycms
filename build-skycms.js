/**
 * SkyCMS Tailwind Distribution Builder
 * 
 * This script creates a production-ready Tailwind CSS distribution
 * specifically for SkyCMS with self-hosted JavaScript runtime.
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

// Configuration
const CONFIG = {
  sourceFiles: {
    tailwindJS: 'tailwind.js',
    tailwindConfig: 'tailwind-config.js'
  },
  outputDir: 'dist/skycms',
  outputs: {
    separate: {
      js: 'tailwind-runtime.js',
      config: 'tailwind-config.js'
    },
    combined: {
      bundle: 'tailwind-bundle.js'
    }
  }
};

console.log('🚀 Building SkyCMS Tailwind Distribution...\n');

// Create output directory
const outputDir = path.join(__dirname, CONFIG.outputDir);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✓ Created output directory: ${CONFIG.outputDir}`);
}

// Banner comments for generated files
const banners = {
  runtime: `/**
 * SkyCMS Tailwind Runtime
 * 
 * This is the Tailwind CSS JavaScript engine that dynamically generates
 * CSS from HTML class names at runtime. It scans your HTML for Tailwind
 * classes and creates the corresponding styles on the fly.
 * 
 * Usage: Load this after tailwind-config.js
 * Size: ~398 KB (minified)
 * Cache: Set to cache for 1 year for optimal performance
 * 
 * Part of SkyCMS Tailwind Distribution
 * Generated: ${new Date().toISOString()}
 */

`,
  config: `/**
 * SkyCMS Tailwind Configuration
 * 
 * This file contains your custom Tailwind theme configuration including:
 * - Brand colors (cyan/teal palette)
 * - Accent colors (orange/yellow palette)  
 * - Custom fonts (Montserrat, Roboto, Inter)
 * - Custom animations (float, slide-in, fade-in)
 * 
 * Usage: Load this before tailwind-runtime.js
 * Size: ~2 KB (minified)
 * Cache: Update this file when theme changes
 * 
 * Part of SkyCMS Tailwind Distribution
 * Generated: ${new Date().toISOString()}
 */

`,
  bundle: `/**
 * SkyCMS Tailwind Bundle (All-in-One)
 * 
 * This combined file includes:
 * 1. Tailwind CSS Runtime Engine (~398 KB)
 * 2. Custom Theme Configuration (~2 KB)
 * 
 * This is a convenience bundle that combines both the runtime engine
 * and configuration into a single file. Use this for simpler deployment,
 * but note that updating the config requires re-downloading the entire file.
 * 
 * For better cache efficiency, consider using separate files:
 * - tailwind-config.js (2 KB, cache separately)
 * - tailwind-runtime.js (398 KB, cache separately)
 * 
 * Usage: Load this single file instead of separate config + runtime
 * Size: ~400 KB (minified)
 * Cache: Set to cache for 1 year
 * 
 * Part of SkyCMS Tailwind Distribution
 * Generated: ${new Date().toISOString()}
 */

`
};

// Build process
async function build() {
  try {
    // 1. Copy Tailwind JS runtime with banner
    const tailwindJSPath = path.join(__dirname, CONFIG.sourceFiles.tailwindJS);
    const outputJSPath = path.join(outputDir, CONFIG.outputs.separate.js);

    if (!fs.existsSync(tailwindJSPath)) {
      console.error(`❌ Error: ${CONFIG.sourceFiles.tailwindJS} not found!`);
      process.exit(1);
    }

    const tailwindJS = fs.readFileSync(tailwindJSPath, 'utf8');
    fs.writeFileSync(outputJSPath, banners.runtime + tailwindJS);
    const jsSize = (fs.statSync(outputJSPath).size / 1024).toFixed(2);
    console.log(`✓ Copied Tailwind runtime: ${CONFIG.outputs.separate.js} (${jsSize} KB)`);

    // 2. Minify and copy configuration file
    const configPath = path.join(__dirname, CONFIG.sourceFiles.tailwindConfig);
    const outputConfigPath = path.join(outputDir, CONFIG.outputs.separate.config);

    if (!fs.existsSync(configPath)) {
      console.error(`❌ Error: ${CONFIG.sourceFiles.tailwindConfig} not found!`);
      process.exit(1);
    }

    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Minify the config
    const minified = await minify(configContent, {
      compress: {
        dead_code: true,
        drop_console: false,
        drop_debugger: true,
        keep_classnames: true,
        keep_fnames: true
      },
      mangle: false,
      format: {
        comments: false
      }
    });

    const finalConfig = banners.config + minified.code;
    fs.writeFileSync(outputConfigPath, finalConfig);
    const configSize = (fs.statSync(outputConfigPath).size / 1024).toFixed(2);
    console.log(`✓ Minified and copied configuration: ${CONFIG.outputs.separate.config} (${configSize} KB)`);
    
    // 3. Create combined bundle with minified config
    const outputBundlePath = path.join(outputDir, CONFIG.outputs.combined.bundle);
    const bundle = banners.bundle + tailwindJS + '\n\n' + minified.code;
    fs.writeFileSync(outputBundlePath, bundle);

    const bundleSize = (fs.statSync(outputBundlePath).size / 1024).toFixed(2);
    console.log(`✓ Created minified bundle: ${CONFIG.outputs.combined.bundle} (${bundleSize} KB)`);

    // 4. Create README for the distribution
    createDocumentation();

    // 5. Create example HTML template
    createExampleTemplate();

    // Summary
    console.log('\n✅ Build Complete!\n');
    console.log('📁 Output Directory:', CONFIG.outputDir);
    console.log('\n📦 Distribution Files:');
    console.log(`   - ${CONFIG.outputs.separate.js} (with banner)`);
    console.log(`   - ${CONFIG.outputs.separate.config} (minified + banner)`);
    console.log(`   - ${CONFIG.outputs.combined.bundle} (minified + banner)`);
    console.log(`   - README.md`);
    console.log(`   - example-template.html`);
    console.log('\n💡 Next Steps:');
    console.log('   1. Deploy dist/skycms/ to your web server');
    console.log('   2. Use example-template.html as your SkyCMS page template');
    console.log('   3. Configure cache headers for optimal performance');
    console.log('\n🚀 Ready for production!');

  } catch (error) {
    console.error(`❌ Build failed: ${error.message}`);
    process.exit(1);
  }
}

function createDocumentation() {
  const readmeContent = `# SkyCMS Tailwind CSS Distribution

Generated on: ${new Date().toISOString()}

## Files Included

### Option 1: Separate Files (Recommended)
- **tailwind-runtime.js** - Tailwind CSS engine (with banner comments)
- **tailwind-config.js** - Your custom theme configuration (minified + banner)

**Usage:**
\`\`\`html
<script src="/dist/skycms/tailwind-config.js"></script>
<script src="/dist/skycms/tailwind-runtime.js"></script>
\`\`\`

**Benefits:**
- Configuration cached separately
- Update config without re-downloading engine
- Better cache efficiency

### Option 2: Combined Bundle
- **tailwind-bundle.js** - Everything in one file (minified + banner)

**Usage:**
\`\`\`html
<script src="/dist/skycms/tailwind-bundle.js"></script>
\`\`\`

**Benefits:**
- Single HTTP request
- Simpler deployment

## File Sizes

All files include informative banner comments explaining their purpose.

| File | Size | Purpose |
|------|------|---------|
| tailwind-runtime.js | ${(fs.statSync(path.join(outputDir, CONFIG.outputs.separate.js)).size / 1024).toFixed(2)} KB | Tailwind CSS engine |
| tailwind-config.js | ${(fs.statSync(path.join(outputDir, CONFIG.outputs.separate.config)).size / 1024).toFixed(2)} KB | Custom theme (minified) |
| tailwind-bundle.js | ${(fs.statSync(path.join(outputDir, CONFIG.outputs.combined.bundle)).size / 1024).toFixed(2)} KB | Combined (all-in-one) |

## Deployment

1. Copy \`dist/skycms/\` contents to your web server
2. Reference the files in your SkyCMS page templates
3. All Tailwind classes will work dynamically

## Cache Strategy

**For best performance, configure your web server:**

### Nginx
\`\`\`nginx
location ~* \\.js$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
\`\`\`

### Apache
\`\`\`apache
<FilesMatch "\\.(js)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
\`\`\`

## Production Notes

✅ **Production Ready** - No CDN warnings
✅ **Self-Hosted** - Full control
✅ **Minified** - Configuration is minified for optimal size
✅ **Dynamic** - Works with any Tailwind class
✅ **Cacheable** - Browser caching supported
✅ **Documented** - All files include banner comments
✅ **Theme Included** - Custom colors, fonts, animations

## Support

For more information about your custom theme, see \`tailwind.config.js\` in the project root.
`;

  fs.writeFileSync(path.join(outputDir, 'README.md'), readmeContent);
  console.log(`✓ Created README.md`);
}

function createExampleTemplate() {
  const exampleTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkyCMS Page Template</title>
  
  <!-- SkyCMS Tailwind Distribution (Separate Files - Recommended) -->
  <script src="/dist/skycms/tailwind-config.js"></script>
  <script src="/dist/skycms/tailwind-runtime.js"></script>
  
  <!-- Alternative: Combined Bundle (Uncomment to use) -->
  <!-- <script src="/dist/skycms/tailwind-bundle.js"></script> -->
</head>
<body class="bg-gray-50">
  
  <div class="container mx-auto px-4 py-12">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-4xl font-montserrat font-bold text-brand-500 mb-2">
          SkyCMS Page Template
        </h1>
        <p class="text-gray-600">Production-ready Tailwind CSS distribution with minified config</p>
      </header>

      <!-- Content -->
      <main class="space-y-6">
        
        <!-- Custom Theme Demo -->
        <section class="bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-3">Custom Theme Works ✨</h2>
          <p class="text-brand-100 mb-4">
            Brand colors, custom fonts, and animations are all included
          </p>
          <div class="flex gap-4">
            <button class="bg-accent-500 hover:bg-accent-600 px-6 py-3 rounded-lg font-semibold transition">
              Accent Button
            </button>
            <button class="bg-white text-brand-600 hover:bg-brand-50 px-6 py-3 rounded-lg font-semibold transition">
              Brand Button
            </button>
          </div>
        </section>

        <!-- Animation Demo -->
        <section class="bg-accent-50 border border-accent-200 rounded-lg p-6">
          <div class="text-center animate-float">
            <div class="text-6xl mb-4">🎈</div>
            <p class="font-montserrat font-semibold text-accent-700">
              Custom animations work out of the box
            </p>
          </div>
        </section>

        <!-- Usage Info -->
        <section class="bg-blue-50 border-l-4 border-blue-500 p-6">
          <h3 class="font-bold text-blue-900 mb-2">📦 Distribution Info</h3>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>✓ Self-hosted (no CDN)</li>
            <li>✓ Production-ready (no warnings)</li>
            <li>✓ Configuration minified</li>
            <li>✓ All files have banner comments</li>
            <li>✓ All Tailwind classes work</li>
            <li>✓ Custom theme included</li>
            <li>✓ Browser cacheable</li>
          </ul>
        </section>

      </main>

      <!-- Footer -->
      <footer class="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>Built with SkyCMS Tailwind Distribution</p>
        <p class="text-xs mt-1">Files include informative banner comments</p>
      </footer>

    </div>
  </div>

</body>
</html>
`;

  fs.writeFileSync(path.join(outputDir, 'example-template.html'), exampleTemplate);
  console.log(`✓ Created example-template.html`);
}

// Run the build
build();
