(function($, ns){
	var pattern = /(https|http):\/\//;
	var SearchModule = function(){return this;}
	SearchModule.prototype.init = function(){
		this.searchInput = $('.search-input');
		this.searchBtn = $('.search-btn');
		this.searchCapture = $('#capture');
		this.photoForm = $('#photoSent');
		this.searchForm = $('#searchSent');

		return this;
	}
	SearchModule.prototype.addEvent = function(){
		var _that = this;
		this.searchInput.on({
			'focusin':function(){
				console.log('focusin');
			},
			'focusout':function(){
				console.log('focusout');
			}
		});

		this.searchBtn.on('click', function(e){
			e.preventDefault();
			var val = _that.searchInput.val();
			if(pattern.test(val)){
				_that.searchForm.submit();
			}else{
				_that.ajaxData('/ajaxSearch');
			}
		});

		this.searchCapture.on('change', function(){
			this.photoForm.submit();
			/*var reader = new FileReader();
			reader.readAsDataURL(this.files[0]);
			reader.onload = function (e){
				console.log(e.target.result);
			}*/
		});
	}
	SearchModule.prototype.ajaxData = function(url){
		var _that = this;
		$.ajax({
			url:url,
			data:{'sType':this.searchInput.val()},
			method:'POST',
			dataType: "html",
			success:function(data){
				_that.makeTemplate(data);
			}
		});
	}
	SearchModule.prototype.makeTemplate = function(data){
		console.log(data);
	}

	ns['searchModule'] = SearchModule;
})(jQuery, window.ht = window.ht || {});










