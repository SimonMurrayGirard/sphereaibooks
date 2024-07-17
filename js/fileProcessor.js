document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fileUploadForm").addEventListener("submit", function(event) {
        event.preventDefault();
        uploadFile();
    });
});

async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
        alert("Please select a file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(event) {
        const content = event.target.result;
        let wordCount = 0;

        if (file.type === "application/pdf") {
            wordCount = await countWordsInPDF(content);
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/msword") {
            wordCount = await countWordsInWord(content);
        } else {
            wordCount = countWordsInText(content);
        }

        document.getElementById("wordCountResult").innerText = `Word Count: ${wordCount}`;
    };

    if (file.type === "application/pdf") {
        reader.readAsArrayBuffer(file);
    } else {
        reader.readAsText(file);
    }
}

function countWordsInText(text) {
    const words = text.trim().split(/\s+/);
    return words.length;
}

async function countWordsInPDF(arrayBuffer) {
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let wordCount = 0;

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const strings = textContent.items.map(item => item.str);
        wordCount += countWordsInText(strings.join(" "));
    }

    return wordCount;
}

async function countWordsInWord(arrayBuffer) {
    const doc = await mammoth.extractRawText({ arrayBuffer });
    return countWordsInText(doc.value);
}
