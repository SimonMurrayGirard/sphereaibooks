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
    updateWordCountLabel(language); // Update the word count label
}

function updateWordCountLabel(language) {
    const wordCountResult = document.getElementById('wordCountResult');
    if (wordCountResult) {
        if (language === 'fr') {
            wordCountResult.textContent = 'Nombre de mots: ';
        } else {
            wordCountResult.textContent = 'Word Count: ';
        }
    }
}

function updateFileName() {
    const fileInput = document.getElementById('fileInput');
    const fileChosen = document.getElementById('fileChosen');
    if (fileInput.files.length > 0) {
        fileChosen.textContent = fileInput.files[0].name;
    } else {
        fileChosen.textContent = '';
    }
}
