$(function(){
	
	// $(document).click(function(){
	// 	// duplicate=$("#content");
	var duplicate=$(".content-wrapper").clone(true);
	$("<div class='content-blurred'></div>").append(duplicate);
	// contentBlurred = $(".content-blurred");
	$(".nav").append(duplicate.parent());
	// alert(duplicate.parent().length);
	// alert($(".nav").html());
	// });
	var translation;
	$(document).scroll(function(){
		// alert(this);
		translation = 'translate3d(0,' + (-$(this).scrollTop()-135+'px')+',0)';
		duplicate.css({
			'-webkit-transform' : translation,
			'-moz-transform' : translation,
			'transform' : translation
		});
	});
	// contentWrapper.scrollTop(140);
	$(".content-blurred .control").remove();
});