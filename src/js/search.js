(function($, ns){
	var pattern = /(https|http):\/\//;
	var formTemplate = '<form id="favorite-search" action="/search" method="POST" enctype="multipart/form-data">{{input}}</form>';
	var inputTemplate = '<div class="component-radio"><input type="radio" name="chkimg" id="chkimg_{{index}}" /><label for="chkimg_{{index}}"><img src="{{images}}" /><i class="glyphicon glyphicon-ok"></i><span class="dim"></span></label></div>';
	if($('.layer-pop').length > 0) var modalLayer = new ht.modalLayer().init({
			callbackFunc:function(){
				var form = $('#favorite-search');
				if($(':radio[name="chkimg"]:checked')){
					form.submit();
				}else{
					alert('image select please.');
				}
			}
		});

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
				modalLayer.appendHtml(_that.makeTemplate(data));
			}
		});
	}
	SearchModule.prototype.makeTemplate = function(data){
		var appendTxt = formTemplate.replace(/{{input}}/, function(match){
			var txt = '';
			for(var key in data.tingleList){
				appendTxt += inputTemplate.replace(/{{index}}/g).replace(/{{images}}/g);	
			}

			return match + txt;
		});
		return appendTxt;
	}

	ns['searchModule'] = SearchModule;
})(jQuery, window.ht = window.ht || {});










