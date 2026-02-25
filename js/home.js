document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname;
  if (
    path === "/" ||
    path.endsWith("/index.html") ||
    path.match(/\/index\.[a-z]{2}\/?$/)
  ) {
    document.body.classList.add("is-home");
  }
});