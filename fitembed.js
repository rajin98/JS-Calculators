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
			var width = calc[i].offsetWidth;calc[i].style.paddingBottom = (width>596) ? (width * 0.42 + "px") : (width * 1.2 + "px");}
		}
	 
	if(conv.length > 0){
		for (var i = conv.length - 1; i >= 0; i--) {
			var width = conv[i].offsetWidth;conv[i].style.paddingBottom = (isMobile || width<596) ? "350px":"480px";}
		}
	if(perc.length > 0){
		for (var i = perc.length - 1; i >= 0; i--) {
			var width = perc[i].offsetWidth;perc[i].style.paddingBottom = (width>596)? "260px":"380px";}
		}
}

