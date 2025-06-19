// Typing Speed Tester Script

const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "The pen is mightier than the sword."
];

let timer;
let startTime;
let mistakes = 0;
let totalWords;

function getRandomParagraph() {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function startTyping() {
    const inputText = document.getElementById("inputText").value;
    const paragraphText = document.getElementById("paragraph").innerText;

    if (!timer) {
        startTime = new Date();
        timer = setInterval(updateResults, 1000);
    }

    mistakes = 0;
    const inputWords = inputText.split(" ");
    const paragraphWords = paragraphText.split(" ");

    inputWords.forEach((word, index) => {
        if (word !== paragraphWords[index]) {
            mistakes++;
        }
    });

    totalWords = paragraphWords.length;
}

function updateResults() {
    const elapsedTime = (new Date() - startTime) / 1000 / 60; // in minutes
    const inputText = document.getElementById("inputText").value;
    const wordsTyped = inputText.split(" ").length;
    const wpm = Math.round(wordsTyped / elapsedTime);
    const accuracy = Math.round(((totalWords - mistakes) / totalWords) * 100);

    document.getElementById("results").innerHTML = `
        <p>Words Per Minute (WPM): ${wpm}</p>
        <p>Accuracy: ${accuracy}%</p>
        <p>Mistakes: ${mistakes}</p>
    `;
}

function resetTest() {
    clearInterval(timer);
    timer = null;
    document.getElementById("inputText").value = "";
    document.getElementById("results").innerHTML = "";
    document.getElementById("paragraph").innerText = getRandomParagraph();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("paragraph").innerText = getRandomParagraph();
    document.getElementById("inputText").addEventListener("input", startTyping);
    document.getElementById("resetButton").addEventListener("click", resetTest);
});
