const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const isProductionBuild = argv.mode === "production";
  const publicPath = '';

  const pcss = {
    test: /\.(p|post|)css$/,
    use: [
      isProductionBuild ? MiniCssExtractPlugin.loader : "vue-style-loader",
      "css-loader",
      "postcss-loader"
    ]
  };

  // const scss = {
  //   test: /\.(scss)$/,
  //   use: [{
  //     loader: 'style-loader', // inject CSS to page
  //   }, {
  //     loader: 'css-loader', // translates CSS into CommonJS modules
  //   }, {
  //     loader: 'postcss-loader', // Run post css actions
  //     options: {
  //       plugins: function () { // post css plugins, can be exported to postcss.config.js
  //         return [
  //           require('precss'),
  //           require('autoprefixer')
  //         ];
  //       }
  //     }
  //   }, {
  //     loader: 'sass-loader' // compiles Sass to CSS
  //   }]
  // };


  const vue = {
    test: /\.vue$/,
    loader: "vue-loader"
  };

  const js = {
    test: /\.js$/,
    loader: "babel-loader",
    exclude: /node_modules/,
    options: {
      presets: ['@babel/preset-env'],
      plugins: ["@babel/plugin-syntax-dynamic-import"]
    }
  };

  const files = {
    test: /\.(png|jpe?g|gif|woff2?)$/i,
    loader: "file-loader",
    options: {
      name: "[hash].[ext]"
    }
  };

  const svg = {
    test: /\.svg$/,
    use: [
      {
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
        }
      },
      "svg-transform-loader",
      {
        loader: "svgo-loader",
        options: {
          plugins: [
            { removeTitle: true },
            {
              removeAttrs: {
                attrs: "(fill|stroke)"
              }
            }
          ]
        }
      }
    ]
  };

  const pug = {
    test: /\.pug$/,
    oneOf: [
      {
        resourceQuery: /^\?vue/,
        use: ["pug-plain-loader"]
      },
      {
        use: ["pug-loader"]
      }
    ]
  };

  const config = {
    entry: {
      main: "./src/main.js"
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[hash].build.js",
      publicPath: isProductionBuild ? publicPath : "",
      chunkFilename: "[chunkhash].js"
    },
    module: {
      rules: [pcss, vue, js, files, svg, pug]
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        images: path.resolve(__dirname, "src/images")
      },
      extensions: ["*", ".js", ".vue", ".json"]
    },
    devServer: {
      historyApiFallback: true,
      noInfo: false,
      open: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.pug",
        chunks: ["main"]
      }),
      new SpriteLoaderPlugin({ plainSprite: true }),
      new VueLoaderPlugin()
    ],
    devtool: "#eval-source-map"
  };

  if (isProductionBuild) {
    config.devtool = "none";
    config.plugins = (config.plugins || []).concat([
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: '"production"'
        }
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[contenthash].css"
      })
    ]);

    config.optimization = {};

    config.optimization.minimizer = [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ];
  }

  return config;
};
