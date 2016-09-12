(function($, ns){
	"use strict";

	var ModalLayer = function(){
		return this;
	}
	ModalLayer.prototype.init = function(opts){
		var _that = this;
		_that.wrap = $('.layer-pop');
		_that.closeBtn = _that.wrap.find('.close-btn');
		_that.confirmBtn = _that.wrap.find('button');
		_that.appendBody = _that.wrap.find('.modal-body');

		_that.closeBtn.on('click', function(e){
			e.preventDefault();
			_that.closeModal();
		});

		_that.confirmBtn.on('click', function(e){
			e.preventDefault();
			if(typeof opts.callbackFunc == 'function'){
				opts.callbackFunc();
			}else{
				_that.closeModal();
			}
		});

		return _that;
	}
	ModalLayer.prototype.appendHtml = function(template){
		this.appendBody.html(template);
		this.openModal();
	}
	ModalLayer.prototype.openModal = function(){
		this.wrap.css({'display': 'block'});
		$('body').addClass('fixed');
	}
	ModalLayer.prototype.closeModal = function(){
		this.wrap.removeAttr('style');
		$('body').removeClass('fixed');
	}

	ns['modalLayer'] = ModalLayer;
})(jQuery, window.ht = window.ht || {});