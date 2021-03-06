(function($, ns){
	var UserAgentChk = (function(){
		"use strict";

		var browser = '';
		var device = '';
		var version = '';
		var Agent = function(){
			var that = this;
			that.init();
		}

		Agent.prototype = {
			init:function(){
				var devicePattern = "win16|win32|win64|mac";
				var agentInfo = navigator.userAgent.toLowerCase();
				if (agentInfo.indexOf("chrome") != -1){
					browser = 'Chrome';
				}else if(agentInfo.indexOf("opera") != -1){
					browser = 'Opera';
				}else if(agentInfo.indexOf("firefox") != -1){
					browser = 'Firefox';
				}else if(agentInfo.indexOf("safari") != -1){
					browser = 'Safari';
				}else if(agentInfo.indexOf("msie") != -1){
					browser = 'IE';
					/*var re = new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(agentInfo) != null){
						version = parseFloat(RegExp.$1);
					}*/
				}else{
					browser = 'IE';
				}

				if(navigator.platform){
				    if(devicePattern.indexOf(navigator.platform.toLowerCase())<0){
				    	device = 'MOBILE';
				    }else{
				    	device = 'PC';
				    }
				}

				version = $.browser.version;
			},
			getBrowser:function(){
				return {
					browser:browser,
					version:version
				}
			},
			getDevice:function(){
				return device;
			}
		}

		return new Agent();
	})();

	var Support = {
		addEvent:function($target, evt, func){
			if(window.addEventListener || document.addEventListener){
				$target.addEventListener(evt, func);
			}else{
				$target.attachEvent('on'+ evt, func);
			}
		},
		removeEvent:function($target, evt, func){
			if(window.addEventListener){
				$target.removeEventListener(evt, func);
			}else{
				$target.detachEvent('on'+ evt, func);
			}
		},
		touch : (window.Modernizr && Modernizr.touch === true) || (function () {
			'use strict';
			return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
		})(),
		transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
			'use strict';
			var div = document.createElement('div').style;
			return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
		})(),
		transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
			'use strict';
			var div = document.createElement('div').style;
			return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
		})(),
		transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
			'use strict';
			var div = document.createElement('div').style;
			return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
		})()
	}

	ns['support'] = Support;
	ns['agentChk'] = UserAgentChk;
})(jQuery, window.ht = window.ht || {});