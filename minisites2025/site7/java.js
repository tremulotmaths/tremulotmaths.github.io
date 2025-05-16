function submitQuiz() {
  let score = 0;

  // Vérification des réponses
  if (document.querySelector('input[name="q1"]:checked')?.value === "B") {
    score++;
  }
  if (document.querySelector('input[name="q2"]:checked')?.value === "C") {
    score++;
  }
  if (document.querySelector('input[name="q3"]:checked')?.value === "A") {
    score++;
  }

  // Affichage du score
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `Votre score est : ${score}/3`;
}