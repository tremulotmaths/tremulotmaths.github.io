
function calcul(){
	
	let rep = document.getElementById("quiz");
	let reponses = rep.elements;
	let resultat = 0;
  for (let i=0;i<reponses.length;i++)
  {
    if (reponses[i].checked) {
      resultat += parseInt(reponses[i].value);
    } 
  }	
  let objet = document.getElementById("resultatSPE");	
	if (resultat > 35)
  {
    objet.innerHTML = "NSI semble être faite pour toi !";
  }
  else if (resultat > 20)
  {
    objet.innerHTML = "NSI peut te convenir, mais renseigne-toi bien sur notre site sur le contenu exact.";
  }
  else 
  {
    objet.innerHTML = "Ce n’est peut-être pas la spécialité la plus adaptée à tes centres d’intérêt actuels.";
  }
}
const text = document.getElementById("couleur");

document.addEventListener("mousemove", (e) => {
    const largeur = window.innerWidth;
    const hauteur = window.innerHeight;
    const Largdivisé = e.clientX / largeur;
    const Hautdivisé = e.clientY / hauteur;

    // Calcul couleur
    const rouge = Math.floor(Largdivisé * 255);
    const vert = Math.floor(Hautdivisé * 255);

    text.style.color = `rgb(${rouge}, ${vert}, 255)`;
});


const progressBar = document.querySelector('.progress_bar');
progressBar.style.display = "none";
window.addEventListener('scroll', barreP);
function barreP() {
  progressBar.style.display = "block";
  const hauteurTotale = document.body.scrollHeight; // taille du site
  const hauteurVisible = window.innerHeight; // taille de l'affichage
  const dejafait = window.pageYOffset; // la position en pixels du document
  
  const reste = hauteurTotale - hauteurVisible; // taille du site - la partie affichée sur l'écran en ce moment (exemple : 1000px)
  
  const pourcentage = Math.floor((dejafait / reste) * 1000)/10; // pourcentage du site déjà parcouru
  progressBar.style.right = 100 - (pourcentage) + '%';
}



const popup = document.getElementById("cookies");
const button = document.getElementById("accepter");

if(localStorage.getItem("accepte")){
    popup.style.display = "none";
}

button.onclick = function(){
    localStorage.setItem("accepte","true");
    popup.style.display = "none";
}



let textetitre = document.getElementById("titre");
let texte = textetitre.innerHTML
let i = 0;
textetitre.innerHTML = ''
function machineAEcrire(){

  if(i < texte.length){
    textetitre.innerHTML += texte.charAt(i);
    i++;
    setTimeout(machineAEcrire, 80);
    }

}

machineAEcrire();

