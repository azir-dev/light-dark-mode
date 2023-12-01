import "./style.css";
const switchBar = document.querySelector("input[type=checkbox]");
const header = document.querySelector("header");
const toggleIcon = document.querySelector(".toggle-icon");
const images = document.querySelectorAll("img");
const textBox = document.querySelector(".text-box");

/**
 * 需要手动修改的内容
 */
function switchElementAttrs(isDark) {
  // 头部导航栏的背景
  header.style.backgroundColor = isDark
    ? "rgba(0, 0, 0, 0.5)"
    : "rgba(255, 255, 255, 0.5)";

  // 引导 icon 修改
  toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");

  // 不同模式下的图片 src
  images[0].src = `./img/undraw_proud_coder_${isDark ? "dark" : "light"}.svg`;
  images[1].src = `./img/undraw_feeling_proud_${isDark ? "dark" : "light"}.svg`;
  images[2].src = `./img/undraw_conceptual_idea_${
    isDark ? "dark" : "light"
  }.svg`;

  // 文本容器的背景
  textBox.style.backgroundColor = isDark
    ? "rgba(255, 255, 255, 0.5)"
    : "rgba(0, 0, 0, 0.5)";
}

/**
 * @param {Boolean} isDark
 */
function switchTheme(isDark) {
  // 以 data-* 存储和切换显示模式
  document.documentElement.dataset.theme = isDark ? "dark" : "light";

  switchElementAttrs(isDark);
  // 将当前模式存储在本地
  localStorage.setItem("theme", document.documentElement.dataset.theme);
}

// /**
//  *
//  * @param {Event} event
//  */
// function checkChangeHandle(event) {
//   const isDark = event.target.checked;
//   switchTheme(isDark);
// }

// 给 switchBar 添加监听被修改事件
switchBar.addEventListener("change", (event) => {
  const isDark = event.target.checked;
  switchTheme(isDark);
});

// 加载完成后查询本地存储
window.onload = () => {
  const theme = localStorage.getItem("theme");
  const isDark = theme === "dark";
  // 根据本地存储，手动初始化 switchBar
  switchBar.checked = isDark;
  // 仅在本地存储暗黑模式是调用切换显示主题
  isDark && switchTheme(isDark);
};
