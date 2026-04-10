// Tableau contenant les jours de la semaine
let jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']; // Permet de transformer les numéros de jours en texte

// Tableau contenant les mois de l'année
let mois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre', 'Décembre']; // Permet de transformer les numéros de mois en texte

// Fonction principale pour afficher la date et l'heure
function afficherDate() { // Déclare une fonction appelée "afficherDate"
    let aujourdhui = new Date(); // Crée un variable "Date" contenant la date et l'heure actuelles
    let jourSemaine = jours[aujourdhui.getDay()]; // Récupère le numéro du jour (0 à 6) puis le convertit en texte grâce au tableau de jours
    let jour = aujourdhui.getDate(); // Récupère le numéro du jour dans le mois
    let moisAnnee = mois[aujourdhui.getMonth()]; // Récupère le numéro du mois (0 à 11) puis le convertit en texte grâce au tableau des mois
    let annee = aujourdhui.getFullYear(); // Récupère l'année actuelle
    let heures = aujourdhui.getHours(); // Récupère l'heure actuelle
    let minutes = aujourdhui.getMinutes(); // Récupère les minutes actuelles
    let secondes = aujourdhui.getSeconds(); // Récupère les secondes actuelles

    if (minutes < 10) minutes = '0' + minutes; // Si les minutes sont inférieures à 10, ajoute un zéro devant
    if (secondes < 10) secondes = '0' + secondes; // Si les secondes sont inférieures à 10, ajoute un zéro devant
  
  let texte =  // Crée une variable qui contiendra le texte final affiché
    jourSemaine + ' ' + jour + ' ' + moisAnnee + ' ' + annee + // Construit la partie date (jour + mois + année)// 
    ' | ' + heures + ':' + minutes + ':' + secondes; // Ajoute l'heure au format HH:MM:SS
    
    document.getElementById("horloge").textContent = texte; // Insère le texte dans l'élément HTML qui possède l'id "horloge"
} // Fin de la fonction afficherDate

// Met à jour l'heure toutes les millisecondes
setInterval(afficherDate, 1); // Appelle la fonction afficherDate toutes les millisecondes)

// Appel immédiat au chargement de la page
afficherDate(); // Lance la fonction immédiatement pour afficher l'heure sans attendre 1 seconde