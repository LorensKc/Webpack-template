const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/js/index.js", // Головний JS файл
  output: {
    filename: "js/bundle.js", // Назва вихідного JS файлу
    path: path.resolve(__dirname, "dist"), // Папка для збірки
    clean: true, // Очищати папку dist перед кожною збіркою (Webpack 5+)
    //publicPath: isProduction ? "./" : "/", // Важливо для devServer та шляхів до ресурсів
    publicPath: "./",
  },
  devtool: isProduction ? "source-map" : "eval-source-map", // Source maps для дебагу
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Звідки сервірувати файли
    },
    compress: true,
    port: 9000,
    open: true, // Автоматично відкривати браузер
    hot: true, // Hot Module Replacement
    watchFiles: ["src/**/*.html", "src/**/*.scss", "src/**/*.js"], // Стежити за змінами
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Витягує CSS в окремий файл
          "css-loader", // 2. Інтерпретує @import, url()
          {
            loader: "postcss-loader", // 1.5 (опціонально) Обробляє CSS за допомогою PostCSS
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
          "sass-loader", // 1. Компілює Sass/SCSS в CSS
        ],
      },
      {
        test: /\.html$/, // Для обробки HTML файлів, якщо потрібно (наприклад, для image src)
        use: ["html-loader"], // Може бути корисним для завантаження ресурсів, на які посилається HTML
      },
      // Можна додати завантажувачі для зображень, шрифтів
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'images/[hash][ext][query]'
      //   }
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'fonts/[hash][ext][query]'
      //   }
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Шлях HTML шаблону
      filename: "index.html", // Назва вихідного HTML файлу
      inject: "body", // Куди вставляти скрипти ('body', 'head', true, false)
      minify: false, // Не мініфікувати
      // minify: isProduction ? {
      //       removeComments: false, // Зберігати коментарі
      //       collapseWhitespace: false, // Не згортати пробіли
      //       removeAttributeQuotes: false, // Не видаляти лапки з атрибутів
      //     } : false, // Не мініфікувати для development
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css", // Назва вихідного CSS файлу
    }),
  ],
  optimization: {
    minimize: isProduction ? true : false, // Вмикання-Вимикання
    // minimize: false, // Вимикання
    minimizer: [
      (compiler) => {
        const TersePlugin = require("terser-webpack-plugin");
        new TersePlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction, // Вимикає console.log
            },
            mangle: isProduction, // Плутає назви змінних
            format: {
              comments: !isProduction, // Зберігання коментарів
              beautify: !isProduction, // Читбельний JS
            },
          },
          extractComments: false, // Не витягувати коменти в окремий файл
        }).apply(compiler);
      },
      // Для CSS
      // const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
      // new CssMinimizerPlugin({
      //   minimizerOptions: {
      //     preset: [
      //       "default",
      //       {
      //         discardComments: { removeAll: !isProduction },
      //       },
      //     ],
      //   },
      // }),
    ],
  },
};
