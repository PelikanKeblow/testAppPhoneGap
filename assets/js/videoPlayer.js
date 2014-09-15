
function VideoPlayer(param){
	
	var content_id;
	var video_id;
	var video_path;
	var video_file;
	var format;
	var size;
	var onComplete;
	
	// initialisation
	
	content_id = param.content_id;
	video_id = param.video_id;
	video_path = param.video_path;
	video_file = param.video_file;
	format = param.format;
	size = param.size;
	onComplete = param.onComplete;
	
	// methodes public
	
	
	// methodes private
	var _createPlayer = function _createPlayer()
	{
		// set balise
		$("#"+content_id).append('<video id="'+video_id+'" class="calage_fullresize" controls></video>');
		
		// set video format
		for(var i=0;i< format.length; i++)
		{
			$("#"+video_id).append('<source src="'+video_path+video_file+'.'+format[i]+'" type="video/'+format[i]+'">');
		}
		$("#"+content_id).bind("click", function(){
				document.getElementById(video_id).play();
				
			});
		
		
		// define size
		
		// define onComplete
		$("#"+video_id).bind("ended", onComplete);
		
	}
	
	_createPlayer();
	
}