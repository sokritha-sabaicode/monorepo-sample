const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs-extra');
const copy = require('esbuild-plugin-copy').default;

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
  plugins: [
    // (2) Solve: https://stackoverflow.com/questions/62136515/swagger-ui-express-plugin-issue-with-webpack-bundling-in-production-mode/63048697#63048697
    copy({
      assets: [
        {
          from: `../../../node_modules/swagger-ui-dist/*.css`,
          to: './',
        },
        {
          from: `../../../node_modules/swagger-ui-dist/*.js`,
          to: './',
        },
        {
          from: `../../../node_modules/swagger-ui-dist/*.png`,
          to: './',
        },
        {
          from: './src/configs/.env.production',
          to: './configs',
        },
      ],
    }),
  ],
  resolveExtensions: ['.ts', '.js'],
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  alias: {
    '@': path.resolve(__dirname, '.'),

  }
}).then(() => {
  // (1) Solve: Copy swagger.json after successful build
  fs.copySync(path.resolve(__dirname, 'src/docs/swagger.json'), path.resolve(__dirname, 'build/docs/swagger.json'));
  console.log('Swagger JSON copied successfully!');

  // Copy package.json after ensuring the build was successful
  fs.copySync(path.resolve(__dirname, 'package.json'), path.resolve(__dirname, 'build/package.json'));
  console.log('Package.json copied successfully!');

  // Copy ecosystem.config.js after ensuring the build was successful
  fs.copySync(path.resolve(__dirname, 'ecosystem.config.js'), path.resolve(__dirname, 'build/ecosystem.config.js'));
  console.log('Ecosystem Config copied successfully!');

}).catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});
