// Calcul de la note au BAC

function calcul(){
	
		let formulaire = document.getElementById("notes"); // "notes" est l'id du formulaire
		let elmts = formulaire.elements; //"elmts" contient le tableau des éléments de formulaire	
		
		let LV1_1_1 = parseFloat(elmts[0].value) * 3;
		let LV1_2_1 = parseFloat(elmts[1].value) * 3;
		let LV1_3_1 = parseFloat(elmts[2].value) * 3;

		let LV1_1 =  (LV1_1_1 + LV1_2_1 + LV1_3_1) / 9;
		
		let LV2_1_1 = parseFloat(elmts[3].value) * 3;
		let LV2_2_1 = parseFloat(elmts[4].value) * 3;
		let LV2_3_1 = parseFloat(elmts[5].value) * 3;
		
		let LV2_1 =  (LV2_1_1 + LV2_2_1 + LV2_3_1) / 9;


		let HG_1_1 = parseFloat(elmts[6].value) * 3;
		let HG_2_1 = parseFloat(elmts[7].value) * 3;
		let HG_3_1 = parseFloat(elmts[8].value) * 3;

		let HG_1 = (HG_1_1 + HG_2_1 + HG_3_1) / 9;
		
		let ES_1_1 = parseFloat(elmts[9].value) * 3;
		let ES_2_1 = parseFloat(elmts[10].value) * 3;
		let ES_3_1 = parseFloat(elmts[11].value) * 3;

		let ES_1 = 	(ES_1_1 + ES_2_1 + ES_3_1) / 9;

		let EMC_1_1 = parseFloat(elmts[12].value);
		let EMC_2_1 = parseFloat(elmts[13].value);
		let EMC_3_1 = parseFloat(elmts[14].value);

		let EMC_1 = (EMC_1_1 + EMC_2_1 + EMC_3_1) / 3;
		
		let SP_1_1 = parseFloat(elmts[15].value) * 8;
		let SP_2_1 = parseFloat(elmts[16].value) * 8;
		let SP_3_1 = parseFloat(elmts[17].value) * 8;

		let SP_1 = (SP_1_1 + SP_2_1 + SP_3_1) /24;

		let OPT_1_1 = parseFloat(elmts[18].value) * 2;
		let LT_1 = parseFloat(elmts[19].value) * 2;
		let GRC_1 = parseFloat(elmts[20].value) * 2;

		let OPT_1 = (OPT_1_1 + LT_1 + GRC_1) / 6;

		let Moyenne_G_1er = (LV1_1 + LV2_1 + HG_1 + ES_1 + EMC_1 + SP_1 + OPT_1) / 7 ;

		let elmt = document.getElementById('moy_bull_1er');	// sélection de la balise "span", d'id = "moy_bull", où l'on va afficher la moyenne
		elmt.innerHTML = Math.round(100*Moyenne_G_1er)/100;


		let LV1_1_2 = parseFloat(elmts[23].value) * 3;
		let LV1_2_2 = parseFloat(elmts[24].value) * 3;
		let LV1_3_2 = parseFloat(elmts[25].value) * 3;

		let LV1_2 =  (LV1_1_2 + LV1_2_2 + LV1_3_2) / 9;
		
		let LV2_1_2 = parseFloat(elmts[26].value) * 3;
		let LV2_2_2 = parseFloat(elmts[27].value) * 3;
		let LV2_3_2 = parseFloat(elmts[28].value) * 3;
		
		let LV2_2 = (LV2_1_2 + LV2_2_2 + LV2_3_2) / 9;


		let HG_1_2 = parseFloat(elmts[29].value) * 3;
		let HG_2_2 = parseFloat(elmts[30].value) * 3;
		let HG_3_2 = parseFloat(elmts[31].value) * 3;

		let HG_2 = (HG_1_2 + HG_2_2 + HG_3_2) / 9;
		
		let ES_1_2 = parseFloat(elmts[32].value) * 3;
		let ES_2_2 = parseFloat(elmts[33].value) * 3;
		let ES_3_2 = parseFloat(elmts[34].value) * 3;

		let ES_2 = 	(ES_1_2 + ES_2_2 + ES_3_2) / 9;

		let EMC_1_2 = parseFloat(elmts[35].value);
		let EMC_2_2 = parseFloat(elmts[36].value);
		let EMC_3_2 = parseFloat(elmts[37].value);

		let EMC_2 = (EMC_1_2 + EMC_2_2 + EMC_3_2) / 3;
		
		let SP_1_2 = parseFloat(elmts[38].value) * 8;
		let SP_2_2 = parseFloat(elmts[39].value) * 8;
		let SP_3_2 = parseFloat(elmts[40].value) * 8;

		let SP_2 = (SP_1_2 + SP_2_2 + SP_3_2) /24;

		let OPT_1_2 = parseFloat(elmts[41].value) * 2;
		let LT_2 = parseFloat(elmts[42].value) * 2;
		let GRC_2 = parseFloat(elmts[43].value) * 2;

		let OPT_2 = (OPT_1_2 + LT_2 + GRC_2) / 6;

		let Moyenne_G_T = (LV1_2+ LV2_2 + HG_2 + ES_2 + EMC_2 + SP_2 + OPT_2) / 7 ;

		elmt = document.getElementById('moy_bull_T');	// sélection de la balise "span", d'id = "moy_bull", où l'on va afficher la moyenne
		elmt.innerHTML = Math.round(100*Moyenne_G_T)/100;


		let Ecrit_Fr = parseFloat(elmts[21].value) * 5
		let Oral_Fr = parseFloat(elmts[22].value) * 5

		let moy_Epreuve_Fr = (Ecrit_Fr + Oral_Fr) / 10

		elmt = document.getElementById('moy_epreuve_fr');	// sélection de la balise "span", d'id = "moy_bull", où l'on va afficher la moyenne
		elmt.innerHTML = Math.round(100*moy_Epreuve_Fr)/100;


		let Ecrit_Philo = parseFloat(elmts[21].value) * 8
		let Ecrit_sp1 = parseFloat(elmts[22].value) * 16
		let Ecrit_sp2 = parseFloat(elmts[22].value) * 16
		let Grd_orl = parseFloat(elmts[22].value) * 10

		let moy_Epreuve_Term = (Ecrit_Philo + Ecrit_sp1 + Ecrit_sp2 + Grd_orl) / 50
		elmt = document.getElementById('moy_epreuve_Term');	// sélection de la balise "span", d'id = "moy_bull", où l'on va afficher la moyenne
		elmt.innerHTML = Math.round(100*moy_Epreuve_Term)/100;


		let moy_final = (moy_Epreuve_Fr + moy_Epreuve_Term + Moyenne_G_1er + Moyenne_G_T) / 4
		elmt = document.getElementById('note_finale');	// sélection de la balise "span", d'id = "moy_bull", où l'on va afficher la moyenne
		elmt.innerHTML = Math.round(100*moy_final)/100;

	}

