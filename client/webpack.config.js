const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
   mode: 'production',
   entry: path.resolve(__dirname, 'src/scripts/index.js'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name][contenthash].js',
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
               },
            },
         },
         {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
         {
            test: /\.svg$/,
            loader: 'svg-inline-loader',
         },
      ],
   },
   plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'dist'),
         watch: true,
      },

      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
   },
   devtool: 'source-map',
}
