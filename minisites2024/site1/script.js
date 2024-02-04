function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  
function couleur(){
    color = getRandomColor();
    document.body.style.backgroundColor = color;
}
function boutoncouleur(){
  color = getRandomColor();
  document.getElementById("boutonspe").style.backgroundColor = color;
}


let btn = document.getElementById("boutonbien");
if (btn != null){btn.addEventListener('click', couleur);}  

let btn2= document.getElementById("boutonspe");
if (btn2 != null){btn2.addEventListener('dblclick', boutoncouleur);}









