document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.footer-filter').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');        
            localStorage.setItem('selectedFilter', filter);
            window.location.href = 'index.html';
        });
    });
});