var calc = document.getElementsByClassName('basic-calc-embed');
var conv = document.getElementsByClassName('unit-conv-embed');
var perc = document.getElementsByClassName('percentCalc-embed');

var isMobile = 0;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = 1;
}


adapt();

window.addEventListener("resize", adapt)

function adapt(argument) {
	if(calc.length > 0){
		for (var i = calc.length - 1; i >= 0; i--) {
			var width = calc[i].offsetWidth;calc[i].style.paddingBottom = (width>596) ? (width * 0.428 + "px") : (width * 1.19 + "px");}
		}
	 
	if(conv.length > 0){
		for (var i = conv.length - 1; i >= 0; i--) {
			var width = conv[i].offsetWidth;
			if(isMobile) conv[i].style.paddingBottom = (width < 576) ? "370px":"335px";
			else conv[i].style.paddingBottom = (width < 576) ? "540px":"490px";
		}
	}
	if(perc.length > 0){
		for (var i = perc.length - 1; i >= 0; i--) {
			var width = perc[i].offsetWidth;perc[i].style.paddingBottom = (width>596)? "275px":"345px";}
		}
}

