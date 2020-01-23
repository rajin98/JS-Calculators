jQuery(document).ready(function(){
	jQuery(".boy-girl-quiz .radio-option").click(function(){
		jQuery(this).find("input").prop("checked", true);
	})

	jQuery(".boy-girl-quiz").find("#view-result").click(function(){checkQuizInput()})
})


function checkQuizInput() {
	var x = 0;
	var block = jQuery('.boy-girl-quiz');
	for (var i = 1; i < 9; i++) {
		t = jQuery("input[name='q-"+i+"']:checked")
		if(t.length == 0){
			jQuery("div.q-"+i+" h3").addClass("is-invalid")
		} else {
			jQuery("div.q-"+i+" h3").removeClass("is-invalid")
			x += parseInt(t.val())
		}
	}

	block.find("input[name='email']").each(function(){
		emailreg = /^(.+@.+\.\w+)/
		if(!jQuery(this).val().trim().match(emailreg)) {
			jQuery(this).addClass('is-invalid')
			jQuery(this).attr('title', 'Input a valid email address')
		}
		else {
			jQuery(this).removeClass('is-invalid')
			jQuery(this).attr('title', '')
		}
	})

	block.find("input[name='name']").each(function(){
		if(jQuery(this).val().length == 0) {
			jQuery(this).addClass('is-invalid')
			jQuery(this).attr('title', 'Input your name')
		}
		else {
			jQuery(this).removeClass('is-invalid')
			jQuery(this).attr('title', '')
		}
	})

	if(block.find('input.is-invalid').length == 0){
		sendQuizData(block.find("input[name='name']").val(), 
			block.find("input[name='email']").val(),
			(x>0)?"boy":"girl");
	} 
}

function sendQuizData(name, email, result) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'https://hooks.zapier.com/hooks/catch/6509512/ohwgpzr/silent/', true);
	xhr.send(JSON.stringify({
	    "name": name,
	    "email": email,
	    "stamp" : new Date(Date.now()).toISOString(),
	    "result" : result,
	}));
	showQuizResult(result);
}

function showQuizResult(result){
	jQuery('.boy-girl-quiz .screen-1').hide();
	jQuery('.boy-girl-quiz').append("<div class='result-block form-block mt-3'> \
		<h2> It's a " + result +"!</h2>\
		<p>According to this quiz, your child will be a " + result +"!</p> \
		<div class='row'><button onclick='location.reload();' type='button' class='btn btn--primary'>Try Again</button></div> \
		</div>")
}