
$(function(){
	"use strict";

	if($('.swiper-container').length > 0) var swipe = new ht.slideSwipe('.swiper-container').init();
	var searchModule = new ht.searchModule().init().addEvent();

	$(window).resize(function(e){
		if($('.swiper-container')) swipe.resize();
	});
});