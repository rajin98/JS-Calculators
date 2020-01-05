var calc = document.getElementById('basic-calc-embed');
var conv = document.getElementById('unit-conv-embed');
var perc = document.getElementById('percentCalc-embed')
if(calc){var width = calc.offsetWidth;calc.style.paddingBottom = width * 2 + "px";}
if(conv){var width = conv.offsetWidth;conv.style.paddingBottom = (width>576)? "475px":"920px";}
if(perc){var width = perc.offsetWidth;perc.style.paddingBottom = (width>576)? "240px":"320px";}