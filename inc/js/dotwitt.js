/**
*
*	doTwit
*	msg : le message en string
* 	u : l'url à passer
* 	créé à la volée un formulaire, balance le twit et supprime le tout ni vu ni connu
*
**/
function doTwit(msg,u){


	var theform, thestatus;
	if (document.forms['doctwitt'] == undefined) {
		theform = document.createElement("form");
		theform.setAttribute("id","doctwitt");
		theform.setAttribute("name","doctwitt");
		theform.setAttribute("method","get");
		theform.setAttribute("target","doctwitt");
		theform.setAttribute("action","https://twitter.com/home");
		theform.setAttribute("enctype","application/x-www-form-urlencoded");
		
		document.body.appendChild(theform);
		
		thestatus = document.createElement("input");
		thestatus.setAttribute("type","hidden");
		thestatus.setAttribute("id","status");
		thestatus.setAttribute("name","status");
		thestatus.setAttribute("value",msg);
		
		theform.appendChild(thestatus);
		
	} else {
		document.forms['doctwitt'].status.value = msg;
	}
	
	theform.submit();
	theform.parentNode.removeChild(theform);

}
