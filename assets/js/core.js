$( document ).ready(function() {
	
	loadImages(sources, function(images) {
		asset = images;
        Init();
		
    });

	$(window).resize(function() {pCalage(); }).trigger("resize");
	$(window).on("orientationchange",function() {pCalage(); }).trigger("orientationchange");
	
	
	//setTimeout(pCalage, 1000);
	
});

function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for(var src in sources) {
	numImages++;
  }
  for(var src in sources) {
	images[src] = new Image();
	images[src].onload = function() {
	  if(++loadedImages >= numImages) {
		callback(images);
	  }
	};
	images[src].src = sources[src];
  }
}


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





function pCalage()
{
	if(appStarted){
		var widthTo = $(window).width();
		
		if(isMobile.any()){
			//widthTo = window.screen.width;
		}
		
		$("#myCanvas").width(widthTo);
	
		stage.width($("#myCanvas").width());
		stage.height(stage.width()/RATIO);
	
		new_ratio = $("#myCanvas").width()/INIT_WIDTH;
		main_layer.scale({x:new_ratio,y:new_ratio});
		main_layer.draw();
	}	
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




