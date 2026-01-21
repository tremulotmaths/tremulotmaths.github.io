// Calcul de la note au BAC

function calcul(){
	
		let formulaire = document.getElementById("notes"); // "notes" est l'id du formulaire
		let elmts = formulaire.elements; //"elmts" contient le tableau des éléments de formulaire
				
		let hg_1 = parseFloat(elmts[0].value); // on stocke dans 16 variables la valeur entrée dans les éléments 0, 1,... 15 du formulaire...
		let lva_1 = parseFloat(elmts[1].value); // ...en pensant à les transtyper en nombres flottants !
		let lvb_1 = parseFloat(elmts[2].value);
		let es_1 = parseFloat(elmts[3].value);
		let spe3 = parseFloat(elmts[4].value);
		let emc_1 = parseFloat(elmts[5].value);
		let fr_ecrit = parseFloat(elmts[6].value);
		let fr_oral = parseFloat(elmts[7].value);
		let maths = parseFloat(elmts[8].value);
		let hg_t = parseFloat(elmts[9].value);
		let lva_t = parseFloat(elmts[10].value);
		let lvb_t = parseFloat(elmts[11].value);
		let es_t = parseFloat(elmts[12].value);
		let eps = parseFloat(elmts[13].value);
		let emc_t = parseFloat(elmts[14].value);
		let philo = parseFloat(elmts[15].value);
		let spe1 = parseFloat(elmts[16].value);
		let spe2 = parseFloat(elmts[17].value);
		let gd_oral = parseFloat(elmts[18].value);
		
		let moyenne = (hg_1*3+lva_1*3+lvb_1*3+es_1*3+spe3*8+emc_1*1+fr_ecrit*5+fr_oral*5+maths*2+hg_t*3+lva_t*3+lvb_t*3+es_t*3+eps*6+emc_t*1+philo*8+spe1*16+spe2*16+gd_oral*8)/100; // calcul de la moyenne
		
		elmt = document.getElementById("note_finale"); // sélection de l'élément "note_finale"
		elmt.innerHTML = Math.round(100*moyenne)/100; // affectation du contenu texte
}

