//Script JavaScript lié à l'affichage de la date et l'heure

function date(){
		let now = new Date();
		alert('Nous sommes le :\n' + now);	
	}
	
let btn = document.getElementById("bouton1");
btn.addEventListener('wheel', date);


function date2(){
		let jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
		let mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
		let now = new Date();
		
		let aujourdhui = jours[now.getDay()] + ' ' + now.getDate() + ' ' + mois[now.getMonth()];
		let heure = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
		
		alert('Nous sommes le :\n' + aujourdhui + '\nIl est :\n' + heure);
		
	}


let btn3 = document.getElementById('bouton3');
btn3.addEventListener('dblclick', date2);
