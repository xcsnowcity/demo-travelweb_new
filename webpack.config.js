const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'development',
  entry: './src/pages/index/index.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true,
    assetModuleFilename: 'images/[hash][ext][query]',
    // devServer: {
    //   // static: './dist',
    //   liveReload: ture,
    //   // watchFiles: ['./src/**/*'],
    // },
  },
  resolve: {
    preferRelative: true,
    alias:{
      //给import或require引入文件的路径起的别名
        api: path.resolve(__dirname, 'src/api/'),
        fonts: path.resolve(__dirname, 'src/assets/fonts/'),
        images: path.resolve(__dirname, 'src/assets/images/'),
        styles: path.resolve(__dirname, 'src/assets/styles/'),
        components: path.resolve(__dirname, 'src/components/'),
        pages: path.resolve(__dirname, 'src/pages/'),
    },
},
  devtool:'eval',
  module: {
    rules: [
    //   {
    //     test: /\.m?js$/,
    //     exclude: /(node_modules|bower_components)/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env']
    //       }
    //     }
    //   },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        // use: ["css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        // type: 'asset/resource'
        //test: /\.svg/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator : {
            filename : 'fonts/[name][ext][query]',
          }
      },
      {
        test:/\.art$/,
        loader:'art-template-loader'
      }
    ]
  },
//   target: ['web', 'es5'],
// target: 'web',

  plugins: [
    new HtmlWebpackPlugin({
    template:'./src/pages/index/index.art',
  }),
],
};