module.exports = {
  plugins: [
    require("postcss-preset-env")({
      // Тут можна налаштувати, які фічі підтримувати
      // Наприклад, для підтримки останніх 2 версій браузерів:
      // browsers: 'last 2 versions',
    }),
  ],
};
