var calc = document.getElementById('basic-calc-embed');
var conv = document.getElementById('unit-conv-embed');
var perc = document.getElementById('percentCalc-embed');

var isMobile = 0;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = 1;
}


adapt();

window.addEventListener("resize", adapt)

function adapt(argument) {
	if(calc){var width = calc.offsetWidth;calc.style.paddingBottom = (width>576)? width * 0.415 + "px" : width * 1.16 + "px";}
	if(conv){var width = conv.offsetWidth;conv.style.paddingBottom = (isMobile || width<576)? "330px":"480px";}
	if(perc){var width = perc.offsetWidth;perc.style.paddingBottom = (width>576)? "260px":"395px";}
}

