function date(){
    let now = new Date();
    alert('Nous sommes le :\n' + now);	
}

let btn = document.getElementById("bouton1");
btn.addEventListener('click', date);

function date2(){
    let jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    let mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let now = new Date();
    
    let aujourdhui = jours[now.getDay()] + ' ' + now.getDate() + ' ' + mois[now.getMonth()];
    let heure = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    
    alert('Nous sommes le :\n' + aujourdhui + '\nIl est :\n' + heure);
    
}