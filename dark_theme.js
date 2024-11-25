const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Function to apply the theme
function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="bi bi-sun-fill"></i>' // Change icon to sun
        : '<i class="bi bi-moon-stars-fill"></i>'; // Change icon to moon

    // Update button styles based on theme
    const emailButton = document.querySelector('a[href^="mailto:"]');
    const githubButton = document.querySelector('a[href^="https://github.com"]');
    const contactLinks = document.querySelectorAll('#contact a');
    const sendButton = document.querySelector('#contact button[type="submit"]');
    const portfolioImages = document.querySelectorAll('#portfolio img');

    if (theme === 'dark') {
        emailButton.classList.replace('btn-outline-dark', 'btn-outline-light');
        githubButton.classList.replace('btn-outline-dark', 'btn-outline-light');
        contactLinks.forEach(link => link.classList.replace('link-dark', 'link-light'));
        sendButton.classList.replace('btn-dark', 'btn-outline-light');
        portfolioImages.forEach(image => image.style.filter = 'grayscale(100%) brightness(0.9)');
    } else {
        emailButton.classList.replace('btn-outline-light', 'btn-outline-dark');
        githubButton.classList.replace('btn-outline-light', 'btn-outline-dark');
        contactLinks.forEach(link => link.classList.replace('link-light', 'link-dark'));
        sendButton.classList.replace('btn-outline-light', 'btn-dark');
        portfolioImages.forEach(image => image.style.filter = 'none');
    }
}

// Function to detect the system theme
function detectSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Check for saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    const systemTheme = detectSystemTheme();
    applyTheme(systemTheme); // Default to system theme
}

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});
