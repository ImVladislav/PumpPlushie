document.addEventListener('DOMContentLoaded', function () {
  const toys = document.querySelectorAll('.toy');
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  console.log(`Знайдено ${toys.length} іграшок`);

  const maxScale = 1.0;
  
  // Базові розміри для кожної іграшки у відсотках
  const baseWidths = [4, 16.5, 16, 12, 8.4]; // toy-1, toy-2, toy-3, toy-4, toy-5
  
  // Мінімальний розмір - розмір toy-1 (4%)
  const minSizePercent = 4;

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

    // Оновлюємо індикатор
    if (scrollIndicator) {
      scrollIndicator.textContent = `Scroll: ${scrolled}px | Progress: ${(progress * 100).toFixed(0)}%`;
    }

    // Debug інформація (тільки при зміні скролу)
    if (scrolled !== lastScrollY) {
      console.log(`Scrolled: ${scrolled}px, DocHeight: ${docHeight}px, WindowHeight: ${windowHeight}px, MaxScroll: ${maxScroll}px, Progress: ${progress.toFixed(2)}`);
    }

    toys.forEach((toy, index) => {
      const baseWidthPercent = baseWidths[index];
      
      // Розраховуємо новий розмір з обмеженням
      let newWidthPercent;
      
      if (baseWidthPercent <= minSizePercent) {
        // Якщо базова ширина вже менша або дорівнює мінімальній, не зменшуємо
        newWidthPercent = baseWidthPercent;
      } else {
        // Розраховуємо зменшення, але не менше мінімального розміру
        const scale = maxScale - eased * (maxScale - (minSizePercent / baseWidthPercent));
        newWidthPercent = Math.max(baseWidthPercent * scale, minSizePercent);
      }
      
      toy.style.width = `${newWidthPercent}%`;
      
      // Прибираємо opacity назад до 1
      toy.style.opacity = '1';
      
      if (scrolled !== lastScrollY) {
        console.log(`Іграшка ${index + 1}: width: ${newWidthPercent}%, original: ${baseWidthPercent}%`);
      }
    });
  }

  // Запускаємо постійний моніторинг через setInterval
  setInterval(updateScale, 16); // ~60 FPS
  
  // Початкове оновлення
  updateScale();
});
