/*
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function($){$.fn.raptorize=function(options){var defaults={enterOn:"click",delayTime:5000};var options=$.extend(defaults,options);return this.each(function(){var _this=$(this);var audioSupported=true;var raptorImageMarkup='<img id="elRaptor" style="display: none" src="/static/img/raptor.png" />';var raptorAudioMarkup='<audio id="elRaptorShriek" preload="auto"><source src="/static/sounds/raptorize/raptor-sound.mp3" /><source src="/static/sounds/raptorize/raptor-sound.ogg" /></audio>';var locked=false;$("body").append(raptorImageMarkup);if(audioSupported){$("body").append(raptorAudioMarkup);}var raptor=$("#elRaptor").css({position:"fixed",bottom:"-700px",right:"0",display:"block"});function init(){locked=true;if(audioSupported){function playSound(){document.getElementById("elRaptorShriek").play();}playSound();}raptor.animate({bottom:"0"},function(){$(this).animate({bottom:"-130px"},100,function(){var offset=(($(this).position().left)+400);$(this).delay(300).animate({right:offset},2200,function(){raptor=$("#elRaptor").css({bottom:"-700px",right:"0"});locked=false;});});});}if(options.enterOn=="timer"){setTimeout(init,options.delayTime);}else{if(options.enterOn=="click"){_this.bind("click",function(e){e.preventDefault();if(!locked){init();}});}else{if(options.enterOn=="konami-code"){var kkeys=[],konami="38,38,40,40,37,39,37,39,66,65";$(window).bind("keyup.Raptorize",function(event){kkeys.push(event.keyCode);if(kkeys.toString().indexOf(konami)>=0){init();$(window).unbind("keyup.Raptorize");}});}}}});};})(jQuery);

