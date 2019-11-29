var request = "http://localhost:8888/APImyNetflix/api.php?";

function remplitCbJours(field){
	////////////// COMBO DES JOURS
	for (var i = 1; i <= 31; i++){
		var newOption = new Option();
		newOption.value = i;
		newOption.text = i;
		field.options.add(newOption);
	}
}

function remplitCbAnnees(field){
	////////////// COMBO DES ANNEES
	for (var i = 2049; i >= 1929; i--){
		field.options.add(new Option(i,i));
	}
}

function remplitCbMois(field){
	////////////// COMBO DES MOIS
	var tabMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	for (var i = 1; i <= tabMois.length; i++){
		field.options.add(new Option(tabMois[i - 1], i));
	}
}

function remplitCbRealisateurs(field){
	var xmlHttpReal = getAjaxRequestObject();

	xmlHttpReal.onreadystatechange = function (){
		if (this.readyState === 4 && this.status === 200){
			var lesRealisateurs = JSON.parse(this.responseText);
			lesRealisateurs.sort(function (a, b){
				if (a.nom + ' ' + a.prenom < b.nom + ' ' + b.prenom){
					return -1;
				}else if (a.nom + ' ' + a.prenom > b.nom + ' ' + b.prenom){
					return 1;
				}else{
					return 0;
				}
			});

			for (var i = 0; i < lesRealisateurs.length; i++){
				var id = lesRealisateurs[i].id;
				var nom = lesRealisateurs[i].nom + ' ' + lesRealisateurs[i].prenom;
				field.options.add(new Option(nom, id));
			}
		}
	};
	xmlHttpReal.open("GET", request + "data=personnes&idfonction=4");
	xmlHttpReal.send();
}