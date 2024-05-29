const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/demo.tsx', // Starting Point of Application
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'ui-components.bundle.js',
    libraryTarget: 'umd', // format make our bundle compatible with multiple environments like browser, nodejs, etc.
    globalObject: 'typeof self !== \'undefined\' ? self : this' // issue (1)
  },
  module: { // issue (2)
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // or MiniCssExtractPlugin.loader in production
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'] // Allows importing these files without specifying their extensions
  },
  plugins: [ // issue (3)
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};

// Note
// (1): Check if `self` is defined (which work in browser) and if not, fallback to `this` (refer to global in NodeJS env)
// - globalObject: default value is `window` or `self`
// (2): use to specify loader
// - EX1: ts-loader: convert typescript to moder JS (es6)
// - EX2: css-loader: Translate CSS into CommonJS ( allows you to use @import and URL functions in your CSS which get resolved to imports/require statements in your JavaScript.)
// - EX3: style-loader: Create `style` nodes from JS strings ( takes the CSS modules processed by css-loader and postcss-loader and injects them into the page, making the styles available when you load your component.)
// - EX4: postcss-loader: Process CSS with PostCSS (configured to use plugins like Autoprefixer to process your CSS files, adding vendor prefixes automatically based on your project's browser support requirements.)
// (3): HTMLWebpackPlugin: create HTML file to serve webpack bundles