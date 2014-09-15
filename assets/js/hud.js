

function create_icon(label, _x, _y, animate)
{
	var obj = new Kinetic.Image({ 
		x: _x,
		y: _y,
		image: asset[label]
	});
	
	if(animate != undefined){
		
		switch (animate)
		{
			case "toleft":
				
				var boucle = 2;
				var tween = new Kinetic.Tween({
				  node: obj,
				  x: _x -80,
				  duration: 1.2,
				  easing: Kinetic.Easings.EaseOut,
				  onFinish:function(){
					  boucle--;
					  if(boucle>0){
						this.reset();
					  	this.play();
					  }else{
						 obj.x(_x); 
					  }
					 
				  }
				});
				tween.play();
			break;	
			
		}
		
		
	}

	return obj;
}