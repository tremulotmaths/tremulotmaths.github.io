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

let btn = document.getElementById("boutton secret");
btn.addEventListener('click', couleur);