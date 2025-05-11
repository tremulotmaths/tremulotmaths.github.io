function envoyerMessage(){
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
  }

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function searchScientist() {
    const scientists = {
        "maria gaetana agnesi": "Page%20scientifique/Page%20scientifique%20base.html"
    };

    let input = document.getElementById("searchInput").value.trim();
    input = removeAccents(input.toLowerCase());

    let message = document.getElementById("searchMessage");

    if (scientists[input]) {
        window.location.href = scientists[input]; 
    } else {
        message.textContent = "Scientist not found. Try again!";
    }
}

function agrandirImage() {
    document.getElementById('photo').style.transform = 'scale(1.05)';
}

function reduireImage() {
    document.getElementById('photo').style.transform = 'scale(1)';
}