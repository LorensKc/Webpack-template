// Імпортуємо головний SCSS файл, щоб Webpack його обробив
import "../scss/main.scss";

// Приклад простого JS
console.log("JavaScript завантажено!");

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("myButton");
  if (button) {
    button.addEventListener("click", () => {
      alert("Кнопку натиснуто!");
    });
  }
});

// Приклад використання сучасного синтаксису (для Babel)
const greet = (name = "Світ") => {
  console.log(`Привіт, ${name}!`);
};
greet();
