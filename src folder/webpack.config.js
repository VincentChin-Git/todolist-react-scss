const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.[contenthash].js",
    clean: true,
    publicPath: '/todolist-react-scss/',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      /*
      {
        test: /\.php$/,
        use: 'webpack-php-loader'
      }*/
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 8000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      // assets site
      assets: path.resolve(__dirname, 'src/assets/'),

      // pages site
      pages: path.resolve(__dirname, 'src/pages/'),

      // components site
      components: path.resolve(__dirname, 'src/components/'),

      // media site
      // media: path.resolve(__dirname, 'src/pages/components/media/'),

      // utils site
      utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
};