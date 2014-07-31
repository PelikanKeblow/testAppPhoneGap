function DiapoPlayer(_indexStart,_max, _label_id, _callbackBefore, _callbackAfter, _onUpdate, _controlTransition, _typeTransition){	
	// const
	var LABEL_SECTION 		= _label_id;
	
	// variables
	var currentSection = _indexStart;
	var nextSection = 0;
	var prevSection = 0;
	var sensMove = 0;
	var totalMove = 0;
	var MaxSection = _max;
	var canMove = false;
	var controlTransition = _controlTransition;
	var typeTransition = _typeTransition;
	
	var INIT_VITESSE = 1000;
	var VITESSE_MOVE = INIT_VITESSE;
	
	var callback_before = _callbackBefore;
	var callback_after = _callbackAfter;
	var callback_onUpdate = _onUpdate;
	
	var start = {};
	var onMove = false;
	
	// private
	var EventEndmoveSection = function EventEndmoveSection()
	{
		canMove = true;
		sensMove = 0
		episode_apparition_section();
		
	}
	
	var episode_apparition_section = function episode_apparition_section()
	{
		
		callback_after(currentSection);
	}
	
	var episode_init_section = function episode_init_section(section)
	{
		callback_before(section);
	}
	
	
	var NextMove = function NextMove(){
		
		var restant = nextSection - currentSection;
		var sens = (restant <0) ? -1:1;
		if(Math.abs(restant)==1){
			moveOne(sens, "easeOutSine", (VITESSE_MOVE/(totalMove+1)), EventEndmoveSection, "A");
		}else{
			moveOne(sens, "linear", (VITESSE_MOVE/(totalMove+1)), NextMove, "");
		}
		
	}
	
	var moveOne = function moveOne(sens, ease, vitesse, callback, condition)
	{
		if(currentSection+sens < MaxSection && currentSection+sens>=0){
			prevSection = currentSection;
			nextSection = currentSection+sens;
			sensMove = sens;
			
			
			canMove = false;	// le mouvement n'est pas autorisé pendant la transition
			
			$(".diapo").hide();
			
			switch(typeTransition){
				case "alpha":
					slideAlpha(sens, ease, vitesse, callback);
				break;
				case "slideH":
					slideHorizontal(sens, ease, vitesse, callback);
				break;
				case "slideV":
					slideVertical(sens, ease, vitesse, callback);
				break;
			}
			
			currentSection += sens;	// attribution du courant en next
			callback_onUpdate(currentSection);
		}
	}
	
	var slideAlpha = function(sens, ease, vitesse, callback)
	{
		$(LABEL_SECTION+(currentSection+sens)).show();
		$(LABEL_SECTION+(currentSection+sens)).css("opacity", 0);
		$(LABEL_SECTION+(currentSection+sens)).transition({opacity:1}, vitesse, ease, function(){
			$(LABEL_SECTION+prevSection).hide();
			callback();
			});
		
		// disparition du background courant
		$(LABEL_SECTION+currentSection).show();
		$(LABEL_SECTION+currentSection).transition({opacity:0}, vitesse,ease);
		
	}
	
	var slideHorizontal = function(sens, ease, vitesse, callback)
	{
		
		var val_moveBackground =($(LABEL_SECTION+(currentSection)).width());
		if(sens<0){
			val_moveBackground = -val_moveBackground;
		}
		
		$(LABEL_SECTION+(currentSection+sens)).show();
		$(LABEL_SECTION+(currentSection+sens)).css("left", val_moveBackground);
		$(LABEL_SECTION+(currentSection+sens)).transition({left:0}, vitesse, ease, function(){
			$(LABEL_SECTION+prevSection).hide();
			callback();
			});
		$(LABEL_SECTION+(currentSection+sens)).css("z-index", 50);
		
		// disparition du background courant
		$(LABEL_SECTION+(currentSection)).show();
		$(LABEL_SECTION+(currentSection)).css("z-index", 51);
		$(LABEL_SECTION+currentSection).transition({left:-val_moveBackground}, vitesse,ease);
		
	}
	
	var slideVertical = function(sens, ease, vitesse, callback)
	{
		
		var val_moveBackground =($(LABEL_SECTION+(currentSection)).height());
		if(sens<0){
			val_moveBackground = -val_moveBackground;
		}
		
		$(LABEL_SECTION+(currentSection+sens)).show();
		$(LABEL_SECTION+(currentSection+sens)).css("top", val_moveBackground);
		$(LABEL_SECTION+(currentSection+sens)).transition({top:0}, vitesse, ease, function(){
			$(LABEL_SECTION+prevSection).hide();
			callback();
			});
		$(LABEL_SECTION+(currentSection+sens)).css("z-index", 50);
		
		// disparition du background courant
		$(LABEL_SECTION+(currentSection)).show();
		$(LABEL_SECTION+(currentSection)).css("z-index", 51);
		$(LABEL_SECTION+(currentSection)).css("top", 0);
		$(LABEL_SECTION+currentSection).transition({top:-val_moveBackground}, vitesse,ease);
		
	}
	
	
	// public
	this.remove = function()
	{
		$("#diapoOverlay").unbind();
	}
	
	this.start = function()
	{
		canMove = true;
	}
	
	this.end = function(callBack){
		$(LABEL_SECTION+currentSection).transition({left:-$(window).width()}, INIT_VITESSE,'easeOutCubic', callBack);
	}

	this.setCaneMove = function(state){ canMove = state; };
	this.getCurrentSection = function(){ return currentSection; }
	this.getNextSection = function(){ return nextSection; }
	this.getPrevSection = function(){ return prevSection; }
	this.getSensMove = function(){ return sensMove; }
	
	this.getMax = function() { return MaxSection; }
	
	this.moveSection = function(sens){
		PmoveSection(sens);
	}
	var PmoveSection = function PmoveSection(sens){
		if(canMove){
			moveOne(sens, "easeOutSine", VITESSE_MOVE, EventEndmoveSection, "AD");
		}
	}
	
	this.moveXSections = function(destination)
	{
		
		if(canMove && destination != currentSection){
			var restant = destination - currentSection;
			var sens =  (restant < 0) ? -1:1;
			totalMove = Math.abs(restant);
			nextSection = destination;
			
			if(totalMove > 1){
				moveOne(sens, "linear", (VITESSE_MOVE/(totalMove+1)), NextMove, "D");
			}else{
				moveOne(sens, "easeOutSine", VITESSE_MOVE, EventEndmoveSection, "AD");
			}
			
			
		}
		
	}
	
	
	
	// constructor
	
	episode_init_section(currentSection);
	
	for(var i=0; i<MaxSection;i++){
		if(i != currentSection){
			$(LABEL_SECTION+i).hide();	
			episode_init_section(i);
		}
		
	}
	
	
	$(LABEL_SECTION+currentSection).css("left", 0);
	$("#diapo").append('<div id="diapoOverlay" class="calage_fullresize_nolimit"></div>');
	
	$("#diapoOverlay").css({"position":"absolute", "z-index":500});
	
	switch(typeTransition)
	{
		case "slideH":
			$("#diapoOverlay").css("cursor", "e-resize");
		break;
		case "slideV":
			$("#diapoOverlay").css("cursor", "s-resize");
		break;
	}
	
	
	// slide EVENT TACTILE
	this.touchStart = function touchStart(e) {
		start.x = event.touches[0].pageX;
		start.y = event.touches[0].pageY;
		onMove = true;
	}
	this.touchEnd = function touchEnd(e) {
		onMove = false;
	}
			
	this.touchMove = function touchMove(e){
		
		if(onMove){
			
			offset = {};
			
			offset.x = start.x - event.touches[0].pageX;
			offset.y = start.y - event.touches[0].pageY;
			
			if(typeTransition == "slideH"){
				DetermineOffsetForTransition(offset.x );
			}else{
				DetermineOffsetForTransition(offset.y );
			}
			
			
		}
		
	
	}
	
	// end EVENT TACTILE
	var DetermineOffsetForTransition = function DetermineOffsetForTransition(offset)
	{
		if(Math.abs(offset)>100){
			if(offset < 0 ){
				PmoveSection(-1);
			}
			if(offset > 0 ){
				PmoveSection(1);	
			}
		}
		
	}
	
	
	// slide EVENT DESKTOP
	this.onPressSlide = function onPressSlide(e) {
		start.x = e.pageX;
		start.y = e.pageY;
		onMove = true;
	}
	this.onReleaseSlide = function onPressSlide(e) {
		onMove = false;
	}
	
	this.onMoveSlide = function onMoveSlide(e) {
		if(onMove){
			offset = {};
	
			offset.x = start.x - e.pageX;
			offset.y = start.y - e.pageY;
			
			if(typeTransition == "slideH"){
				DetermineOffsetForTransition(offset.x );
			}else{
				DetermineOffsetForTransition(offset.y );
			}
		}
	}
	// end slide EVENT DESKTOP
	this.onClic = function onClic(e) {
		PmoveSection(1);
	}
	
	switch(controlTransition)
	{
		case "slideLR":
			if(isMobile.any()){
				$("#diapoOverlay").bind('touchstart', this.touchStart);
				$("#diapoOverlay").bind('touchend',this.touchEnd);
				$("#diapoOverlay").bind('touchmove', this.touchMove);
			}else{
				$("#diapoOverlay").mousedown(this.onPressSlide);
				$("#diapoOverlay").mouseup(this.onReleaseSlide);
				$("#diapoOverlay").mousemove(this.onMoveSlide);
			}
		break;
		case "click":
			$("#diapoOverlay").bind('click', this.onClic);
		break;
			
	}
	
	
	

	
}