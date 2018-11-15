// a：要放大的容器
// id：放大镜
// w：容器的宽度
// h：容器的高度
function glose(a,id,w,h){
	var left	= 0,
	top		= 0,
	sizes	= { retina: { width:300, height:200 }, webpage:{ width:w, height:h } },
	webpage	= $(a),
	retina	= $(id);
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
	glose('#glose1','#retina1','850','567');
});</0>