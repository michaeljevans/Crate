// Imports
import path from 'path'
import Dotenv from 'dotenv-webpack'


// specifying an entry file (index.js), webpack reads all the imports in the application, starting from this file, building like a tree.
const config = {
  entry: {
    app: './src/setup/client/index.js'
  },

  output: {
    path: path.join(__dirname, 'public', 'js', 'bundles'),
    filename: '[name].js'
  },
/* for every file webpack finds, it needs to follow some rules */
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: 'vendor', chunks: 'all' }
      }
    }
  },

  plugins: [
    new Dotenv()
  ],

  node: {
    fs: "empty"
  }
}

export default config
