$(function(){
	var hidden, state, visibilityChange;
	if(typeof document.hidden !== 'undefined') {
		hidden="hidden";
		visibilityChange="visibilitychange";
		state="visibilityState";
	}else if (typeof document.mozHidden !== 'undefined') {
		hidden="mozHidden";
		visibilityChange="mozvisibilitychange";
		state="mozVisibilityState";
	}
	else if (typeof document.webkitHidden !== 'undefined') {
		hidden="webkitHidden";
		visibilityChange="webkitvisibilitychange";
		state="webkitVisibilityState";
	}else if (typeof document.msHidden !== 'undefined') {
		hidden="msHidden";
		visibilityChange="msvisibilitychange";
		state="msVisibilityState";
	}
	// $(document).on("visibilityChange", function(e){
	// 	$("title").html("mei you kan wo ");
	// },false);
	

	document.addEventListener(visibilityChange, function(e) {
		  // Start or stop processing depending on state
		 $("title").html(document[state]);
	}, false);
	$("title").html(document[state]);
});