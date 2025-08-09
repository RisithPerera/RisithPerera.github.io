// mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// project filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const filter = btn.getAttribute('data-filter');
        // style active
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-indigo-600','text-white'));
        btn.classList.add('bg-indigo-600','text-white');

        document.querySelectorAll('#projectsGrid .project-card').forEach(card => {
            if (filter === 'all') { card.style.display = 'block'; return; }
            if (card.getAttribute('data-category') === filter) card.style.display = 'block'; else card.style.display = 'none';
        });
    });
});

// set year in footer
document.getElementById('year').textContent = new Date().getFullYear();