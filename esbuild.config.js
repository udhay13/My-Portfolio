import { build } from 'esbuild';
import { readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all entry points from src directory
function getEntryPoints(dir, base = '') {
  const entries = {};
  const files = readdirSync(dir);

  files.forEach(file => {
    const fullPath = join(dir, file);
    const relativePath = join(base, file);
    
    if (statSync(fullPath).isDirectory()) {
      Object.assign(entries, getEntryPoints(fullPath, relativePath));
    } else if (file === 'main.tsx' || file === 'index.tsx') {
      const entryName = base || 'main';
      entries[entryName] = fullPath;
    }
  });

  return entries;
}

// Alias plugin for path resolution
const aliasPlugin = {
  name: 'alias',
  setup(build) {
    build.onResolve({ filter: /^@\// }, (args) => {
      return {
        path: resolve(__dirname, 'src', args.path.replace('@/', '')),
      };
    });
  },
};

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
  entryPoints: {
    main: resolve(__dirname, 'src/main.tsx'),
  },
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  platform: 'browser',
  target: ['es2020', 'chrome80', 'firefox78', 'safari14'],
  jsx: 'automatic',
  jsxImportSource: 'react',
  sourcemap: !isProduction,
  minify: isProduction,
  splitting: true,
  metafile: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: {
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.webp': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.css': 'css',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [aliasPlugin],
};

// Build function
async function buildApp() {
  try {
    console.log('Building with esbuild...');
    
    const result = await build({
      ...baseConfig,
      write: true,
    });

    if (result.metafile) {
      console.log('Build completed successfully!');
      console.log('Output files:', Object.keys(result.metafile.outputs));
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Watch mode
async function watchApp() {
  const ctx = await build({
    ...baseConfig,
    watch: {
      onRebuild(error, result) {
        if (error) {
          console.error('Watch build failed:', error);
        } else {
          console.log('Watch build succeeded');
        }
      },
    },
  });

  console.log('Watching for changes...');
}

// CLI handling
const command = process.argv[2];

if (command === 'watch') {
  watchApp();
} else {
  buildApp();
}

export { baseConfig, buildApp, watchApp };

