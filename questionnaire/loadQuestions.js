function demarre(questionnaire){
	// lancée la première
	affiche_titre(questionnaire.nom)
	affiche_questions(questionnaire.questions)
}

function affiche_titre(nom){
	// affiche le nom du questionnaire dans le header
    let section = document.getElementById('titre');
    const h1 = document.createElement('h1');
    let name = document.createTextNode(nom);
    h1.appendChild(name);
    section.appendChild(h1);
}

function insere_nouvelle_question_ouverte(question,i){
	// affiche une question ouverte ou aléatoire dans le fieldset "questions"
    let formulaire = document.getElementById('questions');
    const ligne = document.createElement('hr');
    formulaire.appendChild(ligne);
    const para = document.createElement('form');
    let enonce = document.createTextNode(question['textquestion']);
    para.appendChild(enonce);
    formulaire.appendChild(para);    // placement de l'énoncé
    const para2 = document.createElement('form');
    para2.setAttribute('id', "rep-"+i);
    champ = document.createElement('input');
    champ.setAttribute('type', 'text');
    champ.setAttribute('placeholder', 'votre réponse');    // texte écrit d'avance
    champ.setAttribute('id', "champ-"+i+"-0");
    para2.appendChild(champ)
    formulaire.appendChild(para2);   // placement du champ réponse
}

function insere_nouvelle_question_QCM(question,i){
	// affiche une question QCM dans le fieldset "questions"
    let formulaire = document.getElementById('questions');
    const ligne = document.createElement('hr');
    formulaire.appendChild(ligne);
    const para = document.createElement('form');
    let enonce = document.createTextNode(question['textquestion']);
    para.appendChild(enonce);
    formulaire.appendChild(para);    // placement de l'énoncé
    const para2 = document.createElement('form');
    para2.setAttribute('id', "rep-"+i);
	for (let k=0;k<question['reponses'].length;k++){
		// construction des radioboutons
        const para3 = document.createElement('section');
        para3.setAttribute('id', "rep-"+i+"-"+k);
		radio = document.createElement('input');
		radio.setAttribute('type', 'radio');
		radio.setAttribute('name', "radios-"+i);
		radio.setAttribute('value', question['reponses'][k]['score']);    // a priori inutile
		radio.setAttribute('id', "radio-"+i+"-"+k);		
		let rep = document.createTextNode(question['reponses'][k]['textrep']);
		para3.appendChild(radio);
		para3.appendChild(rep);
        para2.appendChild(para3);
	}
    formulaire.appendChild(para2);    // placement des radioboutons
}

function affiche_questions(listequestions){
	// lance l'affichage des questions en fonction du type
    for (let i=0;i<listequestions.length;i++){
        switch (listequestions[i]['type']) {
            case 'ouverte':
            case 'chgt base':
            case 'conversion C2':    // ouverte et aléatoire s'affichent de la même manière
                insere_nouvelle_question_ouverte(listequestions[i],i+"");
                break;
            case 'QCM':
                insere_nouvelle_question_QCM(listequestions[i],i+"");
                break;
            default:
                console.log('Désolé, type ' + listequestions['type']  + 'inconnu !');
          }
    }
    // construction du bouton de validation
    const formulaire = document.getElementById('questions');
    const ligne = document.createElement('hr');
    formulaire.appendChild(ligne);
    const bouton = document.createElement('input');
    bouton.setAttribute('type', 'button');
    bouton.setAttribute('id', 'valide');	
    bouton.setAttribute('value', 'Envoyer les réponses');
    let flag = true;
    bouton.onclick = function(){
        if (flag==true){
            flag = false;
            window.location.href='#wrapper'
            scorefinal(listequestions);
        }
    }
    formulaire.appendChild(bouton);    // placement du bouton de validation
}

function verif_reponse(eleve){
	// feedback des réponses de l'élève (PROVISOIRE A ELIMINER)
	let feedback = document.getElementById('feedback');
    for (let i=0;i<eleve.length;i++){
		const para = document.createElement('p');
		let text_reponse = document.createTextNode(eleve[i].get("texte")+" / ");
		let score_reponse = document.createTextNode(eleve[i].get("score"));
		para.appendChild(text_reponse);
		para.appendChild(score_reponse);
		feedback.appendChild(para);
	}
}

function retirer_element(id){
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

function scorefinal(listequestions){
	// construit la liste des réponses (textes et scores) de l'élève
	// et donne son score final
	let total = 0;    // initialisation du total des scores
    const eleve = [];    // initialisation de la liste des réponses
    
    for (let i=0;i<listequestions.length;i++){
		const reponse = new Map();
		let score = 0; 
        switch (listequestions[i]['type']) {
            case 'ouverte':
            case 'chgt base':
            case 'conversion C2':    // même calcul pour ouverte et aléatoire
                const reponse_eleve = document.getElementById("champ-"+i+"-0").value;
                reponse.set("texte",reponse_eleve);
                let bonne_rep = false;
                let k = 0;
                while (k<listequestions[i]['reponses'].length && bonne_rep==false){
                    if (reponse_eleve==listequestions[i]['reponses'][k]['textrep']){
                        bonne_rep = true;
                        score = listequestions[i]['reponses'][k]['score'];
                        if (score==100){
                            document.getElementById("champ-"+i+"-0").style.backgroundColor = '#ccffb9';    // fond en vert clair
                            
                        }
                        else{
                            document.getElementById("champ-"+i+"-0").style.backgroundColor = '#ffbb69';    // fond en orange clair
                        }
                        total += listequestions[i]['reponses'][k]['score'];
					}
                    else{
                        document.getElementById("champ-"+i+"-0").style.backgroundColor = '#ff6b6b';    // fond en rouge clair
					}
					k +=1;
                }           
                break;
            case 'QCM':
                const radios = document.getElementsByName("radios-"+i);
                for (let k=0;k<listequestions[i]['reponses'].length;k++){
					if (radios[k].checked){
						const reponse_eleve = listequestions[i]['reponses'][k]['textrep'];
						reponse.set("texte",reponse_eleve);
						score = listequestions[i]['reponses'][k]['score'];
						if (score==100){
                            document.getElementById("rep-"+i+"-"+k).style.backgroundColor = '#ccffb9';    // fond en vert clair
                        }
                        else{
                            document.getElementById("rep-"+i+"-"+k).style.backgroundColor = '#ff6b6b';    // fond en rouge clair
                        }
						total += listequestions[i]['reponses'][k]['score'];
					}
				}
                break;
            default:
                console.log('Désolé, type ' + listequestions['type']  + 'inconnu !');
        }
        reponse.set("score",score);
        eleve.push(reponse);
        const para2 = document.getElementById("rep-"+i);
        const para3 = document.createElement('p');
        const para3bis = document.createElement('p');
        for (let k=0;k<listequestions[i]['reponses'].length;k++){
            if (listequestions[i]['reponses'][k]['score']==100){
				let para4 = document.createElement('p');
                let correction = document.createTextNode("La bonne réponse est : "+listequestions[i]['reponses'][k]['textrep']);
                para4.appendChild(correction);
                para3.appendChild(para4);
            }
        }
        let score_attribue = document.createTextNode("Score attribué : "+eleve[i].get("score"));
        para3bis.appendChild(score_attribue);
        para2.appendChild(para3);
        para2.appendChild(para3bis);
    }
    
    // Calcul du score final avec les scores issus des questions
    let scorefinal = total/listequestions.length
    
    // Calcul du score final avec les scores issus des réponses de l'utilisateur
    total = 0
    for (let i=0;i<eleve.length;i++){
		total += eleve[i].get("score");
	}
	let scorefinal2 = total/eleve.length
    
    // lancement du feedback (PROVISOIRE A ELIMINER)
    // verif_reponse(eleve)
    
    // Affichage du score à la place de la consigne
    retirer_element('consigne');
    retirer_element('valide');
    let accueil = document.getElementById('accueil');
    const h2 = document.createElement('h2');
    let score_final = document.createTextNode("SCORE FINAL : "+scorefinal2+" %");
    h2.appendChild(score_final);
    let corrige = document.createTextNode("Voici la correction :");
    accueil.appendChild(h2);
    accueil.appendChild(corrige);    
    
    // Affichage du score (provisoirement comparaison entre les deux scores finaux) (PROVISOIRE A ELIMINER)
    // alert("Votre score est de "+ scorefinal + " % ou "+ scorefinal2 + " %."); 
}

// Au chargement de la page, on charge le questionnaire en JSON
// Ce n'est qu'au niveau du 2ème then que le contenu du fichier
// sera disponible 
window.onload = function(){
    fetch("Questionnaires/default.json")
    .then(response => response.json())
    .then(json => demarre(json)); 
}
