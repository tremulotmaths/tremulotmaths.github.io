
let texte;
let motif;

let i; // indice pour la recherche naÃ¯ve

let k; // indice pour BMH
// calcul de la table de dÃ©calage
let dec = {};




let remplit = (c, t) => {
	let ligne_texte = document.querySelector(c + ' #texte');
	let ligne_motif = document.querySelector(c + ' #motif');
	
	ligne_texte.innerHTML = '';
	ligne_motif.innerHTML = '';
	
	for (let i = 0; i < t.length;i++){
		let nvl = document.createElement('td');
		nvl.textContent = t[i];
		nvl.style.fontStyle = 'italic';
		ligne_texte.appendChild(nvl);
		
		nvl = document.createElement('td');
		nvl.textContent = '';
		ligne_motif.appendChild(nvl);	
	
	}
}

let suivant_naif = () => {
	
	let ligne_texte = document.querySelectorAll('#naif #texte td'); // sÃ©lection de toutes les cellule de la ligne textes
	let ligne_motif = document.querySelectorAll('#naif #motif td'); // idem pour celles du motif
	
	if (i < texte.length - motif.length){ // si on n'est pas arrivÃ©s Ã  la fin du texte moins la longueur du motif
		
		// reset des attributs du texte et du motif
		for (let j = 0; j < i + motif.length;j++){
			ligne_motif[j].textContent = ''; 
			ligne_texte[j].style.color = 'black';
			ligne_texte[j].style.fontWeight = 'normal';
		}	
	
		// affichage du motif et mise en gras des caractÃ¨res correspondant dans le texte	
		for (let j = 0; j < motif.length;j++){
			ligne_motif[i + j].textContent = motif[j];
			ligne_motif[i + j].style.color = 'black';
			ligne_texte[i + j].style.fontWeight = 'bold';
		}
		
		let j = 0;
		let flag = true;
		while (j < motif.length && flag){
			if (ligne_texte[i + j].textContent === motif[j]){
				ligne_motif[i + j].style.color = 'green';
				ligne_texte[i + j].style.color = 'green';
				if (j === motif.length-1){
					resultat('#naif', i);			
				}	
			}
			else {
				ligne_motif[i + j].style.color = 'red';
				ligne_texte[i + j].style.color = 'red';
				flag = false;
			}
			j++;
			document.querySelector('#naif #comp').textContent = +document.querySelector('#naif #comp').textContent + 1;	
		}
		
		i++;	
	}
	else {
		resultat('#naif', false);
	}
}

let suivant_bmh = () => {
	
	let ligne_texte = document.querySelectorAll('#bmh #texte td');
	let ligne_motif = document.querySelectorAll('#bmh #motif td');
	
	if (k < texte.length - motif.length){ // si on n'est pas arrivÃ©s Ã  la fin du texte
		
		for (let j = 0; j < k + motif.length;j++){
			ligne_motif[j].textContent = ''; // reset des attributs du texte et du motif
			ligne_texte[j].style.color = 'black';
			ligne_texte[j].style.fontWeight = 'normal';
		}				
		
		
		// affichage du motif et mise en gras des caractÃ¨res correspondant dans le texte	
		for (let j = 0; j < motif.length; j++){
			ligne_motif[k + j].textContent = motif[j];
			ligne_motif[k + j].style.color = 'black';
			ligne_texte[k + j].style.fontWeight = 'bold';
		}
		
		let j = motif.length - 1;
		let flag = true;
		while (j > -1 && flag){
			if (ligne_texte[k + j].textContent === motif[j]){
				ligne_motif[k + j].style.color = 'green';
				ligne_texte[k + j].style.color = 'green';
				if (j === 0){
					resultat('#bmh', k);			
				}	
			}
			else {
				ligne_motif[k + j].style.color = 'red';
				ligne_texte[k + j].style.color = 'red';
				flag = false;
			}
			j--;
			document.querySelector('#bmh #comp').textContent = +document.querySelector('#bmh #comp').textContent + 1;	
		}
		
		// application du dÃ©calage
		if (motif.indexOf(texte[k + j + 1]) === -1 || texte[k + j + 1] === motif[motif.length-1]){ // si le caractÃ¨re du texte n'est pas dans le motif ou est identique au dernier caractÃ¨re du motif
			k += motif.length; // on dÃ©cale du nombre de caractÃ¨res du motif		
		}
		else { // sinon, on applique le dÃ©calage correspond Ã  ce caractÃ¨re
			k += dec[texte[k + j + 1]];	
		}
	}
	else {
		resultat('#bmh', false);
	}
}

let resultat = (c, r) => { // c = id du conteneur, r = rÃ©sultat ( false si pas trouvÃ©, valeur de l'indice si trouvÃ© )
	let result = document.querySelector(c + ' #result');
	if (r === false){
		result.textContent = 'Motif pas trouvÃ©.';
		result.style.backgroundColor = 'red';	
	}
	else {
		result.textContent = "Motif trouvÃ© Ã  l'indice " + r;
		result.style.backgroundColor = 'green';		
	}
	//document.querySelector(c + ' #next').disabled = true;
}

let raz_naif = () => {
	texte = document.querySelector('#naif #le_texte').value;
	motif = document.querySelector('#naif #le_motif').value;
	
	i = 0;

	document.querySelector('#naif #result').innerHTML = '';
	document.querySelector('#naif #comp').textContent = '0';
	
	remplit('#naif', texte);
}

let raz_bmh = () => {
	texte = document.querySelector('#bmh #le_texte').value;
	motif = document.querySelector('#bmh #le_motif').value;
	
	//calcul des dÃ©calages
	for (let j = 0; j < motif.length -1;j++){
		dec[motif[j]] = motif.length - 1 - j;
	}
	dec[motif[motif.length -1]] = motif.length; // dÃ©calage du dernier caractÃ¨re
	
	k = 0;
	
	document.querySelector('#bmh #result').innerHTML = '';
	document.querySelector('#bmh #comp').textContent = '0';
	
	remplit('#bmh', texte);
}

document.querySelector('#naif #next').addEventListener('click', suivant_naif);
document.querySelector('#bmh #next').addEventListener('click', suivant_bmh);

raz_naif();
raz_bmh();

document.querySelector('#naif #le_texte').addEventListener('input', raz_naif);
document.querySelector('#naif #le_motif').addEventListener('input', raz_naif);

document.querySelector('#bmh #le_texte').addEventListener('input', raz_bmh);
document.querySelector('#bmh #le_motif').addEventListener('input', raz_bmh);


