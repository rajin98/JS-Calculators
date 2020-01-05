jQuery(document).ready(function(){
	if(jQuery("#shrinkage-calculator").length > 0){
		jQuery("#shrinkage-calculator").find('input[type="number"]').each(function(){
			jQuery(this).change(function(){calculateShrinkage()});
			jQuery(this).blur(function(){calculateShrinkage()});
	})}
	if(jQuery("#unit-converter").length > 0) unitConvSetup();
	if(jQuery("#calculatorBlock").length > 0) calculatorSetup();
	if(jQuery("#percentCalc").length > 0) percentCalcSetup();
})

function calculateShrinkage(){
	var form = jQuery("#shrinkage-calculator");
	var old_width = form.find('input[name="width_before"]').val();
	var new_width = form.find('input[name="width_after"]').val();
	var old_length = form.find('input[name="length_before"]').val();
	var new_length = form.find('input[name="length_after"]').val();

	var dWidth = old_width - new_width;
	var dLength = old_length - new_length;
	var dArea = (old_width * old_length) - (new_width * new_length);


	form.find("#width-loss-u").text(dWidth);
	form.find("#width-loss-p").text((dWidth / old_width) * 100);
	form.find("#length-loss-u").text(dLength);
	form.find("#length-loss-p").text((dLength / old_width) * 100);
	form.find("#overall-loss-u").text(dArea);
	form.find("#overall-loss-p").text((dArea / (old_width * old_length)) * 100);
}

function unitConvSetup(){
	var unitDict = {"Length": {"Meter": 1, "Kilometer": 1000, "Centimeter": 0.01, "Milimeter": 0.001, 
	"Micrometer": 0.000001, "Nanometer": 0.000000001, "Mile": 1609.35, "Yard": 0.9144, 
	"Foot": 0.3048, "Inch": 0.0254, "Light Year": 9.46066e+15},
	"Temparature": {"Celcius": [0,1], "Kelvin": [273.15,1], "Fahrenheit": [32, 1.8]},
	"Area": {"Square Meter": 1, "Square Kilometer": 1000000, "Square Centimeter": 0.0001, "Square Milimeter": 0.000001, 
	"Square Micrometer": 0.000000000001, "Square Mile": 2589990, "Square Yard": 0.83612736, "Square Foot": 0.09290304, 
	"Square Inch": 0.000645160, "Acre": 4046.8564224, "Hectare": 10000},
	"Volume": {"Cubic Meter": 1, "Cubic Kilometer": 1000000000, "Cubic Centimeter": 0.000001, "Cubic Milimeter": 1.0e-9, 
	"Liter": 0.001, "Mililiter": 0.000001, "US Gallon": 0.00378541, "US Quart": 0.0009463525, "US Pint": 0.00047317625,
	"US Cup": 0.000236588125, "US Fluid Ounce": 0.000029573515625, "US Table Spoon": 0.0000147867578125, "US Tea Spoon": 4.9289192708333333333333333333333e-6,
	"Imperial Gallon": 0.00454609, "Imperial Quart": 0.0011365225, "Imperial Pint": 0.00056826125, "Imperial Fluid Ounce": 0.0000284130625, 
	"Imperial Table Spoon": 0.0000177581640625, "Imperial Tea Spoon": 5.9193880208333333333333333333333e-6, "Cubic Mile": 4.16818e+9, "Cubic Yard": 0.764554857984, 
	"Cubic Foot": 0.028316846592, "Cubic Inch": 0.000016387064},
	"Weight": {"Kilogram": 1, "Gram": 0.001, "Miligram": 0.000001, "Metric Ton": 1000, "Long Ton": 1016.04608,
	"Short Ton": 907.184, "Pound": 0.453592, "Ounce": 0.0283495, "Carrat": 0.0002, "Atomic Mass Unit": 1.6605401999104288e-27}
	}

	var form_c = jQuery("#unit-converter");
	var optionClass = '';
	var menu = form_c.find("ul");
	var last_field = 'from-val';
	menu.find("li").click(function(){
		menu.find("li").removeClass("active");
		jQuery(this).addClass("active");
		optionClass = jQuery(this).text();
		loadOptions();
		// doConversion();
	});
	menu.find("li").eq(0).click();

	form_c.keyup(function(e){
		var key = e.which || e.keyCode;
		if(key == 13) doConversion();
	})

	form_c.find('input[name="convert"]').click(function(){doConversion();})

	form_c.find('.optionList').keyup(function(e){
		var key = e.which || e.keyCode;
		if(key == 38) jQuery(this).find('.active').prev().click();
		else if(key == 40) jQuery(this).find('.active').next().click();
	})

	function loadOptions(){
		var form_c = jQuery("#unit-converter");
		form_c.find('#unit-from').empty();
		form_c.find('#unit-to').empty();
		for (var key in unitDict[optionClass]) {
			form_c.find('.optionList').append("<input type='button' readonly name='"+key+"' value='"+key+"'>");
			form_c.find('.optionList').find(":first-child").addClass("active");
			form_c.find('.optionList').find("input").click(function(){
				jQuery(this).addClass("active");
				jQuery(this).siblings().removeClass("active");
			})
		}
	}
	function doConversion(){
		var subDict = unitDict[optionClass];
		var form_c = jQuery("#unit-converter");
		var val = form_c.find("input[name='"+ last_field +"']").val();
		var unit_from = form_c.find('#unit-from input.active').attr('name');
		var unit_to = form_c.find('#unit-to input.active').attr('name');
		form_c.find('#unit-to input').each(function(){
			var r = getval(val, subDict[unit_from], subDict[jQuery(this).attr('name')]);
			jQuery(this).val(jQuery(this).attr('name') + ' (' + parseNum(r) + ')');
		});
		if(last_field == "from-val"){
			val = getval(val, subDict[unit_from], subDict[unit_to]);
			form_c.find("input[name='to-val']").val(parseFloat(Number.parseFloat(val).toFixed(10)));

		} 
		var result = form_c.find("input[name='from-val']").val() + " " + unit_from + " = " + form_c.find("input[name='to-val']").val() + " " + unit_to;
		form_c.find("#result-box").text(result);
	}

	function getval(retval, base1, base2) {
		if(optionClass == "Temparature") {
				retval = retval - base1[0];
				retval = retval / base1[1];

				retval = retval * base2[1];
				retval = retval + base2[0];
		} else {
			retval = retval * base1;
			retval = retval / base2;
		}
		return retval;
	}

	function parseNum(valToBeFormated){
		var gniTotalDigits = 12;
		var gniPareSize = 12;
		var valStr = "" + valToBeFormated;
		if (valStr.indexOf("N")>=0 || (valToBeFormated == 2*valToBeFormated && valToBeFormated == 1+valToBeFormated)) return "Error ";
		var i = valStr.indexOf("e")
		if (i>=0){
			var expStr = valStr.substring(i+1,valStr.length);
			if (i>11) i=11;  // max 11 digits
			valStr = valStr.substring(0,i);
			if (valStr.indexOf(".")<0){
				valStr += ".";
			}else{
				// remove trailing zeros
				j = valStr.length-1;
				while (j>=0 && valStr.charAt(j)=="0") --j;
				valStr = valStr.substring(0,j+1);
			}
			valStr += "E" + expStr;
		}else{
			var valNeg = false;
			if (valToBeFormated < 0){
				valToBeFormated = -valToBeFormated;
				valNeg = true;
			}
			var valInt = Math.floor(valToBeFormated);
			var valFrac = valToBeFormated - valInt;
			var prec = gniTotalDigits - (""+valInt).length - 1;	// how many digits available after period

			var mult = " 1000000000000000000".substring(1,prec+2);
			if ((mult=="")||(mult==" ")){
				mult = 1;
			}else{
				mult = parseInt(mult);
			}
			var frac = Math.floor(valFrac * mult + 0.5);
			valInt = Math.floor(Math.floor(valToBeFormated * mult + .5) / mult);
			if (valNeg)
				valStr = "-" + valInt;
			else
				valStr = "" + valInt;
			var fracStr = "00000000000000"+frac;
			fracStr = fracStr.substring(fracStr.length-prec, fracStr.length);
			i = fracStr.length-1;

			// remove trailing zeros unless fixed during entry.
			while (i>=0 && fracStr.charAt(i)=="0") --i;
			fracStr = fracStr.substring(0,i+1);
			if (i>=0) valStr += "." + fracStr;
		}
		return valStr;
	}
}

function calculatorSetup() {
	var isNumber = 0, isDecimal = 0, isOperator = 0, isConstant = 0, 
	isExecuted = 0, buffer = "", memory = 0; operator = '', value = 0;
	
	var calWidget = jQuery("#calculatorBlock").find("#calculatorWrap");

	calWidget.keypress(function(e){var key = e.which || e.keyCode;if(key == 13) e.preventDefault();})

	calWidget.keyup(function(e){
		var key = e.which || e.keyCode;
		if(key > 95  && key < 106) enterValue(""+key-96);
		else if(key == 107) enterOperator('+');
		else if(key == 109) enterOperator('\u2212');
		else if(key == 106) enterOperator('\u00D7');
		else if(key == 111) enterOperator('\u00F7');
		else if(key == 187 || key == 13) enterOperator('\u003D');
		else if(key == 8) displayClear();
		else if(key == 53) calWidget.find("input[type='button'][name='percentButton']").click();
	})

	var display = calWidget.find("#display");
	calWidget.find("input[type='button']").click(function(){
		var c = jQuery(this);
		if(c.hasClass("number")) enterValue(c.val());
		else if(c.hasClass("operator")) enterOperator(c.val());
		else if(c.attr("name") == 'clearButton') displayClear();
		else if(c.attr("name") == 'mem_clear') memory = 0;
		else if(c.attr("name") == 'mem_plus') {if(display.val()) memory += parseFloat(display.val());}
		else if(c.attr("name") == 'mem_minus') {if(display.val()) memory -= parseFloat(display.val());}
		else if(c.attr("name") == 'mem_recall') {buffer = memory; display.val(memory);}
		else if(c.attr("name") == 'percentButton') {if(display.val()) buffer = "" + parseFloat(display.val())/100; updateDisplay(buffer);}
		else if(c.attr("name") == 'root2') {if(display.val()) buffer = "" + Math.sqrt(parseFloat(display.val())); updateDisplay(buffer);}
		else if(c.attr("name") == 'piConst') {buffer = "" + Math.PI; updateDisplay(buffer);}
		else if(c.attr("name") == 'negate') {if(display.val()) buffer = "" + parseFloat(display.val()) * -1; updateDisplay(buffer);}
		else if(c.attr("name") == 'squareVal') {if(display.val()) buffer = "" + Math.pow(parseFloat(display.val()), 2); updateDisplay(buffer);}
		else if(c.attr("name") == 'round0') {if(display.val()) buffer = "" + Math.round(parseFloat(display.val())); updateDisplay(buffer);}
		else if(c.attr("name") == 'round2') {if(display.val()) buffer = "" + Math.round(parseFloat(display.val())*100)/100; updateDisplay(buffer);};
	})

	function enterValue(c){
		if(isExecuted) {isExecuted = 0;}
		if(!("NaN" == display.val() || isConstant || "." == c && isDecimal || buffer.length > 15)){
			calWidget.find("input[name='clearButton']").val("CE");
			if(!(buffer == "0" && c == "0")) {
				(c == "." && buffer == "") ? (buffer = "0.", isDecimal = 1) : buffer += c;}
			updateDisplay(buffer);
		}
	}

	function enterOperator(c) {
		if(isExecuted) {operator = c; isOperator = 1; isExecuted = 0;}
		else if(!isOperator) {if(buffer) {value = parseFloat(buffer); buffer = ''; operator = c; isOperator = 1;}}
		else {
			if(!buffer) operator = c;
			else{
				var val2 = parseFloat(buffer); buffer = '';
				if(operator == '\u2212') value = value - val2;
				if(operator == '\u00D7') value = value * val2;
				if(operator == '\u00F7') (val2 == 0) ? value = "NaN" : value = value / val2;
				if(operator == '+') value = value + val2;
				if(c == '\u003D') {isOperator = 0; isExecuted = 1;}
				operator = c;
			}
		}
		updateDisplay(value);
	}

	function updateDisplay(c) {
		display.val(c);
	}

	function displayClear(){
		if(calWidget.find("input[name='clearButton']").val() == "CE") {buffer = ''; 
			calWidget.find("input[name='clearButton']").val("AC")}
		else {
			value = memory = isOperator = isDecimal = isConstant = isExecuted = 0
			operator = buffer = '';
		}
		updateDisplay('');
	}
}

function percentCalcSetup() {
	var form_p = jQuery("#percentCalc"), type = 0;
	loadForm();
	form_p.find('select').change(function(){loadForm();})

	form_p.find('input[name="calculate"]').click(function(){
		if(type == "1") type1();
		if(type == "2") type2();
		if(type == "3") type3();
	})

	form_p.keyup(function(e){
		var key = e.which || e.keyCode;
		if(key == 13) form_p.find('input[name="calculate"]').click();
	})

	function loadForm() {
		type = form_p.find("#calc-type option:selected").val();
		if(type == "1") {
			form_p.find("#text-top").html("<b>What is</b>");
			form_p.find("#text-mid").html("<b>of</b>");
			form_p.find("input[name='x-val']").parent().removeClass("added");
			form_p.find("input[name='x-val']").parent().append("<span class='input-group-addon'>%</span>");
		} else if(type == "2") {
			form_p.find("#text-top").empty();
			form_p.find("input[name='x-val']").parent().addClass("added");
			form_p.find("input[name='x-val']").parent().find("span").remove();
			form_p.find("#text-mid").html("<b>is what % of</b>");
		} else {
			form_p.find("input[name='x-val']").parent().addClass("added");
			form_p.find("input[name='x-val']").parent().find("span").remove();
			form_p.find("#text-top").html("<b>What is the % increase/decrease from</b>");
			form_p.find("#text-mid").html("<b>to</b>");
		}
	}

	function type1(){
		var x = form_p.find("input[name='x-val']").val();
		var y = form_p.find("input[name='y-val']").val();
		var result = y * x / 100;
		form_p.find("#pc-answer").empty();
		form_p.find("#pc-answer").html("<b>Answer: " + result + "</b>");
	}

	function type2(){
		var x = form_p.find("input[name='x-val']").val();
		var y = form_p.find("input[name='y-val']").val();
		var result = (y == 0) ? 0 : x / y * 100;
		form_p.find("#pc-answer").empty();
		form_p.find("#pc-answer").html("<b>Answer: " + result + "%</b>");
	}

	function type3(){
		var x = form_p.find("input[name='x-val']").val();
		var y = form_p.find("input[name='y-val']").val();
		var result = (x == 0) ? 0 : (y - x) / x * 100;
		(result<0) ? (result*=-1, s = 'decrease') : s='increase'
		form_p.find("#pc-answer").empty();
		form_p.find("#pc-answer").html("<b>Answer: " + result + "% " + s + "</b>");
	}
}