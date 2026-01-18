// Theme Management
class ThemeManager {
    constructor() {
        this.theme = this.getInitialTheme();
        this.toggleBtn = document.getElementById('theme-toggle');
        this.init();
    }

    getInitialTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme);

        // Toggle button listener
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();

    // Silly logo animation on click
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            // Don't prevent navigation, just add animation
            logo.classList.remove('animate-jello');
            // Trigger reflow to restart animation
            void logo.offsetWidth;
            logo.classList.add('animate-jello');
        });
    }
});
