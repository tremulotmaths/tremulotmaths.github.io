const btn = document.querySelector(".theme"); //bouton qui créera le changement de theme

btn.addEventListener("click", () => { //au clic → executer la fonction
    document.body.classList.toggle("dark"); //pour déclencher le dark (les couleur des elements/classes dans la classe dark)

    if (document.body.classList.contains("dark")) { //recherche si dark existe bel et bien
        localStorage.setItem("theme", "dark"); // si oui alors le mettre en place
    } else {
        localStorage.setItem("theme", "light"); // sinon laisser le theme de base 
    }
})

if (localStorage.getItem("theme") === "dark") { // si le theme en place est le sombre 
    document.body.classList.add("dark"); // alors meme en rafraichissant la page, le theme choisi reste encore
}



function change(){ //bouton qui fait apparaitre du texte//
    let e = document.getElementById('cache')//part chercher l'element appelé ainsi//
    e.hidden =! e.hidden //le cacher//
}