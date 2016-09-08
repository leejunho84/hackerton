
$(function(){
	"use strict";

	if($('.swiper-container').length > 0) var swipe = new ht.slideSwipe('.swiper-container').init();
	if($('.layer-pop').length > 0) var modalLayer = new ht.modalLayer().init();
	var searchModule = new ht.searchModule().init().addEvent();

	
	$('.search-btn').click(function(e){
		modalLayer.openModal();
	});

	$(window).resize(function(e){
		swipe.resize();
	});
});