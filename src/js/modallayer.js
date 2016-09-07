(function($, ns){
	"use strict";

	var ModalLayer = function(){
		return this;
	}
	ModalLayer.prototype.init = function(){
		var _that = this;
		_that.wrap = $('.layer-pop');
		_that.closeBtn = _that.wrap.find('.close-btn');
		//_that.checkboxLabel = $('.checkbox-label');
		//_that.clickIS = false;

		_that.closeBtn.on('click', function(e){
			e.preventDefault();
			_that.closeModal();
		});

		/*_that.checkboxLabel.on('click', function(e){
			if(_that.clickIS){
				_that.clickIS = false;
				_that.checkboxLabel.removeClass('checked');
				localStorage.removeItem('todayEndTime');
			}else{
				_that.clickIS = true;
				_that.checkboxLabel.addClass('checked');
				localStorage.setItem('todayEndTime', _that.rtnEndTime());
			}
		});*/
		return _that;
	}
	ModalLayer.prototype.rtnEndTime = function(){
		var newDate = new Date();
		var endDate = new Date(Date.parse(newDate) + 1 * 1000 * 60 * 60 * 24).getTime();
		return endDate;
	}
	ModalLayer.prototype.todayChk = function(){
		var endTime = parseInt(localStorage.getItem('todayEndTime'));
		var nowTime = new Date().getTime();
		if(endTime){
			if(nowTime > endTime){
				localStorage.removeItem('todayEndTime');
				this.openModal();
			}
		}else{
			this.openModal();
		}
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