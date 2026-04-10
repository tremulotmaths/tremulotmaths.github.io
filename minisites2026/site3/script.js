// ======== VARIABLES ========
const phrases = [
  "Bonjour",
  "Ne soyez pas surpris cela est tout à fait normal",
  "Initialisation du système...",
  "Veuillez continuer votre chemin afin de tomber…",
  "Amoureux, oui, d'une spécialité",
  "Compilation en cours...",
  "Allons-y, on nous attend",
  "Bienvenue dans la spécialité NSI !",
];

let indexPhrase = 0;
let animationEnCours = false;
let introActive = true;
let contenuComplet = "";
let intervalCourant = null;
let phraseEnCours = "";

const terminal = document.getElementById("terminal");
const textElement = document.getElementById("text");
const mainSite = document.getElementById("main-site");
const keySound = document.getElementById("keySound");

// ======== SON DE FRAPPE COURT ========
function playKeySound() {
  keySound.currentTime = 0;
  keySound.volume = 1;
  const p = keySound.play();
  if (p !== undefined) p.catch(() => {});
  setTimeout(() => { keySound.pause(); }, 200);
}

// ======== FIN DE L'INTRO ========
function terminerIntro() {
  introActive = false;
  sessionStorage.setItem("introVue", "true"); // Mémorise que l'intro a été vue
  document.removeEventListener("click", onInteraction);
  document.removeEventListener("keydown", onInteraction);
  terminal.style.transition = "opacity 1s";
  terminal.style.opacity = "0";
  setTimeout(() => {
    terminal.style.display = "none";
    mainSite.classList.remove("hidden");
  }, 1000);
}

// ======== SKIP ========
function skipPhraseCourante() {
  clearInterval(intervalCourant);
  intervalCourant = null;
  contenuComplet += phraseEnCours + "<br>";
  textElement.innerHTML = contenuComplet + '<span id="cursor">█</span>';
  terminal.scrollTop = terminal.scrollHeight;
  animationEnCours = false;
}

// ======== ÉCRITURE LETTRE PAR LETTRE ========
function afficherLettreParLettre(phrase) {
  animationEnCours = true;
  phraseEnCours = phrase;
  let indexLettre = 0;

  intervalCourant = setInterval(() => {
    textElement.innerHTML =
      contenuComplet +
      phrase.slice(0, indexLettre + 1) +
      '<span id="cursor">█</span>';

    if (phrase[indexLettre] !== " ") playKeySound();
    terminal.scrollTop = terminal.scrollHeight;
    indexLettre++;

    if (indexLettre >= phrase.length) {
      clearInterval(intervalCourant);
      intervalCourant = null;
      contenuComplet += phrase + "<br>";
      textElement.innerHTML = contenuComplet + '<span id="cursor">█</span>';
      animationEnCours = false;
    }
  }, 80);
}

// ======== INTERACTION (clic ou touche) ========
function onInteraction() {
  if (!introActive) return;
  if (animationEnCours) { skipPhraseCourante(); return; }
  if (indexPhrase >= phrases.length) { terminerIntro(); return; }
  afficherLettreParLettre(phrases[indexPhrase]);
  indexPhrase++;
}

// ======== LISTENERS ========
document.addEventListener("click", onInteraction);
document.addEventListener("keydown", onInteraction);

// ======== LANCEMENT AUTO ========
window.addEventListener("load", () => {
  // Si l'intro a déjà été vue pendant cette session, on l'ignore
  if (sessionStorage.getItem("introVue")) {
    terminal.style.display = "none";
    mainSite.classList.remove("hidden");
    return;
  }

  setTimeout(() => {
    afficherLettreParLettre(phrases[indexPhrase]);
    indexPhrase++;
  }, 100);
});