// Basic webpack configuration
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const paths = require('./paths')

module.exports = () => {
  return {
    entry: {
      index: './client/index.tsx',
    },
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: '[name].[hash:8].bundle.js',
      path: paths.bundlePath,
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@': paths.clientSrc,
      },
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'awesome-typescript-loader',
            options: {
              usaCache: false,
              forceIsolatedModules: true,
              configFileName: paths.clientTsConfig,
              reportFiles: [
                'client/**/*.{ts,tsx}'
              ],
              useBabel: true,
              babelOptions: {
                babelrc: false,
                presets: paths.babelConfig,
              },
            },
          }],
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js?$/,
          use: 'source-map-loader',
          exclude: /node_modules/,
        },
        // All files with '.js' extension will be handled by babel-load
        {
          test: /\.js?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        // All static file will be handled by url-laoder
        {
          test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf)(\?.*)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/[path][name].[hash:8].[ext]',
            },
          }],
        },
      ],
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        favicon: paths.favicon,
        filename: 'index.html',
        template: paths.htmlTemplate,
        inject: true,
        chunks: ['index', 'vendors'],
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
        name: 'vendors',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 1,
          }
        }
      },
    },
  }
}