document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".scroll-button");

  const baseScale = 1;
  const maxScale = 2;
  const baseTop = 20; // vh
  const maxTop = 60; // vh

  function updateButtonOnScroll() {
    const scrolled =
      window.pageYOffset || document.documentElement.scrollTop || 0;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const maxScroll = Math.max(docHeight - windowHeight, 1);

    const progress = Math.min(scrolled / maxScroll, 1);
    const eased = 1 - Math.pow(1 - progress, 2); // плавна функція

    if (scrollBtn) {
      const scale = baseScale + (maxScale - baseScale) * eased;
      const top = baseTop + (maxTop - baseTop) * eased;

      scrollBtn.style.transform = `translateX(-50%) scale(${scale})`;
      scrollBtn.style.top = `${top}vh`;
    }
  }

  setInterval(updateButtonOnScroll, 16); // ~60 FPS
  updateButtonOnScroll();
});
