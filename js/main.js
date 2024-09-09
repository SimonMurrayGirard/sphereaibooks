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
    updateFileInputLabel(language); // Update the file input label
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

function updateFileInputLabel(language) {
    const fileLabel = document.getElementById('file-label');
    if (fileLabel) {
        if (language === 'fr') {
            fileLabel.textContent = 'Téléverser un fichier:';
        } else {
            fileLabel.textContent = 'Upload a file:';
        }
    }
}
