document.addEventListener('DOMContentLoaded', function() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
        const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<img src="sun.png" alt="Светлая тема">';
        } else {
            themeToggle.innerHTML = '<img src="moon.png" alt="Тёмная тема">';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<img src="sun.png" alt="Светлая тема">';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<img src="moon.png" alt="Тёмная тема">';
            }
        });
    }
});