import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/parsons", to: "parsons" }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

  ],
  output: {
    library: 'ParsonsUI',
    libraryTarget: 'umd',
    filename: 'parsonsUI.js',
    auxiliaryComment: 'ParsonsUI'
  },
};