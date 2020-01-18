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
		loadjQueryUI();
	}
}

function loadjQueryUI(){
	if(typeof jQuery.ui != 'undefined'){
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
	else {
		loadBootstrap();
	}
}

function loadBootstrap() {
	if(typeof(jQuery.fn.modal) == 'undefined') {
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
		var css = document.createElement('link');
		$('head').append(css);
		css.href = 'style.css';
		css.rel = 'stylesheet';
		css.type = 'type/css';
		css.onload = function(){loadForm();}
	}
}

function loadForm(){
	var block = $("#calculator-block");
	// console.log(block);
	block.append('\
	<form action="" class="container px-3 py-2">\
		<div class="inputs">\
			<div class="row mb-2 text-center">\
				<img class="border-0 mx-auto img-thumbnail d-block" src="https://cdn.shopify.com/s/files/1/0226/3443/0539/files/logo_372x.png?v=1563268762"/>\
			</div>\
			<div class="row mb-2">\
				<h3 class="col text-center">Mayan Gender Predictor</h3>\
			</div>\
			<div class="row mb-2">\
				<div class="col-6 text-left field-text">Mother\'s Date of Birth: </div>\
				<div class="col-6"><input class="w-100 date-picker form-control px-2" value="01/01/2000" name="mother-dob" /></div>\
			</div>\
			<div class="row mb-4">\
				<div class="col-6 text-left field-text">Child\'s Conception Date: </div>\
				<div class="col-6"><input class="w-100 date-picker form-control px-2" value="01/01/2020" name="child-doc" /></div>\
			</div> \
			<div class="row mb-2">\
				<div class="col-4 text-left field-text">Name: </div>\
				<div class="col-8"><input type="text" class="form-control w-100 px-2" name="name" /></div>\
			</div> \
			<div class="row mb-3">\
				<div class="col-4 text-left field-text">Email: </div>\
				<div class="col-8"><input type="text" class="form-control w-100 px-2" name="email" /></div>\
			</div> \
			<div class="d-flex justify-content-center">\
				<input class="px-4 py-2" type="button" name="calculate" value="View Results"/>\
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
			<div class="d-flex justify-content-center">\
				<div class="col-6">\
					<input class="w-100" type="button" name="retry" value="Try Again"/>\
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
	});

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

	block.find('input[name="calculate"]').click(function(){checkInput()});
	block.find('input[name="retry"]').click(function(){
		block.find('.outputs').hide();
		block.find('.inputs').show();
	});
}

function checkInput(){
	isvalid = 0;
	var block = $("#calculator-block");
	block.find(".date-picker").each(function(){
		// console.log($(this).val())
		datereg = /^(\d{0,2}\/\d{0,2}\/\d{0,4})/;
		if(!$(this).val().trim().match(datereg)) {
			$(this).addClass('is-invalid')
			$(this).attr('title', 'Input a valid date in the format dd/mm/yyyy')
		}
		else {
			$(this).removeClass('is-invalid')
			$(this).attr('title', '')
		}
	})

	block.find("input[name='email']").each(function(){
		emailreg = /^(\w+@\w+\.\w+)/
		if(!$(this).val().trim().match(emailreg)) {
			$(this).addClass('is-invalid')
			$(this).attr('title', 'Input a valid email address')
		}
		else {
			$(this).removeClass('is-invalid')
			$(this).attr('title', '')
		}
	})

	block.find("input[name='name']").each(function(){
		if($(this).val().length == 0) {
			$(this).addClass('is-invalid')
			$(this).attr('title', 'Input your name')
		}
		else {
			$(this).removeClass('is-invalid')
			$(this).attr('title', '')
		}
	})

	if(block.find('input.is-invalid').length == 0){
		sendData();
	}

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


function sendData(){
	name
	var block = $("#calculator-block");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'https://hooks.zapier.com/hooks/catch/6509512/oh9hwqe/silent/', true);
	xhr.send(JSON.stringify({
	    "name": block.find('input[name="name"]').val(),
	    "email": block.find('input[name="email"]').val(),
	    "DoB" : block.find('input[name="mother-dob"]').val(),
	    "DoC" : block.find('input[name="child-doc"]').val()
	}));

	calculateGender();
}

// /(\d{0,2})\/(\d{0,2})\/(\d{0,4})/g