var calc = document.getElementById('basic-calc-embed');
var conv = document.getElementById('unit-conv-embed');
var perc = document.getElementById('percentCalc-embed');

adapt();

window.addEventListener("resize", adapt)

function adapt(argument) {
	if(calc){var width = calc.offsetWidth;calc.style.paddingBottom = width * 1.29051987768 + "px";}
	if(conv){var width = conv.offsetWidth;conv.style.paddingBottom = (width>576)? "480px":"330px";}
	if(perc){var width = perc.offsetWidth;perc.style.paddingBottom = (width>576)? "250px":"395px";}
}

