function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  
function couleur(){
    color = getRandomColor()
    document.body.style.backgroundColor = color
}

let btn = document.getElementById("bouton");
btn.addEventListener('click', couleur);
bouton.style.height='50px';
bouton.style.weight='50px';