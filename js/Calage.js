
function Calage(){
	
	var sizeWidth;
	var sizeHeight;
	var MIN_WIDTH = 1024;
	var MIN_HEIGHT = 620;
	
	var calageListe = new Object();
	
	this.calage = function()
	{
		pCalage();
	}
	
	this.add = function(id, callback)
	{
		calageListe[id] = callback;
	}
	
	this.remove = function(id)
	{
		delete calageListe[id];
	}	
	
	var pCalage = function pCalage()
	{
		sizeWidth = Math.max(MIN_WIDTH,$(window).width());
		sizeHeight = Math.max(MIN_HEIGHT,$(window).height());
		
		// full resize
		$(".calage_fullresize").each(function(index, element) {
            $(element).width(sizeWidth);
			$(element).height(sizeHeight);
        });
		$(".calage_fullresize_nolimit").each(function(index, element) {
            $(element).width($(window).width());
			$(element).height($(window).height());
        });
		$(".calage_fullratio").each(function(index, element) {
            
			var ratio = MIN_WIDTH / MIN_HEIGHT;
		    
		    $(element).width(sizeWidth);
			$(element).height(sizeWidth/ratio);
			
			if($(element).height() < sizeHeight  ){
				$(element).height(sizeHeight);
				$(element).width(sizeHeight*ratio);
			}
        });
		

		
		$(".calage_fullwidth").each(function(index, element) {
            $(element).width(sizeWidth);
        });
		$(".calage_fullheight").each(function(index, element) {
            $(element).height(sizeHeight);
        });
		
		$(".calage_center").each(function(index, element) {
			$(element).css("top", sizeHeight*0.5 - $(element).height()*0.5);
            $(element).css("left", sizeWidth*0.5 - $(element).width()*0.5);
        });
		
		$(".calage_center_parent").each(function(index, element) {
			
			var parent = $($(element).parent());
			
			$(element).css("top", parent.height()*0.5 - $(element).height()*0.5);
            $(element).css("left", parent.width()*0.5 - $(element).width()*0.5);
        });
		
		
		
		$(".calage_center_nolimit").each(function(index, element) {
			$(element).css("top", $(window).height()*0.5 - $(element).height()*0.5);
            $(element).css("left", $(window).width()*0.5 - $(element).width()*0.5);
        });
		$(".calage_center_vert").each(function(index, element) {
			$(element).css("top", sizeHeight*0.5 - $(element).height()*0.5);
        });
		$(".calage_center_horz").each(function(index, element) {
			$(element).css("left", sizeWidth*0.5 - $(element).width()*0.5);
        });
		
		$(".calage_relative_center_vert").each(function(index, element) {
			$(element).css("margin-top", sizeHeight*0.5 - $(element).height()*0.5);
        });
		
		
		// calage object list
		for(var item in calageListe) {
			calageListe[item](sizeWidth, sizeHeight);
			
		}
		
	}
	
	$(window).resize(function() {pCalage(); }).trigger("resize");
}