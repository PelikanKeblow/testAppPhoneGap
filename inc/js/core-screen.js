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

function initBoutonsVerts() {
	
	$('.BTvert, .BTvertCourt, .BTrond, img.btimg').each(function(idx) {
		$(this).bind('mousedown touchstart',function(e) {
			$(this).addClass('down');
		});
	});
	
	$('.BTvert, .BTvertCourt, .BTrond, img.btimg').each(function(idx) {
		$(this).bind('mouseup touchend',function(e) {
			$(this).removeClass('down');
		});
	});

}
function initChoixNiveau()
{
	if(isMobile.any()){
		$(".desktop").remove();
	}else{
		$(".mobile").remove();		
	}
	
	
	$('#PanChoixNiveau .itemMode').each(function(idx) {
		
		var bt = $(this).bind('mousedown touchstart',function() {
			
			$('#niveau').val($(this).attr("data"));
			
			hideAndShowDiv('#PanChoixNiveau','#PanInstruction1');
			
		});
	})
	
	$('#PanInstruction1 #close, #PanInstruction2 #close,#PanInstruction3 #close, #PanInstruction3-mob #close').bind('mousedown touchstart',function() {
		$('#mobmod').val($(window).width() < 600 ? 1 : 0);
		hideAndShowDiv('.wrapper','',function() {
			$('#frmImageNiveau').submit();
		});
	});
	
	
	$('#PanInstruction1 #next').bind('mousedown touchstart',function() {
		hideAndShowDiv('#PanInstruction1','#PanInstruction2');
	});
	
	$('#PanInstruction2 #next').bind('mousedown touchstart',function() {
		hideAndShowDiv('#PanInstruction2','#PanInstruction3');
	});
}


/* ------------------------------------------------
 *
 * Montrer / masquer panneaux
 *
 * ------------------------------------------------ */
 


function hideAndShowDiv(divfrom, divnew, callback) {
	
	var callbacktime = 1000;
	if ( (divfrom == '') || (divnew == '') ) {
		callbacktime = 500;
	}
	$(divfrom).animate({'opacity':0},500,function() {
		$(this).css({
			'opacity':0	,
			'display':'none'
		});
	});
	
	if (divnew != '') {
		$(divnew).css({
				'opacity':0	,
				'display':'block'
		});
		setTimeout(function() {
			$(divnew).animate({'opacity':1},500, function() {$(divnew).stop();});
		},500);
	}
	
	if (callback) {
		setTimeout(callback, callbacktime);
	}
	
}



var check = new Array(38,38,40,40,37,39,37,39,66,65);
var indexCode = 0;
function waitFor()
{
	$( window ).keydown(function(e) {
  		
		if(e.keyCode == check[indexCode])
		{
			indexCode++;
		}else{
			indexCode == 0;
		}
		
		if(indexCode>=check.length){
			alert('EXTREEEEEME MODE !!!!!');
			$('#niveau').val(3);
			$('#frmImageNiveau').submit();
		}
		
	});
	
	
}
