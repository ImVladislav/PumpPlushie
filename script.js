document.addEventListener('DOMContentLoaded', () => {
    const toys = document.querySelectorAll('.toy');
    const container = document.querySelector('.container');
    
    function updateToyScale() {
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const maxScroll = container.scrollHeight - containerHeight;
        
        // Calculate scale based on scroll position (1.0 to 0.3)
        const scrollProgress = scrollTop / maxScroll;
        const scale = 1 - (scrollProgress * 0.7); // This will go from 1.0 to 0.3
        
        toys.forEach(toy => {
            toy.style.transform = `scale(${Math.max(0.3, scale)})`;
        });
    }

    // Update on container scroll
    container.addEventListener('scroll', updateToyScale);
    
    // Initial update
    updateToyScale();
}); 