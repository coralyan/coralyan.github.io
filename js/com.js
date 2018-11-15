////弹出//////
// popboxBtn：按钮的id
// dialog：弹出窗口的id
function opendsQ(popboxBtn,dialog){
	$(popboxBtn).click(function(){
		var obj=$(dialog);
		var width=obj.width();
		var height=obj.height();
		var popTop=obj.height()/2;
		var popLeft=obj.width()/2;
		var bodyTop=$(window).scrollTop();
		if(document.documentElement.clientHeight < $(dialog).height()){
			obj.css({"top":bodyTop+'px',"position":"absolute","margin-left":-popLeft}).fadeIn();
		}else{
			obj.css({"margin-top":-popTop,"margin-left":-popLeft}).fadeIn();
		}
		return false;
	})
}
function closedsQ(closeBtn,dialog){
	$(closeBtn).click(function(){
		$(dialog).hide();
	})	
}
//// share /////
/**
shareBtn:分享按钮
site：SNS类型，有 qqzone，sinaweibo 可选
**/
function share(shareBtn,site){
	$(shareBtn).click(function(){
		var _url = encodeURI(document.location);  //页面地址
	    var _title = encodeURI(document.title);   //页面标题
	    var _pic = encodeURI("");  //（例如：var _pic='图片url1|图片url2|图片url3....）
	    var _appkey = encodeURI(""); //你从腾讯获得的appkey
	    var _summary = encodeURIComponent(""); //描述
	    if (site == "qqzone") {
			 _u = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + _url + '&title=' + _title + '&pics=' + _pic + '&summary=' + _summary;
	    };
	    if (site == "sinaweibo") {
			var _t = _summary + encodeURI("地址：");
			var _u = 'http://v.t.sina.com.cn/share/share.php?title=' + _t + '&url=' + _url + '&appkey=' + _appkey + '&pic=' + _pic;
	    };
	    window.open(_u, '', 'width=700,height=680,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,location=yes,resizable=no,status=no');
	}) 	  
}
// tabNav: 标签元素
// tabCont: 内容元素
// e : 触发事件 如 click mouseover 
function tabview(tabNav,tabCont,e){
	var tabNav = $(tabNav);
	var tabCont = $(tabCont);
	tabNav.each(function(i){
		$(this).bind(e,function(){
			tabNav.removeClass("current");
			$(this).addClass("current");
			tabCont.removeClass("current");
			tabCont.eq(i).addClass("current");
		})
		if($(this).hasClass("current")){
			$(this).addClass("current");
			tabCont.removeClass("current");
			tabCont.eq(i).addClass("current");
		}
	})
}

//图片滚动
var scrollPics = function(o, autoplay) {
	var ul = $(o).find("ul"),
		li_len = ul.find("li").length,
		li_w = ul.find("li").width(),
		left = $(o).find(".prev"),
		right = $(o).find(".next"),
		timer = null;
	right.click(function() {
		if (!ul.is(":animated")) {
			ul.animate({
				"left": -(ul.find("li").eq(0).width())
			}, 200, function() {
				ul.find("li").eq(0).appendTo(ul);
				ul.css("left", 0);
			})
		}
	});
	left.click(function() {
		if (!ul.is(":animated")) {
			ul.find("li").last().prependTo(ul);
			ul.css("left", -(ul.find("li").eq(0).width()));
			ul.animate({
				"left": 0
			}, 200);
		}
	});
	if (autoplay) {
		timer = setInterval(function() {
			right.trigger("click");
		}, 3000);
		$(o).mouseenter(function() {
			clearInterval(timer);
		})
		$(o).mouseleave(function() {
			clearInterval(timer);
			timer = setInterval(function() {
				right.trigger("click");
			}, 5000);
		})
	};

}

// a：要放大的容器
// id：放大镜
// w：容器的宽度
// h：容器的高度
// retinaW：放大镜的宽度
// retinaH：放大镜的高度 
function glose(a,id,w,h,retinaW,retinaH){
	var left	= 0,
	top		= 0,
	webpage	= $(a),
	retina	= $(id),
	sizes	= { retina: { width:retinaW, height:retinaW }, webpage:{ width:w, height:h } };
	if(navigator.userAgent.indexOf('Chrome')!=-1)
	{
		retina.addClass('chrome');
	}
	webpage.mousemove(function(e){
		offset	= { left: webpage.offset().left, top: webpage.offset().top };
		left = (e.pageX-offset.left);
		top = (e.pageY-offset.top);
		if(retina.is(':not(:animated):hidden')){
			webpage.trigger('mouseenter');
		}
		if(left<0 ||="" top<0="" left=""> sizes.webpage.width || top > sizes.webpage.height)
		{
			if(!retina.is(':animated')){
				webpage.trigger('mouseleave');
			}
			return false;
		}
		retina.css({
			left				: left - sizes.retina.width/2,
			top					: top - sizes.retina.height/2,
			backgroundPosition	: '-'+(1.6*left)+'px -'+(1.35*top)+'px'
		});	
	}).mouseleave(function(){
		retina.stop(true,true).fadeOut('fast');
	}).mouseenter(function(){
		retina.stop(true,true).fadeIn('fast');
	});	
}

$(function(){
	// popbox
	opendsQ("#popboxBtn01","#popbox01");
	opendsQ("#popboxBtn02","#popbox02");
	closedsQ("#closeBtn01","#popbox01");
	closedsQ("#closeBtn02","#popbox02");
	//SNS share 
	share("#shareSina","sinaweibo");
	share("#shareQzoon","qqzone");
    //tab
	tabview("#tab_nav1 li","#tab_cont1 .cont","mouseover");
	tabview("#tab_nav2 li","#tab_cont2 .cont","click");
	//scrollPic
	scrollPics("#img_scroll,true");

	glose('#glose1','#retina1','850','567','300','200');
		
})


$('a[href*=#],area[href*=#]').click(function() {
	    //$(this).addClass("current").siblings("a").removeClass("current");
		$(this).addClass("current").parent("li").siblings("li").find("a").removeClass("current");
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({
					scrollTop: targetOffset
				},
				1000);
				return false;
			}
		}
	});









</0>