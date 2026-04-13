function calculerResultat() {

    let total = 0;

    for (let i = 1; i <= 5; i++) {
        let reponse = document.querySelector('input[name="q' + i + '"]:checked');
        if (reponse == null) {
            document.getElementById("resultat").innerHTML =
            "Merci de répondre à toutes les questions.";
            return;
        }
        total = total + parseInt(reponse.value);
    }

    if (total >= 20) {
        document.getElementById("resultat").innerHTML =
        "Tu es vraiment fait(e) pour la NSI !  ";
    }
    else if (total >= 12) {
        document.getElementById("resultat").innerHTML =
        "La NSI pourrait beaucoup te plaire.";
    }
    else {
        document.getElementById("resultat").innerHTML =
        "La NSI n’est peut-être pas adaptée pour toi ";
    }
}
function avisOui() {
    document.getElementById("messageAvis").innerHTML =
    "Merci pour votre retour ! Nous sommes contents que le site vous ait été utile.";
}

function avisNon() {
    document.getElementById("messageAvis").innerHTML =
    "Nous sommes désolés que le site ne vous ait pas aidé.";

    setTimeout(function() {
        window.close();
    }, 2000);
}