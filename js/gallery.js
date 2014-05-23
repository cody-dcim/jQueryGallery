var tId,
	THUMBNAIL_WIDTH = 140;

var slideNext = function() {
	
    var active = $('#slideshow .img-wrapper.active');

    if (active.length === 0) { active = $('#slideshow .img-wrapper:last'); }

    active.addClass('last-active');

    // Setting next image & thumb properties
    loadNextImage(active);
};

var slidePrev = function() {
    var active = $('#slideshow .img-wrapper.active');

    if (active.length === 0) { active = $('#slideshow .img-wrapper:last'); }

    active.addClass('last-active');

    // Setting next image & thumb properties
    loadPrevImage(active);
};

var loadNextImage = function(active) {
	var next =  active.next(".img-wrapper").length ? active.next(".img-wrapper") : $('#slideshow .img-wrapper:first'),
		nextThumb = $('[data-thumb-id="' + next.data('img-id') + '"]');

	// Setting next image & thumb properties
	$('.thumb').removeClass('active');
    nextThumb.addClass('active');
    scrollThumbnails(nextThumb);
    next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            active.removeClass('active last-active');
        });
};

var loadPrevImage = function(active) {
	var prev =  active.prev(".img-wrapper").length ? active.prev(".img-wrapper") : $('#slideshow .img-wrapper:last'),
		prevThumb = $('[data-thumb-id="' + prev.data('img-id') + '"]');

	// Setting next image & thumb properties
	$('.thumb').removeClass('active');
	prevThumb.addClass('active');
	scrollThumbnails(prevThumb);
    prev.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            active.removeClass('active last-active');
        });
};

var loadClickedImage = function(id) {
	var image =  $('[data-img-id="' + id + '"]'),
		imgThumb = $('[data-thumb-id="' + id + '"]'),
		currActive = $('.img-wrapper.active');

	// Setting next image & thumb properties
	currActive.addClass('last-active').removeClass('active');
	$('.thumb').removeClass('active');

    imgThumb.addClass('active');
    scrollThumbnails(imgThumb);
    image.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            currActive.removeClass('last-active');
        });
};

var handleThumbClick = function(intervalId, imgId) {
		loadClickedImage(imgId);
};

var scrollThumbnails2 = function(thumb) {
	var x = thumb.position().left;
	var currOffset = (x + THUMBNAIL_WIDTH) - thumb.parent().width();
	if( currOffset > 0 ) {
		var first = $('.thumb').first();
		var offset = parseInt(first.css('margin-left'), 10) - currOffset;
		first.animate({marginLeft: offset}, 1000);
		console.log('Need to slide left -- offset = ' + offset);
	}
	console.log("x: " + x);
	console.log('currOffset: ', currOffset);
};

var scrollThumbnails = function(thumb) {
	var x = thumb.position().left + parseInt(thumb.css('margin-left'), 10);

	if(x < 0) {
		var first = $('.thumb').first();
		var offset = parseInt(first.css('margin-left'), 10) - x;
		first.animate({marginLeft: offset}, 1000);
	} else {
		x = thumb.position().left;
		var currOffset = (x + THUMBNAIL_WIDTH) - thumb.parent().width();
		if( currOffset > 0 ) {
			var first = $('.thumb').first();
			var offset = parseInt(first.css('margin-left'), 10) - currOffset;
			first.animate({marginLeft: offset}, 1000);
			console.log('Need to slide left -- offset = ' + offset);
		}
	}
};

$(function() {
	$('.thumb').on('click', function() {
		handleThumbClick(tId, $(this).data('thumb-id'));
	});
	// Handling prev and next arrow presses
	$('#prev-btn').on('click', function() {
		slidePrev();
	});
	$('#next-btn').on('click', function() {
		slideNext();
	});
	// Binding arrow keypress to navigate images
	$(document).keydown(function(e){
		switch(e.keyCode) {
			case 37:
				$('.thumb').removeClass('active');
				slidePrev();
				break;
			case 39:
				$('.thumb').removeClass('active');
				slideNext();
				break;
			default:
				break;
		}
	});
}());