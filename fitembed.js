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
	if(calc){var width = calc.offsetWidth;calc.style.paddingBottom = (width>596) ? (width * 0.42 + "px") : (width * 1.2 + "px");}
	if(conv){var width = conv.offsetWidth;conv.style.paddingBottom = (isMobile || width<596)? "330px":"480px";}
	if(perc){var width = perc.offsetWidth;perc.style.paddingBottom = (width>596)? "260px":"395px";}
}

