document.addEventListener('DOMContentLoaded', () => {
    sortBooks(); // Trier par défaut par date
});

function sortBooks() {
    const bookList = document.querySelector('.book-list');
    const books = Array.from(bookList.querySelectorAll('.book-item'));
    const filter = document.getElementById('filter-select').value;

    books.sort((a, b) => {
        switch (filter) {
            case 'date':
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            case 'author':
                return a.dataset.author.localeCompare(b.dataset.author);
            case 'theme':
                return a.dataset.theme.localeCompare(b.dataset.theme);
            case 'wordCount':
                return a.dataset.wordcount - b.dataset.wordcount;
            default:
                return 0;
        }
    });

    books.forEach(book => bookList.appendChild(book));
}
