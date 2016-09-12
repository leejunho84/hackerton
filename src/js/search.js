(function($, ns){
	var pattern = /(https|http):\/\//;
	var formTemplate = '<form id="favorite-search" action="/search" method="POST" enctype="multipart/form-data">{{input}}</form>';
	var inputTemplate = '<div class="component-radio"><input type="radio" name="chkimg" id="chkimg_{{index}}" value="{{images}}" /><label for="chkimg_{{index}}"><img src="{{images}}" /><i class="glyphicon glyphicon-ok"></i><span class="dim"></span></label></div>';
	if($('.layer-pop').length > 0) var modalLayer = new ht.modalLayer().init({
			callbackFunc:function(){
				var form = $('#favorite-search');
				if(form.find(':radio[name="chkimg"]:checked').length > 0){
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
		this.photoForm = $('#photosent');
		this.searchForm = $('#searchSent');

		return this;
	}
	SearchModule.prototype.addEvent = function(){
		var _that = this;
		this.searchInput.on({
			'focusin':function(){
				$(document).on('keydown', function(e){
					if(e.keyCode == 13){
						e.preventDefault();
						_that.ajaxData('/json/ajaxSearch.json');
					}
				});
			},
			'focusout':function(){
				$(document).off('keydown');				
			}
		});

		this.searchBtn.on('click', function(e){
			e.preventDefault();
			var val = _that.searchInput.val();
			if(pattern.test(val)){
				_that.searchForm.submit();
			}else{
				_that.ajaxData('/ajaxSearch');
				//_that.ajaxData('/json/ajaxSearch.json');
			}
		});

		this.searchCapture.on('change', function(){
			console.log('change');
			_that.photoForm.submit();
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
			data:{'sType':'', 'q':this.searchInput.val()},
			method:'POST',
			dataType: "JSON",
			success:function(data){
				modalLayer.appendHtml(_that.makeTemplate(data));
			}
		});
	}
	SearchModule.prototype.makeTemplate = function(data){
		//var arrCrawling = ['daumList', 'tingleList', 'instagramList'];
		var arrCrawling = ['daumList'] // 다음, 팅글, 인스타그램 데이터 images 키 값이 다름 일단 다음만
		var appendTxt = formTemplate.replace(/{{input}}/, function(){
			var txt = '';
			for(var i=0; i<arrCrawling.length; i++){
				for(var key in data[arrCrawling[i]]){
					txt += inputTemplate.replace(/{{index}}/g, key).replace(/{{images}}/g, data[arrCrawling[i]][key].image);
				}
			}

			return txt;
		});
		return appendTxt;
	}

	ns['searchModule'] = SearchModule;
})(jQuery, window.ht = window.ht || {});










