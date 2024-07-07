document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        const browserLanguage = navigator.language || navigator.userLanguage;
        if (browserLanguage.startsWith('fr')) {
            setLanguage('fr');
        } else {
            setLanguage('en');
        }
    }
});

function setLanguage(language) {
    document.querySelectorAll('[data-lang-en], [data-lang-fr]').forEach(element => {
        if (element.hasAttribute(`data-lang-${language}`)) {
            element.textContent = element.getAttribute(`data-lang-${language}`);
        }
    });
    localStorage.setItem('language', language); // Save preference to localStorage
}
