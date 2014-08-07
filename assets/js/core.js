var debug = true;

$( document ).ready(function() {
	
	loadImages(sources, function(images) {
		asset = images;
		setTimeout(Init, 1000);
		$("#loading").addClass('hide');
       
    });
	
	calageManager = new Calage();
	calageManager.add("calageCanvas", CalageCanvas);
	
	if(debug){
		addDebug();
	}
	
});

function addDebug()
{
	$("body").append("<div id='debug'></div>");
	$("#debug").append("<a href='index.html' class='debug_back'>Back</a>");
}

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





function CalageCanvas()
{
	
	if(appStarted){
		var widthTo = $(window).width();
		
		if(isMobile.any()){
			//widthTo = window.screen.width;
		}
		
		$("#myCanvas").width(widthTo);
	
		stage.width($("#myCanvas").width());
		stage.height(Math.ceil(stage.width()/RATIO));
	
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




