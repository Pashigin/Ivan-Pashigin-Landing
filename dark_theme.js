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
    const profileImage = document.getElementById('profileImage');

    if (theme === 'dark') {
        emailButton.classList.replace('btn-outline-dark', 'btn-outline-light');
        githubButton.classList.replace('btn-outline-dark', 'btn-outline-light');
        contactLinks.forEach(link => link.classList.replace('link-dark', 'link-light'));
        sendButton.classList.replace('btn-dark', 'btn-outline-light');
        profileImage.style.filter = 'brightness(0.8)';
    } else {
        emailButton.classList.replace('btn-outline-light', 'btn-outline-dark');
        githubButton.classList.replace('btn-outline-light', 'btn-outline-dark');
        contactLinks.forEach(link => link.classList.replace('link-light', 'link-dark'));
        sendButton.classList.replace('btn-outline-light', 'btn-dark');
        portfolioImages.forEach(image => image.style.filter = 'none');
        profileImage.style.filter = 'brightness(1)';
    }
}

// Function to detect the system theme
function detectSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Check for saved theme on page load
const savedTheme = localStorage.getItem('theme') || detectSystemTheme();
applyTheme(savedTheme);


// Theme toggle event
themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});
