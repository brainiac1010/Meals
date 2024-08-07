function generateQuote() {
    fetch('https://api.kanye.rest/')
        .then(response => response.json())
        .then(data => showQuote(data));
}

function showQuote(data) {
    const quoteBox = document.getElementById('qts-box');
    const newQuote = data.quote;
    console.log(newQuote);

    const quoteElement = document.createElement('p');
    quoteElement.innerText = `${newQuote}`;
    quoteBox.innerHTML = '';
    quoteBox.appendChild(quoteElement);
} 