document.addEventListener('DOMContentLoaded', () => {
    setLanguage('en'); // Default language
});

function setLanguage(language) {
    document.querySelectorAll('[data-lang-en], [data-lang-fr]').forEach(element => {
        if (element.hasAttribute(`data-lang-${language}`)) {
            element.textContent = element.getAttribute(`data-lang-${language}`);
        }
    });
}