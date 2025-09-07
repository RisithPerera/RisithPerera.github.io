

document.querySelectorAll('.project-card').forEach(card => {
    const folder = card.dataset.folder; // folder path
    // Example: you can fetch image list via server API or hardcode temporarily
    // For demo, list files manually (replace with dynamic API for real)
    fetch(`${folder}/images.json`) // this JSON contains ["img1.jpg","img2.jpg",...]
        .then(res => res.json())
        .then(images => {
            if (!images.length) return;

            // --- CAROUSEL ---
            const carouselContainer = card.querySelector('.carousel-container');
            const dotsContainer = card.querySelector('.carousel-dots');

            // Pick 3 random images for carousel
            const shuffled = images.sort(() => 0.5 - Math.random());
            const carouselImages = shuffled.slice(0, 3);

            let current = 0;
            const dots = [];

            carouselImages.forEach((imgFile, idx) => {
                const img = document.createElement('img');
                img.src = `${folder}/${imgFile}`;
                img.className = "w-full flex-shrink-0 h-48 md:h-64 object-cover rounded-lg";
                carouselContainer.appendChild(img);

                // dots
                const dot = document.createElement('span');
                dot.className = 'dot w-2 h-2 bg-gray-400 rounded-full cursor-pointer';
                dot.addEventListener('click', () => { current = idx; updateCarousel(); });
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });

            function updateCarousel() {
                carouselContainer.style.transform = `translateX(-${current * 100}%)`;
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('bg-gray-800', idx === current);
                    dot.classList.toggle('bg-gray-400', idx !== current);
                });
            }

            function nextSlide() {
                current = (current + 1) % carouselImages.length;
                updateCarousel();
            }

            setInterval(nextSlide, 3000);
            updateCarousel();

            // --- VIEW PHOTOS (GLightbox) ---
            const viewBtn = card.querySelector('.view-photos-btn');
            viewBtn.addEventListener('click', () => {
                const lightbox = GLightbox({
                    elements: images.map(file => ({
                        href: `${folder}/${file}`,
                        type: 'image',
                    })),
                    loop: true,
                    zoomable: true,
                    draggable: true,
                });
                lightbox.open();
            });
        })
        .catch(err => console.error("Could not load images:", err));
});
