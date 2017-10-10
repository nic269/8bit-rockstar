import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

const resolve = dir => path.resolve(__dirname, dir);
const BUILD_DIR = resolve('public');
const APP_DIR = resolve('src');
const isDev = process.env.NODE_ENV === 'development';

const entries = {
  app: [`${APP_DIR}/index.jsx`],
  vendors: [
    'react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-thunk', 'axios'
  ]
};

const devServer = isDev
  ? {
    publicPath: 'http://localhost:3000/',
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000,
    stats: 'errors-only'
  }
  : {}
;

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: `${APP_DIR}/index.tpl.ejs`
  }),
  new CopyWebpackPlugin([
    { from: 'assets/images', to: `${BUILD_DIR}/assets/images` }
  ]),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    minChunks: 5
  })
];

if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new StyleLintPlugin());
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    compress: {
      warnings: false,
      drop_console: true
    }
  }));
  plugins.push(new ExtractTextPlugin('[name].[chunkhash].css'));
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  Object.assign(entries, {
    style: [path.join(APP_DIR, 'styles', 'styles.scss')]
  });
}

const config = {
  context: APP_DIR,
  entry: entries,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '*': 'react',
      '@App': resolve('src/'),
      '@Container': resolve('src/components/container'),
      '@Presentational': resolve('src/components/presentational'),
      '@Action': resolve('src/redux/actions'),
      '@Reducer': resolve('src/redux/reducers'),
      '@Asset': resolve('src/assets'),
      '@Api': resolve('src/api')
    }
  },
  devtool: isDev ? 'eval-source-map' : 'cheap-module-source-map',
  output: {
    path: BUILD_DIR,
    publicPath: isDev ? 'http://localhost:3000/' : '/',
    filename: isDev ? '[name].js' : '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'file',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include: `${APP_DIR}/styles`,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer'),
              ]
            }
          }
        ]
      }
    ]
  },
  externals: {
    'react/addons': true
  },
  plugins,
  devServer
};

module.exports = config;
