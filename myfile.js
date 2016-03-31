$(function(){
	var apps=DATA.appsData;
	var categories=DATA.categories;
	var config={
		html: "",
		arr: [],
		count:0,
		nav:""
	};
	
	//生成所有的app容器
	for(var key in categories) {
		config.html+="<div id='"+categories[key]+"' class='apps-category clearfix'>"+
							"<div class='apps-catehead clearfix'>"+
							"<h2 class='apps-catetitle thin'>"+categories[key]+"</h2>"+
							"<span class='apps-catenum light J_thisCateNum'></span>"+
							"<span class='apps-more J_seeMore'>Read More</span>"+
							"</div>"+
						"</div>";
		config.nav+='<a class="apps-menuitem J_menuItem J_menuitem_'+key+'" href="#'+categories[key]+'">'+categories[key]+'</a>';
		config.arr.push(key);
	}
	//将app容器加入main包裹
	$(".J_main").append(config.html);

	//对所有app数据进行遍历,根据不同的catagoryId属性添加到相应的容器中
	$.each(apps,function(index,item){
		if(item.status==1) {
			childApps(item.categoryId,item);
		}
		
	});
	//app加入容器方法,计算相应种类app的数量
	function childApps(index,data){
		var category=$(".apps-category");
		config.html= '<a class="apps-appbox clearfix J_Apps" id="app_'+data.id+'" href="'+data.storeURL+'" target="_blank">'+
					      '<img class="apps-icon J_appIcon" src="'+data.icon+'">'+
					      '<div class="apps-detail">'+
					        '<h2 class="apps-name J_appName" title="'+data.name+'">'+data.name+'</h2>'+
					        '<h3 class="apps-cate J_appCate">'+categories[index]+'</h3>'+
					        '<h4 class="apps-text J_appText">Google Play</h4>'+
					      '</div>'+
					    '</a>';
		category.eq(index-1).append(config.html);
		config.count=category.eq(index-1).find(".apps-appbox").length;
		category.eq(index-1).find(".apps-catenum").html(config.count);
	}

	//导航条
	$(".J_menuBox").append(config.nav);

	$(window).on("scroll",checkFixed).on("scroll",checkNav);
	function checkFixed(){
		config.arr=[$(".J_logo"), $(".J_heading"), $(".J_desc"), $(".J_menu"), $(".J_goDiscuss")];
		$.each(config.arr, function(index,value){
			if($(document).scrollTop()>90) {
				$(value).addClass("stick");
			}else {
				$(value).removeClass("stick");
			}
		});
	}
	
	function checkNav(){
		var category=$(".apps-category");
		var navs=$(".J_menuItem");
		var scrollTop=$(document).scrollTop();
		$.each(category,function(index, value){
			var top=$(value).offset().top;
			var top_height=top+$(value).get(0).offsetHeight;
			if(scrollTop>(top-100)&&scrollTop<top_height){
				var thisItem=navs.eq(index);
				var _width = thisItem.width() + 40; /* buttons have 20px padding for both sides */
		    		var _left = thisItem.position().left;
				$(".J_highlightBorder").css({
					'left' : _left,
					'width' : _width
				});
			}
		});
	}

	$(".J_seeMore").each(function(index){
		var category=$(".apps-category");
		$(this).click(function(){
			category.eq(index).toggleClass("auto");
			if(category.eq(index).hasClass("auto")) {
				$(this).html("Up");
			}else {
				$(this).html("Read More");
			}
		});
	});
});