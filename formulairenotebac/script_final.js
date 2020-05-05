// Calcul de la note au BAC

function calcul(){
	
		let formulaire = document.getElementById("notes"); // "notes" est l'id du formulaire
		let elmts = formulaire.elements; //"elmts" contient le tableau des éléments de formulaire
				
		let t1 = parseFloat(elmts[0].value); // on stocke dans 3 variables la valeur entrée dans les éléments 0, 1 et 2 du formulaire...
		let t2 = parseFloat(elmts[1].value); // ...en pensant à les transtyper en nombres flottants !
		let t3 = parseFloat(elmts[2].value);
		
		let moyenne = (t1 + t2 + t3)/3; // calcul de la moyenne
		
		let elmt = document.getElementById('moy_bull');	// sélection de la balise "span", d'id = "moy_bull", où l'on va afficher la moyenne
		
		elmt.innerHTML = Math.round(100*moyenne)/100; // modification du texte				
		t1 = parseFloat(elmts[13].value); // on peut "réutiliser" les variables précédentes, leur contenu ne nous intéresse plus...
		t2 = parseFloat(elmts[14].value);
		t3 = parseFloat(elmts[15].value);
		
		let moyenne_t = (t1 + t2 + t3)/3; // par contre il faut donner un autre nom à la nouvelle variable moyenne : on aura besoin des deux moyennes par la suite !
		
		elmt = document.getElementById('moy_bull_t');	// attention, il faut avoir donné un autre id à la balise "span" de la section de Terminale pour la différencier de la première !!
		elmt.innerHTML = Math.round(100*moyenne_t)/100;	
		
		let moy_e3c_1 = 1.25*(parseFloat(elmts[3].value) +parseFloat(elmts[4].value) +parseFloat(elmts[5].value) +parseFloat(elmts[6].value) +parseFloat(elmts[7].value) +parseFloat(elmts[8].value))+2.5*parseFloat(elmts[9].value) + 5*parseFloat(elmts[10].value)  ;
		let franc = 5*(parseFloat(elmts[11].value) + parseFloat(elmts[12].value));
		let moy_e3c_t = 2.5*(parseFloat(elmts[16].value) +parseFloat(elmts[17].value) +parseFloat(elmts[18].value) +parseFloat(elmts[19].value)) + 5*parseFloat(elmts[20].value) ;
		let philo = 8*parseFloat(elmts[21].value) ;
		let spe = 16*(parseFloat(elmts[22].value)+ parseFloat(elmts[23].value));
		let gd_oral = 10*parseFloat(elmts[24].value);
		
		let note_bac = ( moyenne*5 + moyenne_t*5 + moy_e3c_1 + moy_e3c_t + franc + spe + gd_oral	+ philo) / 100;
		
		elmt = document.getElementById("note_finale"); // sélection de l'élément "note_finale"
		elmt.innerHTML = Math.round(100*note_bac)/100; // affectation du contenu texte	
}

