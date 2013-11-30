
function testClick (target) {
	$(target).trigger('click');
};

function resetClick() {
	$('.fn:eq(0)').trigger('click');
}


test('menuBuilt', function() {
	ok(($('.notes-container').children().length > 0), 'menu items created')
});

test( 'testToggle', function() {
	testClick('.fn:eq(0)');
	ok($(document.documentElement).is('.notes-on'), 'class toggled on click');
	resetClick();
});

test('itemSelect', function(){
	testClick('.fn:eq(3)');
	ok($('.notes-container p:eq(3)').is('.active'), 'correct note selected');
	resetClick();
});