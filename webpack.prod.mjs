import {merge} from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

import common from './webpack.common.mjs';

export default merge(common, {
  mode: 'production',
    output: {
      path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', 'less-loader']
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      chunkFilename: '[id].[fullhash].css',
    })
  ]
});
