;/* ==========================================================================
   SCRIPT JAVASCRIPT POUR LE MINI-SITE NSI
   ==========================================================================
   Auteur: Projet NSI
   Description: Ce fichier contient toutes les fonctionnalités interactives du site:
                - Animations d'apparition au défilement
                - Horloge analogique et digitale
                - Système de compteur d'Easter Eggs avec localStorage
                - 7 Easter Eggs différents
                - Système de récompense finale
                - Changement de thème aléatoire (persistante entre les pages)
                - Mode RGB
                - Exercices interactifs Python et Web
*/

/* ==========================================================================
   1. VARIABLES GLOBALES
   ========================================================================== */
// Compteur d'Easter Eggs trouvés
let easterEggsFound = 0;
const totalEasterEggs = 7;

// État du thème
let currentTheme = 'dark';
let rgbInterval = null;

// Tableau pour stocker les Easter Eggs découverts
let discoveredEasterEggs = [];

// Variable pour l'objet audio en cours (pour pouvoir l'arrêter)
let currentAudio = null;

/* ==========================================================================
   2. FONCTIONS DE STOCKAGE LOCALSTORAGE
   ========================================================================== */
/**
 * Sauvegarde les Easter Eggs découverts dans le localStorage
 * Cette fonction permet de persister la progression entre les pages
 */
function saveEasterEggsToStorage() {
    localStorage.setItem('nsi_easter_eggs', JSON.stringify(discoveredEasterEggs));
    localStorage.setItem('nsi_easter_eggs_count', easterEggsFound.toString());
}

/**
 * Charge les Easter Eggs depuis le localStorage
 * Cette fonction restaure la progression lors du chargement d'une page
 */
function loadEasterEggsFromStorage() {
    const saved = localStorage.getItem('nsi_easter_eggs');
    const count = localStorage.getItem('nsi_easter_eggs_count');
    
    if (saved) {
        discoveredEasterEggs = JSON.parse(saved);
        easterEggsFound = parseInt(count) || 0;
    }
}

/**
 * Sauvegarde le thème actuel dans le localStorage
 * Cette fonction permet de persister le thème entre les pages
 */
function saveThemeToStorage() {
    localStorage.setItem('nsi_theme', currentTheme);
    
    // Sauvegarder aussi les couleurs du thème aléatoire si nécessaire
    if (currentTheme === 'random') {
        const primary = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
        const secondary = getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary').trim();
        const bgPrimary = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim();
        const bgSecondary = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim();
        const bgCard = getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim();
        
        localStorage.setItem('nsi_theme_colors', JSON.stringify({
            primary: primary,
            secondary: secondary,
            bgPrimary: bgPrimary,
            bgSecondary: bgSecondary,
            bgCard: bgCard
        }));
    }
}

/**
 * Charge le thème depuis le localStorage et l'applique
 * Cette fonction est appelée au démarrage pour restaurer le thème
 */
function loadThemeFromStorage() {
    const saved = localStorage.getItem('nsi_theme');
    if (saved) {
        currentTheme = saved;
        if (saved === 'rgb') {
            toggleRGBMode();
        } else if (saved === 'random') {
            // Appliquer les couleurs sauvegardées du thème aléatoire
            const colors = JSON.parse(localStorage.getItem('nsi_theme_colors'));
            if (colors) {
                document.documentElement.style.setProperty('--accent-primary', colors.primary);
                document.documentElement.style.setProperty('--accent-secondary', colors.secondary);
                document.documentElement.style.setProperty('--bg-primary', colors.bgPrimary);
                document.documentElement.style.setProperty('--bg-secondary', colors.bgSecondary);
                document.documentElement.style.setProperty('--bg-card', colors.bgCard);
            }
        }
    }
}

/* ==========================================================================
   3. ANIMATIONS D'APPARITION - Effets au défilement
   ========================================================================== */
/**
 * Initialise les animations d'apparition lors du défilement
 * Cette fonction observe les éléments avec les classes d'animation
 * et les fait apparaître quand ils rentrent dans le viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* ==========================================================================
   4. HORLOGE - Affichage de l'heure
   ========================================================================== */
/**
 * Initialise et met à jour l'horloge analogique
 * L'horloge affiche l'heure actuelle et se met à jour chaque seconde
 */
function initClock() {
    const clockElement = document.querySelector('.clock');
    if (!clockElement) return;
    
    const hourHand = clockElement.querySelector('.hour-hand');
    const minuteHand = clockElement.querySelector('.minute-hand');
    const secondHand = clockElement.querySelector('.second-hand');
    
    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        const hourAngle = (hours * 30) + (minutes * 0.5);
        const minuteAngle = minutes * 6;
        const secondAngle = seconds * 6;
        
        if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
        if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        if (secondHand) secondHand.style.transform = `rotate(${secondAngle}deg)`;
        
        const digitalClock = document.querySelector('.digital-clock');
        if (digitalClock) {
            const timeString = now.toLocaleTimeString('fr-FR');
            digitalClock.textContent = timeString;
        }
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

/**
 * Gestionnaire du double-clic sur l'horloge
 * Déclenche l'effet Dio Time Stop (Easter Egg 7)
 */
function initClockDoubleClick() {
    const clockContainer = document.querySelector('.clock-container');
    if (!clockContainer) return;
    
    clockContainer.addEventListener('dblclick', () => {
        playClockSound(); // Joue le son
        playDioEffect();   // Joue l'effet visuel
        discoverEasterEgg(7, 'Dio Time Stop');
    });
}

/**
 * Joue le son de l'horloge (Easter Egg 7)
 * Utilise le fichier audio fourni par l'utilisateur
 */
function playClockSound() {
    // Arrêter tout audio en cours avant de jouer un nouveau
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    currentAudio = new Audio('Stop Time Sound.mp3');
    currentAudio.volume = 0.8;
    currentAudio.play().catch(e => console.log('Audio non disponible:', e));
}

/**
 * Joue l'effet visuel Dio "Time Stop" avec la vidéo
 * Étape 1: Affiche l'animation "THE WORLD"
 * Étape 2: Joue la vidéo "Time stop.mp4" ensuite
 */
function playDioEffect() {
    // Créer l'overlay pour l'animation "THE WORLD"
    const dioOverlay = document.createElement('div');
    dioOverlay.className = 'dio-effect';
    dioOverlay.innerHTML = '<div class="dio-text">THE WORLD!</div>';
    document.body.appendChild(dioOverlay);
    
    // Afficher l'animation après un court délai
    setTimeout(() => {
        dioOverlay.style.display = 'block';
    }, 100);
    
    // Masquer l'animation après 3 secondes et jouer la vidéo
    setTimeout(() => {
        dioOverlay.style.display = 'none';
        
        // Supprimer l'overlay après l'animation
        setTimeout(() => {
            dioOverlay.remove();
        }, 500);
        
        // Jouer la vidéo Time Stop.mp4
        const videoModal = document.getElementById('video-modal');
        const dioVideo = document.getElementById('dio-video');
        
        if (dioVideo && videoModal) {
            // Masquer d'abord toutes les vidéos
            const allVideos = videoModal.querySelectorAll('video');
            allVideos.forEach(v => v.classList.remove('active'));
            
            videoModal.classList.add('active');
            dioVideo.classList.add('active');
            dioVideo.play();
        }
    }, 3000);
}

/* ==========================================================================
   5. COMPTEUR D'EASTER EGGS - Suivi des découvertes
   ========================================================================== */
/**
 * Marque un Easter Egg comme découvert
 * Sauvegarde automatiquement dans le localStorage
 */
function discoverEasterEgg(id, name) {
    if (discoveredEasterEggs.includes(id)) return;
    
    discoveredEasterEggs.push(id);
    easterEggsFound++;
    
    // Sauvegarder dans le localStorage
    saveEasterEggsToStorage();
    
    updateEasterEggCounter();
    showNotification(`🎉 Easter Egg trouvé: ${name}!`);
    
    if (easterEggsFound === totalEasterEggs) {
        showRewardButton();
    }
}

/**
 * Met à jour l'affichage du compteur d'Easter Eggs
 */
function updateEasterEggCounter() {
    const counterElement = document.getElementById('egg-counter');
    if (counterElement) {
        counterElement.textContent = `${easterEggsFound}/${totalEasterEggs}`;
    }
}

/**
 * Affiche le bouton de récompense quand tous les Easter Eggs sont trouvés
 */
function showRewardButton() {
    const rewardButton = document.getElementById('reward-button');
    if (rewardButton) {
        rewardButton.style.display = 'block';
        rewardButton.classList.add('visible');
    }
    showNotification('🏆 Félicitations! Vous avez trouvé tous les Easter Eggs!');
}

/**
 * Affiche une notification temporaire
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-glow));
        color: white;
        padding: 15px 30px;
        border-radius: 30px;
        z-index: 5000;
        animation: fadeInDown 0.5s ease-out;
        box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/* ==========================================================================
   6. EASTER EGG 1 - Changement de thème aléatoire
   ========================================================================== */
/**
 * Génère une palette de couleurs aléatoire
 * Chaque clic génère un nouveau thème avec des couleurs aléatoires
 */
function generateRandomPalette() {
    const hues = [];
    for (let i = 0; i < 5; i++) {
        hues.push(Math.floor(Math.random() * 360));
    }
    return hues;
}

/**
 * Applique une palette de couleurs aléatoire au thème
 */
function applyRandomPalette() {
    const palette = generateRandomPalette();
    
    // Couleur principale
    const primary = `hsl(${palette[0]}, 70%, 60%)`;
    const secondary = `hsl(${palette[1]}, 60%, 40%)`;
    const bgPrimary = `hsl(${palette[2]}, 30%, 10%)`;
    const bgSecondary = `hsl(${palette[3]}, 30%, 15%)`;
    const bgCard = `hsl(${palette[4]}, 30%, 20%)`;
    
    // Appliquer les variables CSS
    document.documentElement.style.setProperty('--accent-primary', primary);
    document.documentElement.style.setProperty('--accent-secondary', secondary);
    document.documentElement.style.setProperty('--bg-primary', bgPrimary);
    document.documentElement.style.setProperty('--bg-secondary', bgSecondary);
    document.documentElement.style.setProperty('--bg-card', bgCard);
}

/**
 * Initialise le bouton de changement de thème
 * Le thème est maintenant sauvegardé et persiste entre les pages
 */
function initThemeButton() {
    const themeButton = document.getElementById('theme-button');
    if (!themeButton) return;
    
    // Gestionnaire de clic simple - thème aléatoire
    themeButton.addEventListener('click', () => {
        applyRandomPalette();
        currentTheme = 'random'; // Marque comme thème personnalisé
        saveThemeToStorage();
        discoverEasterEgg(1, 'Thème aléatoire');
    });
    
    // Gestionnaire de clic molette - mode RGB
    themeButton.addEventListener('auxclick', (e) => {
        if (e.button === 1) {
            toggleRGBMode();
            saveThemeToStorage();
            discoverEasterEgg(1, 'Mode RGB');
        }
    });
}

/**
 * Active ou désactive le mode RGB
 */
function toggleRGBMode() {
    const body = document.body;
    
    if (rgbInterval) {
        clearInterval(rgbInterval);
        rgbInterval = null;
        body.removeAttribute('data-theme');
        currentTheme = 'dark';
    } else {
        let hue = 0;
        rgbInterval = setInterval(() => {
            document.documentElement.style.setProperty('--rgb-hue', hue);
            hue = (hue + 5) % 360;
        }, 50);
        body.setAttribute('data-theme', 'rgb');
        currentTheme = 'rgb';
    }
}

/* ==========================================================================
   7. EASTER EGG 2 - Cat Bounce
   ========================================================================== */
function initCatBounce() {
    const catButton = document.getElementById('cat-bounce-button');
    if (!catButton) return;
    
    catButton.addEventListener('click', () => {
        window.open('https://cat-bounce.com/', '_blank');
        discoverEasterEgg(2, 'Cat Bounce');
    });
}

/* ==========================================================================
   8. ŒUF SECRET - Demande le mot "CAT" et redirige vers cat-bounce.com
   ========================================================================== */
/**
 * Initialise l'œuf secret qui demande le mot "CAT"
 * - Si le mot est "CAT": redirige vers cat-bounce.com
 * - Sinon: l'œuf disparaît
 */
function initSecretEgg() {
    const secretEgg = document.getElementById('secret-egg');
    if (!secretEgg) return;
    
    secretEgg.addEventListener('click', () => {
        const userInput = prompt('Tapez le mot secret:');
        
        // Vérifier si la réponse est correcte (insensible à la casse)
        if (userInput && userInput.toUpperCase() === 'CAT') {
            // Mot correct: redirige vers cat-bounce.com
            window.open('https://cat-bounce.com/', '_blank');
            discoverEasterEgg(8, 'Cat Bounce');
        } else {
            // Mot incorrect: l'œuf disparaît
            secretEgg.classList.add('hidden');
        }
    });
}

/* ==========================================================================
   9. EASTER EGG 3 - Son "OH PINAISE"
   ========================================================================== */
function initOhPinaiseSound() {
    const ohPinaiseText = document.getElementById('oh-pinaise');
    if (!ohPinaiseText) return;
    
    ohPinaiseText.addEventListener('click', () => {
        playOhPinaiseSound();
        discoverEasterEgg(3, 'OH PINAISE!');
    });
}

function playOhPinaiseSound() {
    const audio = new Audio('pinaise_homer_simpson.mp3');
    audio.volume = 0.7;
    audio.play().catch(e => console.log('Audio non disponible:', e));
}

/* ==========================================================================
   10. EASTER EGG 4 - Vidéo cachée "Anas"
   ========================================================================== */
function initAnasVideo() {
    const anasTrigger = document.getElementById('anas-trigger');
    const anasLink = document.getElementById('anas-link');
    
    // Fonction pour jouer la vidéo et le son Anas
    function playAnasContent() {
        showVideoModal('anas-video');
        playAnasSound();
        discoverEasterEgg(4, 'Vidéo Anas (Rodrigo)');
    }
    
    if (anasTrigger) {
        anasTrigger.addEventListener('click', playAnasContent);
    }
    
    if (anasLink) {
        anasLink.addEventListener('click', playAnasContent);
    }
}

/**
 * Joue le son "Anas Sound.mp3"
 */
function playAnasSound() {
    // Arrêter tout audio en cours avant de jouer un nouveau
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    currentAudio = new Audio('Anas Sound.mp3');
    currentAudio.volume = 0.8;
    currentAudio.play().catch(e => console.log('Audio non disponible:', e));
}

function showVideoModal(videoId) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById(videoId);
    
    // Masquer toutes les vidéos d'abord
    const allVideos = modal.querySelectorAll('video');
    allVideos.forEach(v => v.classList.remove('active'));
    
    if (modal && video) {
        modal.classList.add('active');
        video.classList.add('active'); // Ajouter la classe active à la vidéo
        video.play();
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.classList.remove('active');
        const videos = modal.querySelectorAll('video');
        videos.forEach(v => {
            v.pause();
            v.currentTime = 0;
        });
    }
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

window.addEventListener('beforeunload', function() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
});

/* ==========================================================================
   11. EASTER EGG 5 - Particules "Piou Piou"
   ========================================================================== */
function initPiouPiouParticles() {
    const piouPiouText = document.getElementById('piou-piou');
    if (!piouPiouText) return;
    
    piouPiouText.addEventListener('click', (e) => {
        createParticles(e.clientX, e.clientY);
        discoverEasterEgg(5, 'Piou Piou!');
    });
}

function createParticles(x, y) {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);
    
    const colors = ['#e94560', '#533483', '#0f3460', '#ffd700', '#00ff00'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(particle);
    }
    
    setTimeout(() => {
        container.remove();
    }, 1000);
}

/* ==========================================================================
   12. EASTER EGG 6 - Code Konami
   ========================================================================== */
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let currentPosition = 0;
    
    // Gestionnaire pour les touches du clavier
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[currentPosition]) {
            currentPosition++;
            
            if (currentPosition === konamiCode.length) {
                triggerKonamiEffect();
                discoverEasterEgg(6, 'Code Konami');
                currentPosition = 0;
            }
        } else {
            currentPosition = 0;
        }
    });
    
    // Gestionnaire pour les boutons cliquables
    const konamiButtons = document.querySelectorAll('.konami-key');
    konamiButtons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-key');
            if (key === konamiCode[currentPosition]) {
                currentPosition++;
                
                // Effet visuel sur le bouton cliqué
                button.style.background = '#e94560';
                setTimeout(() => {
                    button.style.background = '#333';
                }, 200);
                
                if (currentPosition === konamiCode.length) {
                    triggerKonamiEffect();
                    discoverEasterEgg(6, 'Code Konami');
                    currentPosition = 0;
                }
            } else {
                currentPosition = 0;
            }
        });
    });
}

function triggerKonamiEffect() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet);
        z-index: 4000;
        animation: rainbow 2s linear infinite;
    `;
    document.body.appendChild(overlay);
    
    if (!document.getElementById('rainbow-style')) {
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        color: white;
        text-shadow: 0 0 20px black;
        z-index: 4001;
        text-align: center;
    `;
    message.innerHTML = '🎮 KONAMI CODE!<br><small>30 VIES EXTRA</small>';
    document.body.appendChild(message);
    
    setTimeout(() => {
        overlay.remove();
        message.remove();
    }, 3000);
}

/* ==========================================================================
   13. EASTER EGG 7 - Clock Double Click (Dio)
   ========================================================================== */
// Implémenté dans initClockDoubleClick()

/* ==========================================================================
   14. RÉCOMPENSE FINALE - Shenron
   ========================================================================== */
function initRewardButton() {
    const rewardButton = document.getElementById('reward-button');
    if (!rewardButton) return;
    
    rewardButton.addEventListener('click', () => {
        launchShenronSequence();
    });
}

/**
 * Lance la séquence de récompense Shenron
 * Étape 1: Affiche shenron.gif
 * Étape 2: Après l'animation, remplace par shenron time.gif
 * Étape 3: Affiche les trois boutons de choix
 */
function launchShenronSequence() {
    const shenronModal = document.getElementById('shenron-modal');
    const shenronImage = document.getElementById('shenron-image');
    const shenronChoices = document.getElementById('shenron-choices');
    
    if (!shenronModal || !shenronImage || !shenronChoices) return;
    
    // Afficher le modal
    shenronModal.classList.add('active');
    
    // Étape 1: Afficher shenron.gif
    shenronImage.src = 'shenron.gif';
    shenronChoices.style.display = 'none';
    
    // Étape 2: Après 3 secondes, remplacer par shenron time.gif
    setTimeout(() => {
        shenronImage.src = 'shenron time.gif';
        
        // Étape 3: Après 2 secondes supplémentaires, afficher les choix
        setTimeout(() => {
            shenronChoices.style.display = 'flex';
        }, 2000);
    }, 3000);
}

/**
 * Gère les choix de récompense Shenron
 */
function initShenronChoices() {
    const choices = document.querySelectorAll('.shenron-choice');
    if (choices.length === 0) return;
    
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const choiceType = choice.getAttribute('data-choice');
            handleShenronChoice(choiceType);
        });
    });
}

/**
 * Gère le choix de l'utilisateur pour la récompense Shenron
 * @param {string} choiceType - Type de choix: 'note', 'anas', ou 'nsi'
 */
function handleShenronChoice(choiceType) {
    const shenronModal = document.getElementById('shenron-modal');
    const shenronImage = document.getElementById('shenron-image');
    const shenronChoices = document.getElementById('shenron-choices');
    const rewardButton = document.getElementById('reward-button');
    
    // Masquer les choix
    if (shenronChoices) {
        shenronChoices.style.display = 'none';
    }
    
    switch(choiceType) {
        case 'note':
            // Choix 1: "Je veux avoir une bonne note"
            shenronImage.src = 'shenron i can\'t.jpg';
            
            // Après 3 secondes, fermer et réinitialiser
            setTimeout(() => {
                closeShenronModal();
                resetRewardState();
            }, 3000);
            break;
            
        case 'anas':
            // Choix 2: "Je veux que Anas disparaisse"
            shenronImage.src = 'shenron veux.jpg';
            
            // Jouer le son Shenron
            playShenronSound();
            
            // Après 3 secondes, fermer et rendre Anas non-clicable
            // NOTE: On n'appelle PAS resetRewardState() car disableAnasEasterEgg()
            // a déjà défini le compteur à 1/7 et sauvegardé dans localStorage
            setTimeout(() => {
                closeShenronModal();
                disableAnasEasterEgg();
            }, 3000);
            break;
            
        case 'nsi':
            // Choix 3: "Je veux faire de la NSI"
            shenronImage.src = 'shenron veux.jpg';
            
            // Jouer le son Shenron
            playShenronSound();
            
            // Après 3 secondes, afficher le message et fermer
            setTimeout(() => {
                showNSIPopup();
                setTimeout(() => {
                    closeShenronModal();
                    resetRewardState();
                }, 100);
            }, 3000);
            break;
    }
}

/**
 * Joue le son Shenron
 */
function playShenronSound() {
    const shenronAudio = document.getElementById('shenron-sound');
    if (shenronAudio) {
        shenronAudio.currentTime = 0;
        shenronAudio.play().catch(e => console.log('Audio non disponible:', e));
    }
}

/**
 * Ferme le modal Shenron
 */
function closeShenronModal() {
    const shenronModal = document.getElementById('shenron-modal');
    if (shenronModal) {
        shenronModal.classList.remove('active');
    }
    
    // Réinitialiser l'image pour la prochaine fois
    const shenronImage = document.getElementById('shenron-image');
    if (shenronImage) {
        shenronImage.src = 'shenron.gif';
    }
    
    const shenronChoices = document.getElementById('shenron-choices');
    if (shenronChoices) {
        shenronChoices.style.display = 'none';
    }
}

/**
 * Désactive définitivement l'Easter Egg Anas
 */
function disableAnasEasterEgg() {
    const anasTrigger = document.getElementById('anas-trigger');
    const anasLink = document.getElementById('anas-link');
    
    if (anasTrigger) {
        anasTrigger.style.pointerEvents = 'none';
        anasTrigger.style.cursor = 'default';
    }
    
    if (anasLink) {
        anasLink.style.pointerEvents = 'none';
        anasLink.style.cursor = 'default';
        anasLink.style.textDecoration = 'none';
    }
    
    // Sauvegarder l'état désactivé dans localStorage
    localStorage.setItem('nsi_anas_disabled', 'true');
    
    // Réinitialiser tous les Easter Eggs (reset complet)
    discoveredEasterEggs = [];
    easterEggsFound = 0;
    
    // Marquer l'Easter Egg Anas comme trouvé (ID 4)
    // Car il devient non-clicable, on le compte comme trouvé
    discoveredEasterEggs.push(4);
    easterEggsFound = 1;
    
    // Sauvegarder dans le localStorage
    saveEasterEggsToStorage();
    
    // Mettre à jour l'affichage du compteur
    updateEasterEggCounter();
}

/**
 * Vérifie si l'Easter Egg Anas est désactivé au chargement
 */
function checkAnasDisabled() {
    const anasDisabled = localStorage.getItem('nsi_anas_disabled');
    if (anasDisabled === 'true') {
        disableAnasEasterEgg();
    }
}

/**
 * Affiche le popup NSI pour le choix 3
 */
function showNSIPopup() {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
        color: white;
        padding: 40px 50px;
        border-radius: 20px;
        z-index: 7000;
        text-align: center;
        box-shadow: 0 0 50px rgba(233, 69, 96, 0.5);
        border: 2px solid #e94560;
        max-width: 80%;
    `;
    popup.innerHTML = `
        <h2 style="color: #ffd700; margin-bottom: 20px; font-size: 1.8rem;">🎉 Bravo!</h2>
        <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 10px;">
            Bravo vous avez tout réussi.<br>
            J'espère que ça vous aura donné l'envie de faire de la NSI<br>
            et bon courage.
        </p>
    `;
    
    document.body.appendChild(popup);
    
    // Fermer le popup après 5 secondes
    setTimeout(() => {
        popup.remove();
    }, 5000);
}

/**
 * Réinitialise l'état de la récompense
 * - Cache le bouton de récompense
 * - Réinitialise le compteur d'Easter Eggs à 0
 */
function resetRewardState() {
    // Masquer le bouton de récompense
    const rewardButton = document.getElementById('reward-button');
    if (rewardButton) {
        rewardButton.classList.remove('visible');
        rewardButton.style.display = 'none';
    }
    
    // Réinitialiser le compteur d'Easter Eggs
    easterEggsFound = 0;
    discoveredEasterEggs = [];
    
    // Sauvegarder dans le localStorage
    saveEasterEggsToStorage();
    
    // Réactiver l'Easter Egg Anas (supprimer le flag disabled)
    localStorage.removeItem('nsi_anas_disabled');
    
    // Réactiver visuellement les éléments Anas
    const anasTrigger = document.getElementById('anas-trigger');
    const anasLink = document.getElementById('anas-link');
    
    if (anasTrigger) {
        anasTrigger.style.pointerEvents = 'auto';
        anasTrigger.style.cursor = 'pointer';
    }
    
    if (anasLink) {
        anasLink.style.pointerEvents = 'auto';
        anasLink.style.cursor = 'pointer';
        anasLink.style.textDecoration = 'underline';
    }
    
    // Mettre à jour l'affichage
    updateEasterEggCounter();
}

function initVideoModalClose() {
    const closeBtn = document.querySelector('.video-modal .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }
    
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
}

/* ==========================================================================
   15. EXERCICES INTERACTIFS
   ========================================================================== */
/**
 * Initialise l'exercice Python interactif
 */
function initPythonExercise() {
    const runButton = document.getElementById('run-python');
    if (!runButton) return;
    
    runButton.addEventListener('click', () => {
        const code = document.getElementById('python-code').value;
        const output = document.getElementById('python-output');
        
        // Simulation simple de Python
        let result = '';
        try {
            // Extraire les instructions print()
            const printMatches = code.match(/print\s*\(\s*["']([^"']*)["']\s*\)/g);
            if (printMatches) {
                printMatches.forEach(match => {
                    const content = match.match(/print\s*\(\s*["']([^"']*)["']\s*\)/);
                    if (content && content[1]) {
                        result += content[1] + '\n';
                    }
                });
            }
            
            // Chercher les variables
            const varMatches = code.match(/(?:let|var|const|int|str)\s+(\w+)\s*=\s*([^;\n]+)/g);
            if (varMatches) {
                result += '> Variables créées\n';
            }
            
            if (!result) {
                result = '> Essayez: print("Hello World!")';
            }
        } catch (e) {
            result = '> Erreur: ' + e.message;
        }
        
        output.textContent = result || '> Résultat...';
    });
}

/**
 * Initialise l'exercice Web interactif
 */
function initWebExercise() {
    const runButton = document.getElementById('run-web');
    if (!runButton) return;
    
    runButton.addEventListener('click', () => {
        const htmlCode = document.getElementById('html-code').value;
        const cssCode = document.getElementById('css-code').value;
        const output = document.getElementById('web-output');
        
        // Créer un iframe pour afficher le résultat
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '200px';
        iframe.style.border = '2px solid var(--accent-primary)';
        iframe.style.borderRadius = '10px';
        
        output.innerHTML = '';
        output.appendChild(iframe);
        
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <style>${cssCode}</style>
            ${htmlCode}
        `);
        doc.close();
    });
}

/* ==========================================================================
   16. INITIALISATION PRINCIPALE
   ========================================================================== */
/**
 * Fonction d'initialisation principale du script
 * Cette fonction est appelée au chargement de chaque page
 * IMPORTANT: Le thème est chargé en premier pour qu'il soit appliqué dès le début
 * et persiste entre les navigations grâce au localStorage
 */
function init() {
    // IMPORTANT: Charger le thème en premier pour qu'il soit appliqué dès le début
    // Cette fonction charge le thème depuis le localStorage et l'applique
    // Cela permet au thème de persister entre les pages
    loadThemeFromStorage();
    
    // Charger la progression des Easter Eggs depuis le localStorage
    loadEasterEggsFromStorage();
    
    // Animations au défilement
    initScrollAnimations();
    
    // Horloge
    initClock();
    initClockDoubleClick();
    
    // Compteur d'Easter Eggs
    updateEasterEggCounter();
    
    // S'assurer que le bouton de récompense est caché si pas tous les eggs trouvés
    if (easterEggsFound < totalEasterEggs) {
        const rewardButton = document.getElementById('reward-button');
        if (rewardButton) {
            rewardButton.classList.remove('visible');
            rewardButton.style.display = 'none';
        }
    }
    
    // Bouton de thème
    initThemeButton();
    
    // Easter Eggs individuels
    initCatBounce();
    initSecretEgg();
    initOhPinaiseSound();
    initAnasVideo();
    initPiouPiouParticles();
    initKonamiCode();
    
    // Récompense et modal Shenron
    initRewardButton();
    initShenronChoices();
    checkAnasDisabled();
    
    // Fermer le modal vidéo
    initVideoModalClose();
    
    initPythonExercise();
    initWebExercise();
    
    console.log('🎮 Mini Site NSI - Script initialisé!');
    console.log('💡 Trouvez les 7 Easter Eggs cachés!');
    console.log('📊 Progression chargée:', easterEggsFound, '/', totalEasterEggs);
}

// Écouter l'événement DOMContentLoaded pour lancer l'initialisation
document.addEventListener('DOMContentLoaded', init);
