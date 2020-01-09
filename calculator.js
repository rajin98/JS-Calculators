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
	var isMobile = 0;
	var reallyIsMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 1 : 0;
	isMobile = reallyIsMobile;

	var optionClass = '';
	var menu = form_c.find("ul");
	var last_field = 'from-val';
	menu.find("li").click(function(){
		menu.find("li").removeClass("active");
		jQuery(this).addClass("active");
		optionClass = jQuery(this).text();
		if(optionClass=="Temp") optionClass = "Temparature"
		loadOptions();
	});
	menu.find("li").eq(0).click();
	jQuery(window).resize(function(){
		var width = jQuery(window).width();
		if(!reallyIsMobile){
			if(width > 576 && isMobile) {isMobile = 0; changeLayout(); loadOptions(); doConversion();}
			if(width <= 576 && !isMobile) {isMobile = 1; changeLayout(); loadOptions(); doConversion();}
		}
	});

	if(jQuery(window).width() <= 576) isMobile = 1;

	changeLayout();
	loadOptions();

	form_c.keyup(function(e){
		var key = e.which || e.keyCode;
		if(key == 13) doConversion();
	})

	form_c.find('input[name="convert"]').click(function(){doConversion();})
	
	form_c.find('input[name="reset"]').click(function(){
		form_c.find('input[type="number"]').val('');
		loadOptions();
		if(!isMobile) form_c.find('#large').find("#result-box").empty();
		else form_c.find('#small').find("#result-box").empty();
	});

	form_c.find('.optionList').keyup(function(e){
		var key = e.which || e.keyCode;
		if(key == 38) jQuery(this).find('.active').prev().click();
		else if(key == 40) jQuery(this).find('.active').next().click();
	});

	function changeLayout(){
		if(!isMobile){
			form_c.find('ul li:eq(1)').text('Temparature');
			form_c.find('#small').hide();
			form_c.find('#large').show();
		} else {
			form_c.find('ul li:eq(1)').text('Temp');
			form_c.find('#small').show();
			form_c.find('#large').hide();
		}
	}

	function loadOptions(){
		form_c.find('#unit-from, #unit-to').empty();
		if(isMobile) {
			for (var key in unitDict[optionClass]) {
				form_c.find("#small").find('#unit-from, #unit-to').append("<option value='"+key+"'>"+key+"</option>");
			}
		} else {
			for (var key in unitDict[optionClass]) {
				form_c.find('.optionList').append("<input type='button' readonly name='"+key+"' value='"+key+"'>");
				form_c.find('.optionList').find(":first-child").addClass("active");
				form_c.find('.optionList').find("input").click(function(){
					jQuery(this).addClass("active");
					jQuery(this).siblings().removeClass("active");
				});
			}
		}
		
	}
	function doConversion(){
		var subDict = unitDict[optionClass];
		var form_c = jQuery("#unit-converter");

		if(isMobile){
			var l = form_c.find('#small');
			var val = l.find("input[name='"+ last_field +"']").val();
			if(val == '') return;
			var unit_from = l.find('#unit-from').val();
			var unit_to = l.find('#unit-to').val();
			console.log(unit_to);
			l.find('#unit-to option').each(function(){
				var r = getval(val, subDict[unit_from], subDict[jQuery(this).val()]);
				jQuery(this).text(jQuery(this).val() + ' (' + parseNum(r) + ')');
			});
			if(last_field == "from-val"){
				val = getval(val, subDict[unit_from], subDict[unit_to]);
			} 
			var result = "<b style='color: red;'>Result:</b> " + l.find("input[name='from-val']").val() + " " + unit_from + " = " + parseNum(val) + " " + unit_to;
			l.find("#result-box").html(result);
		} else {
			var l = form_c.find('#large');
			var val = l.find("input[name='"+ last_field +"']").val();
			if(val == '') return;
			var unit_from = l.find('#unit-from input.active').attr('name');
			var unit_to = l.find('#unit-to input.active').attr('name');
			l.find('#unit-to input').each(function(){
				var r = getval(val, subDict[unit_from], subDict[jQuery(this).attr('name')]);
				jQuery(this).val(jQuery(this).attr('name') + ' (' + parseNum(r) + ')');
			});
			if(last_field == "from-val"){
				val = getval(val, subDict[unit_from], subDict[unit_to]);
				l.find("input[name='to-val']").val(parseNum(val));

			} 
			var result = "<b style='color: red;'>Result:</b> " + l.find("input[name='from-val']").val() + " " + unit_from + " = " + l.find("input[name='to-val']").val() + " " + unit_to;
			l.find("#result-box").html(result);
		}
		
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

}

function calculatorSetup() {
	var isNumber = 0, isDecimal = 0, isOperator = 0, isConstant = 0, isMobile = 0, calWidget = '';
	isExecuted = 0, buffer = "0", memory = 0; operator = '', value = 0, display = '', val2 = 0;
	
	if(jQuery(window).width() <= 576) isMobile = 1;
	changeLayout();

	jQuery(window).resize(function(){
		var width = jQuery(window).width();
		if(width > 576 && isMobile) {isMobile = 0; changeLayout();}
		if(width <= 576 && !isMobile) {isMobile = 1; changeLayout();}
	});

	function changeLayout(){
		if(display) buffer = display.val();
		if(calWidget) {calWidget.off();calWidget.find("input[type='button']").off();}
		
		if(!isMobile){
			jQuery("#calculatorBlock").find('.calc-small').hide();
			jQuery("#calculatorBlock").find('.calc-large').show();
		} else {
			jQuery("#calculatorBlock").find('.calc-small').show();
			jQuery("#calculatorBlock").find('.calc-large').hide();
		}
		calWidget = jQuery("#calculatorBlock").find(".calculatorWrap:visible");
		calWidget.keypress(function(e){var key = e.which || e.keyCode;if(key == 13) e.preventDefault();})

		calWidget.keyup(function(e){
			var key = e.which || e.keyCode;
			if(key > 95  && key < 106) calWidget.find("input[value='" + (key-96) + "']").click();
			else if(key == 107) calWidget.find("input[name='add']").click();
			else if(key == 109) calWidget.find("input[name='subtract']").click();
			else if(key == 106) calWidget.find("input[name='multiply']").click();
			else if(key == 111) calWidget.find("input[name='divide']").click();
			else if(key == 187 || key == 13) calWidget.find("input[name='calculate']").click();
			else if(key == 8) calWidget.find("input[name='backspaceBtn']").click();
			else if(key == 46) calWidget.find("input[name='clearButton']").click();
			else if(key == 53) calWidget.find("input[name='percentButton']").click();
			else if(key == 110) calWidget.find("input[value='.']").click();;
		})

		display = calWidget.find("#display");
		updateDisplay(buffer);
		calWidget.find("input[type='button']").click(function(){
			var c = jQuery(this);
			c.focus();
			if(c.hasClass("number")) enterValue(c.val());
			else if(c.hasClass("operator")) enterOperator(c.val());
			else if(c.attr("name") == 'clearButton') displayClear();
			else if(c.attr("name") == 'mem_clear') memory = 0;
			else if(c.attr("name") == 'mem_plus') {if(display.val()) memory += parseFloat(display.val().replace(/,/g, ''));}
			else if(c.attr("name") == 'mem_minus') {if(display.val()) memory -= parseFloat(display.val().replace(/,/g, ''));}
			else if(c.attr("name") == 'mem_recall') {buffer = numberWithCommas(memory); updateDisplay(buffer);}
			else if(c.attr("name") == 'percentButton') {
				if(value == 0) {if(display.val()) buffer = numberWithCommas(parseFloat(display.val().replace(/,/g, ''))/100);}
				else {buffer = numberWithCommas(value * parseFloat(display.val().replace(/,/g, ''))/100);}
				 updateDisplay(buffer);}
			else if(c.attr("name") == 'root2') {if(display.val()) buffer = numberWithCommas(Math.sqrt(parseFloat(display.val().replace(/,/g, '')))); updateDisplay(buffer);}
			else if(c.attr("name") == 'piConst') {buffer = Math.PI; updateDisplay(buffer);}
			else if(c.attr("name") == 'negate') {if(display.val()) buffer = numberWithCommas(parseFloat(display.val().replace(/,/g, '')) * -1); updateDisplay(buffer);}
			else if(c.attr("name") == 'squareVal') {if(display.val()) buffer = "" + numberWithCommas(Math.pow(parseFloat(display.val().replace(/,/g, '')), 2)); updateDisplay(buffer);}
			else if(c.attr("name") == 'backspaceBtn') {backspaceEntry();}
			else if(c.attr("name") == 'oneoverx') {if(display.val()) {buffer = numberWithCommas(1/parseFloat(display.val().replace(/,/g, ''))); updateDisplay(buffer);}};
			
		});
	}

	function backspaceEntry(){
		if(!(buffer == "0" || buffer == "") && !isExecuted) {
			if(buffer[buffer.length-1] == "." ) isDecimal = 0;
			buffer = buffer.slice(0, buffer.length-1);
			if(buffer == "") buffer = "0";
			updateDisplay(buffer)
		};
	}

	function enterValue(c){
		if(isExecuted) {isExecuted = 0; isDecimal = 0;}
		if(!("NaN" == display.val() || isConstant || "." == c && isDecimal || buffer.length > 15)){
			calWidget.find("input[name='clearButton']").val("CE");
			if(buffer == "0") buffer = '';
			if(c == ".") {isDecimal = 1; if(buffer=='') buffer = "0";}
			buffer += c;
			updateDisplay(numberWithCommas(parseFloat(buffer)));
		}
	}

	function enterOperator(c) {
		if(isExecuted) {
			console.log(operator + " " + value);
			if(c == '\u003D') {
				if(operator == '\u2212') value = value - val2;
				if(operator == '\u00D7') value = value * val2;
				if(operator == '\u00F7') (val2 == 0) ? value = "NaN" : value = value / val2;
				if(operator == '+') value = value + val2;
			}
			else {operator = c; isOperator = 1; isExecuted = 0;}}
		else if(!isOperator) {if(buffer) {value = parseFloat(buffer); buffer = ''; operator = c; isOperator = 1;}}
		else {
			if(!buffer) operator = c;
			else{
				val2 = parseFloat(buffer); buffer = '';
				if(operator == '\u2212') value = value - val2;
				if(operator == '\u00D7') value = value * val2;
				if(operator == '\u00F7') (val2 == 0) ? value = "NaN" : value = value / val2;
				if(operator == '+') value = value + val2;
				if(c == '\u003D') {isOperator = 0; isExecuted = 1;}
				else operator = c;
			}
		}
		updateDisplay(numberWithCommas(value));
	}

	function updateDisplay(c) {
		display.val(c);
	}

	function displayClear(){
		if(calWidget.find("input[name='clearButton']").val() == "CE") {buffer = '0'; 
			calWidget.find("input[name='clearButton']").val("AC")}
		else {
			value = memory = isOperator = isDecimal = isConstant = isExecuted = 0;
			operator = ''; buffer = '0';
		}
		updateDisplay(buffer);
	}
}

function percentCalcSetup() {
	var form_p = jQuery("#percentCalc"), type = 0;
	loadForm();
	form_p.find('select').change(function(){loadForm();})

	form_p.find("input[name=reset]").click(function(){
		form_p.find("input[name='x-val']").val('');
		form_p.find("input[name='y-val']").val('');
		form_p.find("#pc-answer").empty();
	})

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
		if(type == "2") {
			form_p.find("#text-top").html("<b>What is</b>");
			form_p.find("#text-mid").html("<b>of</b>");
			form_p.find("#x-val .input-group-prepend, #y-val .input-group-prepend").hide();
			form_p.find("#x-val .input-group-append").show();
			form_p.find("#x-val .input-group-append .input-group-text").text("%");
		} else if(type == "3") {
			form_p.find("#text-top").empty();
			form_p.find("#x-val .input-group-prepend, #y-val .input-group-prepend").hide();
			form_p.find("#x-val .input-group-append").hide();
			form_p.find("#text-mid").html("<b>is what % of</b>");
		} else {
			form_p.find("#x-val .input-group-prepend, #y-val .input-group-prepend").show();
			form_p.find("#x-val .input-group-prepend .input-group-text").text("Before Wash");
			form_p.find("#y-val .input-group-prepend .input-group-text").text("After Wash");
			form_p.find("#x-val .input-group-append").hide();
			form_p.find("#text-top").html("<b>What is the fabric % increase/de&shy;crease from</b>");
			form_p.find("#text-mid").html("<b>to</b>");
		}
	}

	function type2(){
		var x = form_p.find("input[name='x-val']").val();
		var y = form_p.find("input[name='y-val']").val();
		var result = y * x / 100;
		form_p.find("#pc-answer").empty();
		form_p.find("#pc-answer").html("<b style='color:red;'>Answer: </b>" + parseFloat(result));
	}

	function type3(){
		var x = form_p.find("input[name='x-val']").val();
		var y = form_p.find("input[name='y-val']").val();
		var result = (y == 0) ? 0 : x / y * 100;
		form_p.find("#pc-answer").empty();
		form_p.find("#pc-answer").html("<b style='color:red;'>Answer: </b>" + parseFloat(result));
	}

	function type1(){
		var x = form_p.find("input[name='x-val']").val();
		var y = form_p.find("input[name='y-val']").val();
		var result = (x == 0) ? 0 : (y - x) / x * 100;
		(result<0) ? (result*=-1, s = 'decrease') : s='increase'
		form_p.find("#pc-answer").empty();
		form_p.find("#pc-answer").html("<b style='color:red;'>Answer: </b>" + parseFloat(result) + "% " + s + "</b>");
	}
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

function numberWithCommas(x) {
	var ret = x.toString(), d = ret.length;
	console.log(ret);
	for (var i = 0; i < ret.length; i++) {if(ret[i] == 'e' || ret[i] == '.') {d = i; break;}}
	var l = ret.substring(0, d);
	console.log(l, d, ret.substring(d, ret.length));
 	return (l.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ret.substring(d, ret.length));
}
