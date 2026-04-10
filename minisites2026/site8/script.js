function go(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}
function ouvrirRick() {
    const rick = document.getElementById("rick");
    const video = document.getElementById("rick-video");
    rick.style.display = "block";
    video.play();
}

function fermerRick() {
    const rick = document.getElementById("rick");
    const video = document.getElementById("rick-video");
    rick.style.display = "none";
    video.pause();
    video.currentTime = 0;
}
function ouvrirShrimp() {
    const shrimp = document.getElementById("shrimp");
    const video = document.getElementById("shrimp-video");
    if (shrimp && video) {
        shrimp.style.display = "block";
        video.play();
    }
}

function fermerShrimp() {
    const shrimp = document.getElementById("shrimp");
    const video = document.getElementById("shrimp-video");
    if (shrimp && video) {
        shrimp.style.display = "none";
        video.pause();
        video.currentTime = 0;
    }
}
const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let konamiPos = 0;

document.addEventListener("keydown", (e) => {
    if (e.key === konami[konamiPos]) {
        konamiPos++;
        if (konamiPos === konami.length) {
            ouvrirShrimp();
            konamiPos = 0;
        }
    } else {
        konamiPos = 0;
    }
});
let logoClicks = 0;
const logo = document.querySelector(".logo");
if (logo) {
    logo.addEventListener("click", () => {
        logoClicks++;
        if (logoClicks === 10) {
            logoClicks = 0;
            logo.style.transition = "transform 0.1s";
            let tours = 0;
            const spin = setInterval(() => {
                tours++;
                logo.style.transform = `rotate(${tours * 36}deg)`;
                if (tours >= 20) {
                    clearInterval(spin);
                    logo.style.transform = "rotate(0deg)";
                    alert("Bien joué ! Vous avez trouvé l'easter egg ! 🐧");
                }
            }, 50);
        }
    });
}
const btnFuir = document.querySelector(".btn-decouvrir");
if (btnFuir) {
    btnFuir.addEventListener("mouseenter", () => {
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 200;
        btnFuir.style.transition = "transform 0.3s";
        btnFuir.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(() => {
            btnFuir.style.transform = "translate(0, 0)";
        }, 5000);
    });
}
const yeux = document.createElement("div");
yeux.id = "yeux-container";
yeux.innerHTML = `
    <div class="oeil"><div class="pupille" id="pupille-gauche"></div></div>
    <div class="oeil"><div class="pupille" id="pupille-droite"></div></div>
`;
document.body.appendChild(yeux);

document.addEventListener("mousemove", (e) => {
    ["pupille-gauche", "pupille-droite"].forEach(id => {
        const pupille = document.getElementById(id);
        const oeil = pupille.parentElement;
        const rect = oeil.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dx = Math.cos(angle) * 6;
        const dy = Math.sin(angle) * 6;
        pupille.style.transform = `translate(${dx}px, ${dy}px)`;
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const ecran = document.createElement("div");
        ecran.id = "faux-chargement";
        const logs = [
            "Initialisation du système...",
            "Vérification de Python 3.12... OK",
            "Téléchargement de Python 4.0... ██████░░ 75%",
            "Suppression de Windows... OK ✓",
            "Installation de Linux... ██████████ 100%",
            "Remplacement de Internet Explorer... OK ✓",
            "Chargement de vim... (appuie sur :q pour quitter)",
            "Impossible de quitter vim. Abandon.",
            "Formatage du disque dur... ",
            "✅ Mise à jour terminée. Redémarrage dans 3s..."
        ];
        ecran.innerHTML = `
            <p id="log-titre">🖥️ MISE À JOUR SYSTÈME EN COURS</p>
            <div id="log-zone"></div>
            <div id="barre-fond"><div id="barre-prog"></div></div>
        `;
        document.body.appendChild(ecran);
        const logZone = document.getElementById("log-zone");
        const barre = document.getElementById("barre-prog");
        let i = 0;
        const afficherLog = setInterval(() => {
            if (i < logs.length) {
                const ligne = document.createElement("p");
                ligne.textContent = "> " + logs[i];
                logZone.appendChild(ligne);
                barre.style.width = `${((i + 1) / logs.length) * 100}%`;
                i++;
            } else {
                clearInterval(afficherLog);
                setTimeout(() => ecran.remove(), 2000);
            }
        }, 700);
    }
});

let sequence = "";
const motMagique = "nsi";

document.addEventListener("keydown", (e) => {
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        sequence += e.key.toLowerCase();
        if (sequence.length > motMagique.length) {
            sequence = sequence.slice(-motMagique.length);
        }
        if (sequence === motMagique) {
            const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, a, span");
            const couleursOriginales = [];
            elements.forEach((el) => {
                couleursOriginales.push(el.style.color || "");
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                el.style.color = `rgb(${r},${g},${b})`;
            });
            setTimeout(() => {
                elements.forEach((el, index) => {
                    if (couleursOriginales[index]) {
                        el.style.color = couleursOriginales[index];
                    } else {
                        el.style.color = ""; 
                    }
                });
            }, 5000);
            sequence = "";
        }
    } else {
        sequence = "";
    }
});

let frappeMiaou = "";

document.addEventListener("keydown", function(e) {
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        frappeMiaou += e.key.toLowerCase();
        if (frappeMiaou.length > 5) {
            frappeMiaou = frappeMiaou.slice(-5);
        }
        if (frappeMiaou === "miaou") {
            ouvrirNyan();
            frappeMiaou = "";
        }
    } else {
        frappeMiaou = "";
    }
});

function ouvrirNyan() {
    const nyan = document.getElementById("nyan");
    const video = document.getElementById("nyan-video");
    nyan.style.display = "block";
    video.play();
}

function fermerNyan() {
    const nyan = document.getElementById("nyan");
    const video = document.getElementById("nyan-video");
    nyan.style.display = "none";
    video.pause();
    video.currentTime = 0;
}
