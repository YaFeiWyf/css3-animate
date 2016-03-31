$(function(){
	var Media=$(".v_wrapper video").get(0);
	/*视频样式初始化，包括主要设置进度条的速度与视频长度之间的关系*/
	
	var track_width=parseInt($("#track").css("width"));
	var tot_time=Media.duration;
	var point_speed=(parseInt($("#track").css("width"))-15)/tot_time;
	/*设置视频总时间的显示*/
	set_tottime();
	/*播放按钮点击事件*/
	$("#play").click(function(){
		$(this).toggleClass("fa-play").toggleClass("fa-pause");
		if(Media.paused) {
			Media.play();
		}else {
			Media.pause();
		}
	});
	$(document).click(function(e){
		if(e.target==Media) {
			$("#play").toggleClass("fa-play").toggleClass("fa-pause");
		}
	});
	/*音量按钮点击事件*/
	$("#volume").click(function(){
		$(this).toggleClass("fa-volume-up").toggleClass("fa-volume-off");
		if($(this).hasClass("fa-volume-off")) {
			Media.muted=true;
		}else {
			Media.muted=false;
		}
	});
	/*Media 事件监听,监听视频正在播放的状态，timeupdate*/
	$(Media).on('timeupdate', function(){
		var cur_t=Media.currentTime;
		set_curtime();
		/*控制点事件和进度条事件*/
		$("#point").css({
			'left' : function(){
				return point_speed*cur_t+'px';
			}
		});
		$("#path").css({
			'width' : function(){
				return parseInt($("#point").css("left"))+9+'px';
			}
		});
	}).on('ended', function(){
		$("#play").removeClass("fa-pause").addClass("fa-play");
	});

	/*播放进度条控制*/
	/*拖动控制点事件*/
	var down_hand=function(e){
		// alert("down");
		if(e.target==$("#point").get(0)){
			var me=$("#point");
			var prev_x=e.pageX;
			var new_x, diff_x;
			var prev_left=parseInt(me.css("left"));
			var prev_width=parseInt($("#path").css("width"));
			var move_hand=function(e){
				var up_hand=function(){
					// $(document).off('mousedown', down_hand);
					$(document).off('mousemove', move_hand);
					// $(document).off('mouseup', up_hand); 
				};
				new_x=e.pageX;
				diff_x=new_x-prev_x;
				setTimeout(function(){
					var cur_left=prev_left+diff_x;
					if(cur_left>=-1&&cur_left<=355){
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
						/*设置拖动进度条的时候视频的播放位置*/
						Media.currentTime=parseInt(me.css("left"))/point_speed;
						set_curtime();
					}
				},0);
				$(document).on("mouseup",up_hand);
			};
			$(document).on('mousemove' , move_hand);
		}
	}
	$(document).on('mousedown', down_hand);

	/*点击进度条上的某个时间点的事件*/
	$("#track").click(function(e){
		var path=$("#path");
		var diff_pos=e.pageX-path.offset().left;
		$("#point").css({
			'left' : diff_pos-9+'px'
		});
		var left=parseInt($("#point").css("left"));
		path.css({
			'width' : diff_pos+'px'
		});
		Media.currentTime=left/point_speed;
		set_curtime();
		if(Media.paused) {
			$("#play").removeClass("fa-pause").addClass("fa-play");
		}
	});

	/*全屏按钮点击事件*/
	var fullscreen=function(){
		var docElm = Media; 
		//W3C 
		if (docElm.requestFullscreen) { 
		    docElm.requestFullscreen(); 
		} 
		//FireFox 
		else if (docElm.mozRequestFullScreen) { 
		    docElm.mozRequestFullScreen(); 
		} 
		//Chrome等 
		else if (docElm.webkitRequestFullScreen) { 
		    docElm.webkitRequestFullScreen(); 
		} 
		//IE11 
		else if (docElm.msRequestFullscreen) { 
		    // docElm.msRequestFullscreen();
		    return true;
		}
		else {
			return true;
		}
	}

	$("#full_s").click(function(){
		if(fullscreen()) {
			alert("您的浏览器不支持全屏显示模式...");
		}else {
			fullscreen();
		}	
	});

	/*设置显示当前时间的方法*/
	function set_curtime() {
		$("#cur_time").html(function(){
			var cur_m,cur_s;
			var cur_t=Media.currentTime;
			cur_m=parseInt(cur_t/60);
			cur_s=parseInt(cur_t%60);
			if(cur_s<10) {
				cur_s='0'+cur_s;
			}
			return cur_m+':'+cur_s;
		});
	}

	/*设置显示总前时间的方法*/
	function set_tottime(){
		$("#tot_time").html(function(){
			var tot_m,tot_s;
			var tot_t=Media.duration;
			tot_m=parseInt(tot_t/60);
			tot_s=parseInt(tot_t%60);
			if(tot_s<10) {
				tot_s='0'+tot_s;
			} 
			return tot_m+':'+tot_s;
		});
	}
});



