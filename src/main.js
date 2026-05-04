// Minimal JS - adds subtle entrance animation
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  requestAnimationFrame(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  });

  const logo = document.querySelector(".logo");
  const reflection = document.getElementById("reflection");
  if (!logo || !reflection) return;

  const viewBox = logo.viewBox.baseVal;
  let targetX = viewBox.width / 2;
  let targetY = viewBox.height / 2;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = null;

  const tick = () => {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    reflection.setAttribute("cx", currentX);
    reflection.setAttribute("cy", currentY);
    if (
      Math.abs(targetX - currentX) > 0.5 ||
      Math.abs(targetY - currentY) > 0.5
    ) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  };

  logo.addEventListener("pointermove", (e) => {
    const rect = logo.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width) * viewBox.width;
    targetY = ((e.clientY - rect.top) / rect.height) * viewBox.height;
    if (rafId === null) rafId = requestAnimationFrame(tick);
  });
});
