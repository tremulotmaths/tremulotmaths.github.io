

var onglets = document.getElementById("onglets");
var contenus = document.getElementById("contenus");

var liOnglet = onglets.getElementsByTagName("li");
var liContenu = contenus.getElementsByTagName("li");

liOnglet[0].className = "actif";
liContenu[0].className = "actif";

for (var i = 0; i < liOnglet.length; i++){
	liOnglet[i].num = i;

    liOnglet[i].addEventListener("click", function(){
    
		for (var j = 0; j < liOnglet.length; j++){
			liOnglet[j].className="";
			liContenu[j].className="";
		}

		liOnglet[this.num].className="actif";
		liContenu[this.num].className="actif";
	});
}

