document.addEventListener('DOMContentLoaded', function () {
  const toys = document.querySelectorAll('.toy');
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  console.log(`Знайдено ${toys.length} іграшок`);

  const minScale = 0.2; // Мінімальний розмір 20% (30px)
  const maxScale = 1.0;
  const baseWidth = 150; // Базова ширина в пікселях

  // Встановлюємо початкову ширину для всіх іграшок
  toys.forEach(toy => {
    toy.style.width = `${baseWidth}px`;
  });

  let lastScrollY = 0;

  function updateScale() {
    // Використовуємо різні способи визначення скролу
    const scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Перевіряємо, чи змінився скрол
    if (scrolled !== lastScrollY) {
      console.log('СКРОЛ ЗМІНИВСЯ!', scrolled);
      lastScrollY = scrolled;
    }
    
    // Розраховуємо висоту документа
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const maxScroll = Math.max(docHeight - windowHeight, 1);

    const progress = Math.min(scrolled / maxScroll, 1);
    const eased = 1 - Math.pow(1 - progress, 2);
    const scale = maxScale - eased * (maxScale - minScale);

    // Оновлюємо індикатор
    if (scrollIndicator) {
      scrollIndicator.textContent = `Scroll: ${scrolled}px | Progress: ${(progress * 100).toFixed(0)}% | Scale: ${(scale * 100).toFixed(0)}%`;
    }

    // Debug інформація (тільки при зміні скролу)
    if (scrolled !== lastScrollY) {
      console.log(`Scrolled: ${scrolled}px, DocHeight: ${docHeight}px, WindowHeight: ${windowHeight}px, MaxScroll: ${maxScroll}px, Progress: ${progress.toFixed(2)}, Scale: ${scale.toFixed(2)}`);
    }

    toys.forEach((toy, index) => {
      // Використовуємо тільки width для зміни розміру
      const newWidth = baseWidth * scale;
      toy.style.width = `${newWidth}px`;
      
      // Прибираємо opacity назад до 1
      toy.style.opacity = '1';
      
      if (scrolled !== lastScrollY) {
        console.log(`Іграшка ${index + 1}: width: ${newWidth}px, scale: ${scale.toFixed(2)}`);
      }
    });
  }

  // Запускаємо постійний моніторинг через setInterval
  setInterval(updateScale, 16); // ~60 FPS
  
  // Початкове оновлення
  updateScale();
});
