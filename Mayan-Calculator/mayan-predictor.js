window.onload = function() {
	if (typeof jQuery == 'undefined' || typeof jQuery.ui == 'undefined') {
	    var script = document.createElement('script');
	    document.querySelector('head').appendChild(script);
	 	script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
	 	script.type = 'text/javascript';
	 	script.crossorigin = 'anonymous';
		script.integrity = 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=';
	 	script.onload = function (){
	 		if(typeof jQuery.ui == 'undefined') {loadjQueryUI();}
	 		else loadBootstrap();
	 	};
	} else {
		$(document).ready(function(){loadForm()});
	}
}

function loadjQueryUI(){
	var script = document.createElement('script');
	script.src = 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js';
	script.type = 'text/javascript';
	$('head').append(script);
	script.onload = function(){};

	var css = document.createElement('link');
	$('head')[0].append(css);
	css.href = 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css';
	css.rel = 'stylesheet';
	css.type = 'type/css';
	css.onload = function(){loadBootstrap()};
}

function loadBootstrap() {
	if(typeof(jQuery.fn.modal) === 'undefined') {
		
		var script = document.createElement('script');
		script.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js';
		script.type = 'text/javascript';
		$('head').append(script);
		script.onload = function(){};

		var css = document.createElement('link');
		$('head').append(css);
		css.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css';
		css.rel = 'stylesheet';
		css.type = 'type/css';
		css.onload = function(){}

		css = document.createElement('link');
		$('head').append(css);
		css.href = 'style.css';
		css.rel = 'stylesheet';
		css.type = 'type/css';
		css.onload = function(){loadForm();}
	} else {
		loadForm();
	}
}

function loadForm(){
	var block = $("#calculator-block");
	// console.log(block);
	block.append('\
	<form action="" class="container p-3">\
		<div class="inputs">\
			<div class="row mb-2">\
				<div class="col-6 text-left">Mother\'s Date of Birth: </div>\
				<div class="col-6"><input class="col-12 date-picker" value="01/01/2000" name="mother-dob" /></div>\
			</div>\
			<div class="row mb-2">\
				<div class="col-6 text-left">Child\'s Conception Date: </div>\
				<div class="col-6"><input class="col-12 date-picker" value="01/01/2020" name="child-doc" /></div>\
			</div> \
			<div class="row">\
				<div class="col-12">\
					<input class="col-12" type="button" name="calculate" value="Submit"/>\
				</div>\
			</div>\
		</div>\
		<div class="outputs">\
			<div class="row mb-2"> \
				<img class="col-3 col-sm-12"/> \
				<div class="col"> \
					<h3>It\'s a <span class="gender-output"></span>!</h3> \
					<div class="col">According to the Mayan gender prediction formula, your child will be a <span class="gender-output"></span></div> \
				</div> \
			</div> \
			<div class="row">\
				<div class="col-12">\
					<input class="col-12" type="button" name="retry" value="Try Again"/>\
				</div>\
			</div>\
		</div>\
	</form>');

	block.find('input[name="mother-dob"]').datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		maxDate: Date.now(),
		dateFormat: 'dd/mm/yy'
		// onClose: function(dateText, inst) { 
		// 	$(this).datepicker('setDate', new Date(inst.selectedYear, 1));}
	}
	);

	//block.find('input[name="mother-dob"]').focus(function(){$('.ui-datepicker-calendar, .ui-datepicker-month').hide();})

	block.find('input[name="child-doc"]').datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		maxDate: Date.now(),
		dateFormat: 'dd/mm/yy'}
		// onClose: function(dateText, inst) { 
		// 	$(this).datepicker('setDate', new Date(inst.selectedDay, inst.selectedMonth, inst.selectedYear, 1));}
		// }
	);

	block.find('.outputs').hide();

	block.find('input[name="calculate"]').click(function(){calculateGender()});
	block.find('input[name="retry"]').click(function(){
		block.find('.outputs').hide();
		block.find('.inputs').show();
	});
}

function calculateGender(){
	var block = $("#calculator-block");
	block.find('.outputs').show();
	block.find('.inputs').hide();
	var block = $("#calculator-block");
	var mom_dob = block.find('input[name="mother-dob"]').val().split('/');
	mom_dob = new Date(Number(mom_dob[2]), Number(mom_dob[1]) - 1, Number(mom_dob[0]));
	var child_doc = block.find('input[name="child-doc"]').val().split('/');
	child_doc = new Date(Number(child_doc[2]), Number(child_doc[1]) - 1, Number(child_doc[0]));
	var mom_age = child_doc.getFullYear() - mom_dob.getFullYear();
	if(child_doc.getMonth() < mom_dob.getMonth()) {mom_age = mom_age - 1;}
	else if(child_doc.getMonth() == mom_dob.getMonth() && child_doc.getDate() < mom_dob.getDate()) {mom_age = mom_age - 1;}
	block.find('.gender-output').text(isBoy(mom_age, child_doc.getMonth()) ? "boy" : "girl");
}

function isBoy(age, month) {
	var mod = (age - month) % 13;
	if(mod < 3 && mod % 2 == 0) return 1;
	else if (mod > 2 && mod % 2 == 1) return 1;
	else return 0;
}