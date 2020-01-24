var cur_screen = 1;
var base = '';

jQuery(document).ready(function(){
	jQuery('button.next').click(function(){
		if(checkInput(cur_screen)){
			jQuery('div[data-screen="'+cur_screen+'"]').hide();
			jQuery('div[data-screen="'+(cur_screen+1)+'"]').show();
			cur_screen+=1;

			if(cur_screen == 2) inputController();
		}
	});

	jQuery('button.back').click(function(){
		jQuery('div[data-screen="'+cur_screen+'"]').hide();
		jQuery('div[data-screen="'+(cur_screen-1)+'"]').show();
		cur_screen-=1;
	});

	jQuery('div[data-screen="1"] input[name="base"]').keyup(function(){
		if(jQuery(this).val().trim().length > 0) {
			base = jQuery(this).val().trim()
			jQuery('div[data-screen="1"] .input-box > .base-text').text("Base Size " + base + " = 0\"")
		} else {jQuery('div[data-screen="1"] .input-box > .base-text').text('')}
	});
})


function checkInput(formID){
	if(formID == 1) {
		if(jQuery('div[data-screen="1"] input[name="base"]').val().trim().length == 0) {
			jQuery('div[data-screen="1"] input[name="base"]').addClass('is-invalid');
		} else {jQuery('div[data-screen="1"] input[name="base"]').removeClass('is-invalid');}
		if(jQuery('div[data-screen="1"] input[name="style-name"]').val().trim().length == 0) {
			jQuery('div[data-screen="1"] input[name="style-name"]').addClass('is-invalid');
		} else {jQuery('div[data-screen="1"] input[name="style-name"]').removeClass('is-invalid');}
		if(jQuery('div[data-screen="1"] .is-invalid').length > 0) return 0;
		else return 1;
	}

	if(formID == 2) {
		block = jQuery('div[data-screen="2"]');

		if(block.find('input[name="length-up"]').val().trim().length == 0) {
			block.find('input[name="length-up"]').addClass('is-invalid');
		} else {block.find('input[name="length-up"]').removeClass('is-invalid');}

		if(block.find('input[name="length-grade"]').val().trim().length == 0) {
			block.find('input[name="length-grade"]').addClass('is-invalid');
		} else {block.find('input[name="length-grade"]').removeClass('is-invalid');}

		if(block.find('input[name="width-grade"]').val().trim().length == 0) {
			block.find('input[name="width-grade"]').addClass('is-invalid');
		} else {block.find('input[name="width-grade"]').removeClass('is-invalid');}

		if(block.find('input[name="width-up"]').val().trim().length == 0) {
			block.find('input[name="width-up"]').addClass('is-invalid');
		} else {block.find('input[name="width-up"]').removeClass('is-invalid');}

		if(block.find('.is-invalid').length > 0) return 0;
		else return 1;
	}
}

function inputController() {
	if(jQuery('div[data-screen="2"] .input-box > .row.base-row').length == 0) {
		jQuery('div[data-screen="2"] .input-box').append('<div class="row base-row">\
			<div class="col base-text">('+base+' = 0")</div> \
			<div class="col base-text">('+base+' = 0")</div> \
			</div>')
	}

	jQuery('div[data-screen="2"] button.next-up').click(function() {
		if(checkInput(cur_screen)) {
			jQuery('div[data-screen="2"] .input-box').prepend(getRow("+"))
		}
	})

	jQuery('div[data-screen="2"] button.next-down').click(function() {
		if(checkInput(cur_screen)) {
			jQuery('div[data-screen="2"] .input-box').append(getRow("-"))
		}
	})

	jQuery('div[data-screen="2"] button.clear-down').click(function(){
		x = jQuery('div[data-screen="2"] .input-box').children()
		if(!x.eq(-1).hasClass("base-row")) x.eq(-1).remove()
	})

	jQuery('div[data-screen="2"] button.clear-up').click(function(){
		x = jQuery('div[data-screen="2"] .input-box').children()
		if(!x.eq(0).hasClass("base-row")) x.eq(0).remove()
	})
}

function getRow(sign){
	block = jQuery('div[data-screen="2"]');
	return '<div class="row"> <input readonly class="col size-text" value="(' +
			block.find('input[name="width-up"]').val() +' ' + sign + 
			block.find('input[name="width-grade"]').val()+'&quot;)" /> <input readonly class="col size-text" value="(' +
			block.find('input[name="length-up"]').val() +' ' + sign + 
			block.find('input[name="length-grade"]').val()+'&quot;)" />';
}