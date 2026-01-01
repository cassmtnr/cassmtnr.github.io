// Minimal JS - adds subtle entrance animation
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  requestAnimationFrame(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  });
});
