import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

export default {
  mode: 'production',
  entry: './src/app/layout.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            sync: true,
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              target: 'es2021',
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
              externalHelpers: true,
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',  // Ensure postcss-loader is included
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
};
