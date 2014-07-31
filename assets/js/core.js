$( document ).ready(function() {
	start();
	

	$(window).resize(function() {pCalage(); }).trigger("resize");
	$(window).on("orientationchange",function() {pCalage(); }).trigger("orientationchange");
	
	
	
	
});


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


function saveData(niveau, score){
	localStorage["nesquik.game.bol.niv"+niveau] = score;
}


function pCalage()
{
	
	var widthTo = $(window).width();
	
	if(isMobile.any()){
		//widthTo = window.screen.width;
	}
	
	$("#myCanvas").width(widthTo);

	stage.width($("#myCanvas").width());
	stage.height(stage.width()/RATIO);
	
	
	
	new_ratio = $("#myCanvas").width()/INIT_WIDTH;
	main_layer.scale({x:new_ratio,y:new_ratio});
	
	
	
}

function NumberDecal(numberTo)
{
	if(numberTo <10){
		return "0"+numberTo;
	}
	return numberTo;
}

function SecondeToTime(timeBrut)
{
	var minutes = Math.floor(timeBrut/60);
	var secondes = timeBrut - minutes*60;
	
	return minutes+":"+NumberDecal(secondes);
}




