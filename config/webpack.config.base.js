// Basic webpack configuration
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

const appConfig = require(paths.appConfig)
const bundleDir = appConfig.bundleDir || 'dist'

module.exports = () => {
  return {
    entry: {
      index: './client/index.tsx',
    },
    output: {
      filename: '[name].[hash:8].js',
      path: path.resolve(__dirname, bundleDir),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: [
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
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: paths.favicon,
        filename: 'index.html',
        template: paths.htmlTemplate,
        inject: true,
        chunks: ['index'],
      }),
    ]
  }
}