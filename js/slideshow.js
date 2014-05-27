(function() {

	/******************************
	* STATIC VARIABLES
	******************************/
	var THUMBNAIL_WIDTH = 140,		// Width(px) of thumbnail image
		GALLERY = $('#slideshow');	// Top-level container for slideshow


	/******************************
	* EVENT LISTENERS
	******************************/
	GALLERY.find('.thumb').on('click', function() {
		// Slide to and show clicked image
		loadClickedImage($(this).data('thumb-id'));
	});

	GALLERY.find('#prev-btn').on('click', function() {
		// Slide to and show previous image
		navigateSlideshow('previous');
	});

	GALLERY.find('#next-btn').on('click', function() {
		// Slide to and show next image
		navigateSlideshow('next');
	});

	GALLERY.find('#fullscreen-btn').on('click', function() {
		if(GALLERY.hasClass('fullscreen')) {
			// Collapse slideshow to normal size
			collapseFullscreen();
		} else {
			// Expand slideshow to fill viewport
			expandFullscreen();
		}
	});

	$(document).keydown(function(e){
		switch(e.keyCode) {
			// Left arrow press
			case 37:
				navigateSlideshow('previous');
				break;
			// Right arrow press
			case 39:
				navigateSlideshow('next');
				break;
			default:
				break;
		}
	});


	/******************************
	* GALLERY FUNCTIONS
	******************************/

	/**
	 * Function to determine the image in slideshow to show
	 * @param {String} action - 'previous' or 'next'
	 * @return UNDEFINED
	 */
	var navigateSlideshow = function(action) {
		// Getting active image in slideshow
		var active = GALLERY.find('.img-wrapper.active');

		if (active.length === 0) {
			// If no active image currently, then set last image as active
			active = GALLERY.find('.img-wrapper:last');
		}

		// Calling to load next or previous image
		if(action === "next") {
			loadNextImage(active);
		} else {
			loadPrevImage(active);
		}
	};

	/**
	 * Function to load next image in slideshow
	 * @param  {Object} active - current active slideshow image
	 * @return UNDEFINED
	 */
	var loadNextImage = function(active) {
		// Getting the next image to show and it's respective
		// thumbnail to slide to
		var next =  active.next(".img-wrapper").length ? active.next(".img-wrapper") : GALLERY.find('.img-wrapper:first'),
			nextThumb = GALLERY.find('[data-thumb-id="' + next.data('img-id') + '"]');

		// Setting next image and thumbnail properties and
		// removing properties from previous image/thumbnail
		GALLERY.find('.thumb').removeClass('active');
		nextThumb.addClass('active');
		active.addClass('last-active');

		// Transitioning to next image and thumbnail
		scrollThumbnails(nextThumb);
		next.css({opacity: 0.0})
			.addClass('active')
			.animate({opacity: 1.0}, 1000, function() {
				active.removeClass('active last-active');
			});
	};

	/**
	 * Function to load previous image in slideshow
	 * @param  {Object} active - current active slideshow image
	 * @return UNDEFINED
	 */
	var loadPrevImage = function(active) {
		// Getting the previous image to show and it's respective
		// thumbnail to slide to
		var prev =  active.prev(".img-wrapper").length ? active.prev(".img-wrapper") : GALLERY.find('.img-wrapper:last'),
			prevThumb = GALLERY.find('[data-thumb-id="' + prev.data('img-id') + '"]');

		// Setting previous image and thumbnail properties and
		// removing properties from previous image/thumbnail
		GALLERY.find('.thumb').removeClass('active');
		prevThumb.addClass('active');
		active.addClass('last-active');

		// Transitioning to next image & thumbnail
		scrollThumbnails(prevThumb);
		prev.css({opacity: 0.0})
			.addClass('active')
			.animate({opacity: 1.0}, 1000, function() {
				active.removeClass('active last-active');
			});
	};

	/**
	 * Function to load clicked image in slideshow
	 * @param  {Integer} id - ID of clicked image
	 * @return UNDEFINED
	 */
	var loadClickedImage = function(id) {
		// Getting the clicked image to show and it's respective
		// thumbnail to slide to
		var image =  GALLERY.find('[data-img-id="' + id + '"]'),
			imgThumb = GALLERY.find('[data-thumb-id="' + id + '"]'),
			currActive = GALLERY.find('.img-wrapper.active');

		// Setting clicked image and thumbnail properties and
		// removing properties from previous image/thumbnail
		GALLERY.find('.thumb').removeClass('active');
		currActive.addClass('last-active').removeClass('active');
		imgThumb.addClass('active');
	    
		// Transitioning to image & thumbnail
		scrollThumbnails(imgThumb);
		image.css({opacity: 0.0})
			.addClass('active')
			.animate({opacity: 1.0}, 1000, function() {
				currActive.removeClass('last-active');
			});
	};

	/**
	 * Function to scroll thumbnails left and right
	 * @param  {Object} thumb - thumbnail to bring into view
	 * @return UNDEFINED
	 */
	var scrollThumbnails = function(thumb) {
		var offset, // used for thumbnail offset
			first,  // stores first thumbnail object
			x = thumb.position().left + parseInt(thumb.css('margin-left'), 10);

		// Checking current thumbnail offset and
		// bringing into view if currently not fully
		// visible in container
		if(x < 0) {
			first = GALLERY.find('.thumb:first');
			offset = parseInt(first.css('margin-left'), 10) - x;
			first.animate({
				marginLeft: offset
			}, 1000);
		} else {
			x = thumb.position().left;
			var currOffset = ( x + THUMBNAIL_WIDTH ) - thumb.parent().width();
			if(currOffset > 0) {
				first = GALLERY.find('.thumb:first');
				offset = parseInt(first.css('margin-left'), 10) - currOffset;
				first.animate({
					marginLeft: offset
				}, 1000);
			}
		}
	};

	/**
	 * Method to expand slideshow to 
	 * fill the entire viewport
	 * @return UNDEFINED
	 */
	var expandFullscreen = function() {
		GALLERY.addClass('fullscreen')
			.find('#fullscreen-btn i')
			.removeClass('fa-expand')
			.addClass('fa-compress');
	};

	/**
	 * Method to collapse slideshow to 
	 * fill only the parent container
	 * @return UNDEFINED
	 */
	var collapseFullscreen = function() {
		GALLERY.removeClass('fullscreen')
			.find('#fullscreen-btn i')
			.removeClass('fa-compress')
			.addClass('fa-expand');
	};

}());