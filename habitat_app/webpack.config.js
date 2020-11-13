const path = require('path');

module.exports = {
  watch: true,  
  entry: {
    app: './src/index.js'
    },  
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../habitat_be/authentication/static'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"]
          }
        }
      }, 
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};