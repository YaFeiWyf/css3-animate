$(function(){
	$("#play").click(function(){
		$(this).toggleClass("fa-play").toggleClass("fa-pause");
	});
	$("#volume").click(function(){
		$(this).toggleClass("fa-volume-up").toggleClass("fa-volume-off");
	});

	/*播放进度条控制*/
	/*拖动控制点*/
	var down_hand=function(e){
		// alert("down");
		if(e.target==$("#point").get(0)){
			var me=$("#point");
			var prev_x=e.pageX;
			var new_x, diff_x;
			var prev_left=parseInt(me.css("left"));
			var prev_width=parseInt($("#path").css("width"));
			var move_hand=function(e){
				// alert("move");
				var up_hand=function(){
				// $(document).unbind('mousedown', down_hand);
					$(document).unbind('mousemove', move_hand);
				// $(document).unbind('mouseup', up_hand);
				};
				new_x=e.pageX;
				diff_x=new_x-prev_x;
				setTimeout(function(){
					var cur_left=prev_left+diff_x;
					if(cur_left>=0&&cur_left<=365){
						me.css({
							'left' : function(){
								return cur_left+'px';
							}
						});
						$("#path").css({
							'width' : function(){
								return prev_width+diff_x+'px';
							}
						});
					}
				
				},0);
				$(document).bind("mouseup",up_hand);
			};
			$(document).bind('mousemove' , move_hand);
			// $(document).bind('mouseup',up_hand);
		}
	}
	$(document).bind('mousedown', down_hand);
});
