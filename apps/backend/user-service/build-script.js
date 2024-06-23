const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',  // Target depends on your environment
  outdir: 'build',
  external: ['express'],  // Specify Node.js packages here
  loader: {
    '.ts': 'ts',
  },
  resolveExtensions: ['.ts', '.js'],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  alias: {
    '@': path.resolve(__dirname, '.'),
  }
}).catch(() => process.exit(1));
