function submitQuiz() {
    let responses = {
        question1: document.querySelector('input[name="question1"]:checked'),
        question2: document.querySelector('input[name="question2"]:checked'),
        question3: document.querySelector('input[name="question3"]:checked')
    };

    if (!responses.question1 || !responses.question2 || !responses.question3) {
        alert("Veuillez répondre à toutes les questions.");
        return;
    }

    let scores = { Python: 0, JavaScript: 0, 'C++': 0 };
    scores[responses.question1.value]++;
    scores[responses.question2.value]++;
    scores[responses.question3.value]++;

    let maxScore = Math.max(scores.Python, scores.JavaScript, scores['C++']);
    let resultLang = Object.keys(scores).find(lang => scores[lang] === maxScore);

    document.getElementById('langage').textContent = resultLang;
    document.getElementById('resultat').style.display = 'block';
}