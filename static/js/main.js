$(document).ready(function() {
	$('select').formSelect();
	// $('input#input_text, textarea#textarea2').characterCounter();
	$('.sidenav').sidenav();
	//TODO: Adjust tool tip delays
	$('.tooltipped').tooltip();
	$('.collapsible').collapsible({
		inDuration: 250,
		outDuration: 250
	});
	$('.modal').modal({ opacity: 0.2 });
	$('.fixed-action-btn').floatingActionButton();
});

// shows value of slider
function displaySliderValue(slider_name) {
	let sliderNameValue = $(`input[name="${slider_name}"]`).val();
	$(`#${slider_name}_span`).text(`${sliderNameValue}`);
}

// Delete button
$('.delete-btn').on('click', function() {
	brew_name = $(this).attr('id');
	M.toast({
		html: 'Deleted: ' + brew_name,
		classes: 'rounded',
		displayLength: 4000
	});
});

$('.edit-btn').on('click', function() {
	console.log('EDIT clicked.');
	// TODO: change 'this' to use li id selector. hide/show based on a single class eg 'sliders'
	// Show slider
	$(this)
		.siblings('.collection')
		.find('.coffee-weight-slider')
		.removeClass('hide');
	// Show Submit Changes button
	$(this)
		.siblings('.make-changes-btn')
		.removeClass('hide');
	$(this)
		.siblings('.cancel-changes-btn')
		.removeClass('hide');
	//  hide edit butonn
	$(this).addClass('hide');
});

// Make changes btn
$('.make-changes-btn').on('click', function() {
	let coffee = $(this)
		.parent()
		.find('.coffee-weight-slider')
		.attr('value');
	// toast
	M.toast({
		html: 'Updated',
		classes: 'rounded',
		displayLength: 4000
	});
});

$('.coffee-weight-slider').on('click', function() {
	let newSliderValue = $(this)
		.next()
		.children('.value')
		.text();
	//update span w class=title
	$(this)
		.prev('.title')
		.text(newSliderValue + 'g');
	//update actual value of slider
	$(this).attr('value', newSliderValue);
});

$('.cancel-changes-btn').on('click', function() {
	// exit 'edit mode' (remove sliders etc)

	// Collapse body
	$(this)
		.parents('.collapsible-body')
		.attr('style', '');
	//  Collapse header
	$(this)
		.parents('li')
		.toggleClass('active');
	//  hide cancel changes btn and Submit changes btn
	$(this).addClass('hide');
	$(this)
		.siblings('.make-changes-btn')
		.addClass('hide');
	// make edit btn shown
	$(this)
		.siblings('.edit-btn')
		.removeClass('hide');
});

// Add step buton
$('.add-step-btn').on('click', function() {
	// Get current step count (number of children)
	let stepCounter = $(this)
		.siblings('.steps')
		.children().length;
	let nextStep = stepCounter + 1;

	// Add nother step only if previous step not blank
	if ($(`#step_${stepCounter}`).hasClass('valid')) {
		$(this).siblings('.steps').append(`
     <div class="input-field step">
     <input id="step_${nextStep}" name="step_${nextStep}" type="text" class="validate" required>
     <label for="step_${nextStep}">Step ${nextStep}</label>
     </div>`);
		// put focus on that step
		$(`#step_${nextStep}`).focus();
	} else {
		alert('do first step then add');
	}
});

$('.thumb-anchor').on('click', function() {
	// TODO: figure out why this isnt being triggered
	// update like count
	//  * Toasts will have to be initialised after each ajax request
	console.log('Thumb clicked');
	M.toast({
		html: 'Liked',
		classes: 'rounded',
		displayLength: 4000
	});
});

// OLD way: use localStorage to persist checkboxes (or use session storage?)
// source: https://www.sitepoint.com/quick-tip-persist-checkbox-checked-state-after-page-reload/

$('#reset-filters').on('click', function() {
	// TODO: Make Reset btn
});

// * on click of sort, submit the form
$('#filters').on('change', function() {
	// * instead of sort by, should be when any part of form changes,
	// *  and serialise will take care of the rest
	console.log('FILTERS changed!');
	getFirstPage();
});

// test
// function initializeMaterialize() {
// 	alert('test');
// 	$('.sidenav').sidenav();
// 	$('.tooltipped').tooltip();
// 	$('.collapsible').collapsible({
// 		induration: 250,
// 		outduration: 250
// 	});
// 	$('select').formselect();
// 	$('.modal').modal({ opacity: 0.2 });
// 	$('.fixed-action-btn').floatingactionbutton();
// }
