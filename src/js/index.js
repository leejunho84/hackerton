$(function(){
	"use strict";

	if($('.swiper-container').length > 0) var swipe = new ht.slideSwipe('.swiper-container').init();
	if($('.layer-pop').length > 0) var modalLayer = new ht.modalLayer().init();
	
	$('.search-btn').click(function(e){
		modalLayer.openModal();
	});

	$(window).resize(function(e){
		swipe.resize();
	});

	$('#capture').change(function(){
		console.log(this.files);
		var reader = new FileReader();
		reader.readAsDataURL(this.files[0]);
		reader.onload = function (e) {
			console.log(e.target.result);
			//$target.css('display', '');
			//$target.html('<img src="' + e.target.result + '" border="0" alt="" />');
		}
	});
});