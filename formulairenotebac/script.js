// Calcul de la note au BAC

function calcul(){
	
		let formulaire = document.getElementById("notes"); // "notes" est l'id du formulaire
		let elmts = formulaire.elements; //"elmts" contient le tableau des éléments de formulaire
				
		let hg_1 = parseFloat(elmts[0].value); // on stocke dans 16 variables la valeur entrée dans les éléments 0, 1,... 15 du formulaire...
		let lva_1 = parseFloat(elmts[1].value); // ...en pensant à les transtyper en nombres flottants !
		// ...à continuer
		
		let moyenne = ; // calcul de la moyenne...à compléter
		
		elmt = document.getElementById("note_finale"); // sélection de l'élément "note_finale"
		elmt.innerHTML = Math.round(100*moyenne)/100; // affectation du contenu texte
}

