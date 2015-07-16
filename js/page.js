(function(){

	var page = {
		build:buildPage,
		refreshPage:refreshPage,
		getDocumentWidth:getDocumentWidth
	}

	//Window Elements


	var innerDocumentWidth = getDocumentWidth();
	var headerHeight = document.getElementById('tempHeader').clientHeight;
	var wrapperHeight = document.getElementById('wrapper').clientHeight;

	//Etc. Slideshow Elements

	var slideshow = document.getElementById('slideshow');
	var slideshowContainer = document.getElementById('slideshow')
	var slideMeter = document.getElementById('slideMeter');
	var slideMeterHeight = document.getElementById('slideMeter').clientHeight;
	var slideElementsHeight = document.getElementById('slideElements').clientHeight;
	var slideCaptionContainer = document.getElementById('slideCaptionContainer');

	//Slideshow Cover Elements

	var slideshowCoverLeft = document.getElementById('slideshowCoverLeft');
	var slideshowHeight = document.getElementById('slideshow').clientHeight;
	var slideArrowLeft = document.getElementById('leftArrow');
	var slideshowCoverCenter = document.getElementById('slideshowCoverCenter');
	var slideshowCoverRight = document.getElementById('slideshowCoverRight');
	var slideshowHeight = document.getElementById('slideshow').clientHeight;
	var slideArrowRight = document.getElementById('rightArrow');

	//The visible height is the height of the window's visible portion

	function getVisibleHeight(){
		var visibleHeight;
		if(typeof(window.innerHeight) == 'number'){
			//For non-IE browsers
			visibleHeight = window.innerHeight;
		}else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){
			//For IE ver 6+ in standards compliant mode
			visibleHeight = document.documentElement.clientHeight;
		}else if (document.body && (document.body.clientWidth || document.body.clientHeight)){
			//For IE ver 4
			visibleHeight = document.body.clientHeight;
		}

		return visibleHeight;
	}

	//The document width is the width of the window's display area

	function getDocumentWidth(){
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
	}

	//The width for slides based on the current document dimensions

	function getSlideWidth(){

		var documentWidth = getDocumentWidth();

		if(documentWidth-80>850){
			return 850;
		}else{
			return documentWidth-80;
		}

	}

	//The height for slides based on the current document dimensions

	function getSlideHeight(){

		return Math.floor((getSlideWidth()/8)*5);

	}


	//This doesn't create the slides, but assigns them their dimensional aspects. 
	function buildSlides(){

		var slideHeight = getSlideHeight();
		var slideWidth = getSlideWidth();

		slideshow.style.height = slideHeight + "px";
		for(i=0; i<slides.length; i++){
			slides[i].style.width = slideWidth + "px";
			slides[i].style.height = slideHeight + "px";
			slides[i].style.display = 'block';
			
		}
	}

	//Since all the slides are 'onscreen' at the same time, the cover gives the appearance of
	//a formatted viewing box. There is a left, center and right cover. 

	function buildSlideshowCover(){

		slideshowHeight = document.getElementById('slideshow').clientHeight;
		slideOffset = getSlideOffset();

		//Left slideshow cover

		slideshowCoverLeft.style.height = slideshowHeight + 'px';
		slideshowCoverLeft.style.width = slideOffset;
		slideArrowLeft.style.left = 0;
		slideArrowLeft.style.top = (slideshowHeight/2-(slideArrowLeft.clientHeight/2))+'px';

		//Center slideshow cover

		slideshowCoverCenter.style.height = slideshowHeight + 'px';
		slideshowCoverCenter.style.width = getSlideWidth() + 'px';
		slideshowCoverCenter.style.left = parseInt(slideOffset) + 'px';

		//Right slideshow cover

		slideshowCoverRight.style.height = slideshowHeight + 'px';
		slideshowCoverRight.style.width = slideOffset;
		slideshowCoverRight.style.left = parseInt(slideOffset) + getSlideWidth() + 'px';
		slideArrowRight.style.left = 0;
		slideArrowRight.style.top = (slideshowHeight/2-(slideArrowRight.clientHeight/2))+'px';
	}

	//The slide offset is used to arrange slide covers as well as slides in sequence
	function getSlideOffset(){
		return (getDocumentWidth()/2)-(getSlideWidth()/2) + 'px';
	}

	//The slider meter keeps track of which the total number of slides and which is displayed
	//This only sets the width of the div, but it should scale with a large # of slides
	function buildSlideshowMeter(){
		slideMeter.style.width = (slideMeterDots.length * 16) + 12 + 'px';
	}

	//The slide offsets orient the slideshow elements from left to right
	function buildSlideOffsets(){
		//Assign offsets for the slides, keeping the main slide (slides[0]) in the center

		var slideOffset = getSlideOffset();
		var slideWidth = getSlideWidth();
		var currentSlide;
		var previousSlide;

		//Set the offset for the currently featured slide

		for(i=0; i<slides.length; i++){
			if(slides[i].classList.contains('slideFeatured')){
				slides[i].style.left = parseInt(slideOffset) + 'px';
				currentSlide = slides[i].slideNumber;
			}
		}

		//Set the offset for the slide previous to the featured one

		console.log('current slide:' + currentSlide);
		console.log('number of slides: ' + slides.length);

		for(i=0; i<slides.length; i++){
			if(!slides[i].classList.contains('slideFeatured') && currentSlide == 1 && slides[i].slideNumber == slides.length){
				slides[i].style.left = 0 - (slideWidth - parseInt(slideOffset)) + 'px';
				previousSlide = slides[i].slideNumber;
				console.log('worked');
			}else if(!slides[i].classList.contains('slideFeatured') && currentSlide > 1 && slides[i].slideNumber == currentSlide-1){
				slides[i].style.left = 0 - (slideWidth - parseInt(slideOffset)) + 'px';
				previousSlide = slides[i].slideNumber;
				console.log('worked');
			}
		}

		//Set the offset for the slides that come after the featured one

		for(i=0; i<slides.length; i++){
			//The current slide is the last in the list
			if(!slides[i].classList.contains('slideFeatured') && slides[i].slideNumber != previousSlide && slides[i].slideNumber != currentSlide){
				slides[i].style.left = ((slideWidth)+parseInt(slideOffset))+'px' 
			}

			//The current slide is the first in the list
			//The current slide is neither the first nor last
		}

	}


	//This sizes all the elements on a load. It has more events than when the page is resized.
	function buildPage(){

		var slideHeight = getSlideHeight();
		var slideWidth = getSlideWidth();

		//Create the slideshow

		buildSlides();

		//Assign offsets for the slides, keeping the main slide (slides[0]) in the center
		//This is only viable for the initial page load without any moved slides. 

		slideOffset = getSlideOffset();

		slides[0].classList.add('slideFeatured');
		slides[0].style.left = slideOffset;
		slideCaptions[0].classList.remove('slideCaptionOff');
		slideCaptions[0].classList.add('slideCaptionOn');
		slides[slides.length-1].style.left = 0 - (slideWidth - parseInt(slideOffset)) + 'px';
		for(i=1; i<slides.length-1; i++){
			slides[i].style.left = ((slideWidth)+parseInt(slideOffset))+'px';
		}
		
		//Build the left, center and right slideshow covers

		buildSlideshowCover();

		//Slider Meter

		slideMeterDots[0].classList.remove('slideMeterOff');
		slideMeterDots[0].classList.add('slideMeterOn');
		buildSlideshowMeter();

	}

	//Refreshing the page requires a rebuild of most elements

	function refreshPage(){

		var slideHeight = getSlideHeight();
		var slideWidth = getSlideWidth();

		//Create the slideshow

		buildSlides();
		buildSlideshowCover();
		buildSlideOffsets();
	}



	window.page = page;

})();