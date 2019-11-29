var request = "http://localhost:8888/APImyNetflix/api.php?";

function getListeSeries(table){
	var xmlHttpSeries = getAjaxRequestObject();
	var tableSaisons = document.querySelector("#tbSaisons>tbody");
	xmlHttpSeries.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var text= this.responseText;
			var lesSeries = JSON.parse(text);
			lesSeries.sort(function(a, b){
				if (a.nom < b.nom){
					return -1;
				}else if (a.nom > b.nom){
					return 1;
				}else{
					return 0;
				}
			});

			for(var i=0;i<lesSeries.length;i++){
				var row = table.insertRow(i);
				var cellnom = row.insertCell(0);
				var cellannee = row.insertCell(1);
				var cellSaisons = row.insertCell(2);
				cellnom.innerText = lesSeries[i].nom;
				cellannee.innerText = lesSeries[i].anneeparution;
				getNbSaisons(lesSeries[i].id, cellSaisons);
				row.setAttribute("tag", lesSeries[i].id);
				/*row.setAttribute("onclick", getSaisons());*/
				cellnom.style.textAlign = "left";
				cellnom.style.paddingLeft = "10px";

				row.onclick = function(){
					deleteRows(tableSaisons);
					getDetailsSaison(tableSaisons, this.getAttribute("tag"));
				}
			}
		}
	};
	xmlHttpSeries.open("GET", request + "data=series");
	xmlHttpSeries.send();
}

function getSaisons(id){
	console.log(id);
	var xmlHttpSaisons = getAjaxRequestObject();
	xmlHttpSaisons.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			try{
				console.log(JSON.parse(this.responseText));
			}catch (e){
				console.log('Pas de saisons');
			}
		}
	};
	xmlHttpSaisons.open("GET", request + "data=saisons&idserie=" + id);
	xmlHttpSaisons.send();
}

function getNbSaisons(id, cellule){
	var nbSaisons = 0;
	var xmlHttpSaisons = getAjaxRequestObject();
	xmlHttpSaisons.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			try{
				nbSaisons = JSON.parse(this.responseText).length;
			}catch (e){
				nbSaisons = 0;
			}
			cellule.innerText = nbSaisons;
		}
	};
	xmlHttpSaisons.open("GET", request + "data=saisons&idserie=" + id);
	xmlHttpSaisons.send();
}

function getEpisodes(table, id){
	var xmlHttpEpisodes = getAjaxRequestObject();
	var tableEpisodes = document.querySelector("#tbEpisodes>tbody");
	xmlHttpEpisodes.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var text= this.responseText;
			if (text != "Aucun enregistrement ne correspond à la demande") {
				var lesEpisodes = JSON.parse(text);
				lesEpisodes.sort(function(a, b){
					if (a.nom < b.nom){
						return -1;
					}else if (a.nom > b.nom){
						return 1;
					}else{
						return 0;
					}
				});

				for(var i=0;i<lesEpisodes.length;i++){
					var row = table.insertRow(i);
					var cellnum = row.insertCell(0);
					var celltitre = row.insertCell(1);
					cellnum.innerText = lesEpisodes[i].numero;
					celltitre.innerText = lesEpisodes[i].titre;
					
					row.setAttribute("tag", lesEpisodes[i].id);
					/*row.setAttribute("onclick", getSaisons());*/

				}
			}
			
		}
	};
	xmlHttpEpisodes.open("GET", request + "data=episodes&idsaison=" +id);
	xmlHttpEpisodes.send();
}

function getDetailsSaison(table, id){
	var xmlHttpSaisons = getAjaxRequestObject();
	var tableEpisodes = document.querySelector("#tbEpisodes>tbody");
	xmlHttpSaisons.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var text= this.responseText;
			if (text != "Aucun enregistrement ne correspond à la demande") {
				var lesSaisons = JSON.parse(text);
				lesSaisons.sort(function(a, b){
					if (a.nom < b.nom){
						return -1;
					}else if (a.nom > b.nom){
						return 1;
					}else{
						return 0;
					}
				});

				for(var i=0;i<lesSaisons.length;i++){
					var row = table.insertRow(i);
					var cellNumSaison = row.insertCell(0);
					var cellAnneeDiff = row.insertCell(1);
					var cellNbEpisodes = row.insertCell(2);
					cellNumSaison.innerText = lesSaisons[i].numero;
					cellAnneeDiff.innerText = lesSaisons[i].annee_diffusion;
					getNbEpisodes(lesSaisons[i].id, cellNbEpisodes);
					row.setAttribute("tag", lesSaisons[i].id);
					cellNumSaison.style.textAlign = "left";
					cellNumSaison.style.paddingLeft = "10px";

					row.onclick = function(){
						deleteRows(tableEpisodes);
						getEpisodes(tableEpisodes, this.getAttribute("tag"));
					}	

				}
			}

		}
	};
	xmlHttpSaisons.open("GET", request + "data=saisons&idserie="+id);
	xmlHttpSaisons.send();
}	



function getNbEpisodes(id, cellule){
	var nbEpisodes = 0;
	var xmlHttpEpisodes = getAjaxRequestObject();
	xmlHttpEpisodes.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			try{
				nbEpisodes = JSON.parse(this.responseText).length;
			}catch (e){
				nbEpisodes = 0;
			}
			cellule.innerText = nbEpisodes;
		}
	};
	xmlHttpEpisodes.open("GET", request + "data=episodes&idsaison=" +id);
	xmlHttpEpisodes.send();

}

function deleteRows(table) {
	table.innerHTML = "";
}

