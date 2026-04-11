function afficher() {
  var bloc = document.getElementById("texteCache");
  var btn = document.querySelector(".btn-more");
  if (bloc.style.display === "block") {
    bloc.style.display = "none";
    btn.textContent = "Afficher plus ↓";
  } else {
    bloc.style.display = "block";
    btn.textContent = "Afficher moins ↑";
  }
}