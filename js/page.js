(function(){

	var page = {
		build:buildPage,
		refreshPage:refreshPage,
		getDocumentWidth:getDocumentWidth
	}

	//Element Variables

		var headerHeight = document.getElementById('tempHeader').clientHeight;
		var slideshow = document.getElementById('slideshow');
		var slideshowContainer = document.getElementById('slideshow')
		var wrapperHeight = document.getElementById('wrapper').clientHeight;
		var slideMeterHeight = document.getElementById('slideMeter').clientHeight;
		var slideElementsHeight = document.getElementById('slideElements').clientHeight;
		var slideCaptionContainer = document.getElementById('slideCaptionContainer');

		var slideshowCoverLeft = document.getElementById('slideshowCoverLeft');
		var slideshowHeight = document.getElementById('slideshow').clientHeight;
		var slideArrowLeft = document.getElementById('leftArrow');

		var slideshowCoverCenter = document.getElementById('slideshowCoverCenter');

		var slideshowCoverRight = document.getElementById('slideshowCoverRight');
		var slideshowHeight = document.getElementById('slideshow').clientHeight;
		var slideArrowRight = document.getElementById('rightArrow');

	//Slide Scaling Elements

		var slideOffset;

	//Window Elements
		var visibleHeight = 0;
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
		var innerDocumentWidth = getDocumentWidth();

	function getDocumentWidth(){
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
	}

	function getSlideWidth(){

		//Get the variable height for the slideshow area by accounting for the other elements first.

		var slideVariableHeight = visibleHeight - (headerHeight + slideElementsHeight);

		//Set the height and width of the slides and the slideshow area.
		var totalVisibleHeight = headerHeight + slideElementsHeight + slideVariableHeight;

		var slideHeight = Math.floor(slideVariableHeight);

		//The slideWidth comes from the predefined cropping ratio for slides
		var slideWidth = Math.floor((slideHeight/5)*8);

	}

	function buildPage(){

		slideshow.style.height = slideHeight + "px";
		for(i=0; i<slides.length; i++){
			slides[i].style.width = slideWidth + "px";
			slides[i].style.height = slideHeight + "px";
			slides[i].style.display = 'block';
			
		}

		//Assign offsets for the slides, keeping the main slide (slides[0]) in the center

		slideOffset = (innerDocumentWidth/2)-(getSlideWidth()/2) + 'px';

		for(i=0; i<slides.length; i++){
			slides[i].slideNumber = i + 1;
		}

		slides[0].classList.add('slideFeatured');
		slides[0].style.left = slideOffset;
		slides[slides.length-1].style.left = 0 - (slideWidth - parseInt(slideOffset)) + 'px';
		for(i=1; i<slides.length-1; i++){
			slides[i].style.left = ((slideWidth)+parseInt(slideOffset))+'px';
		}
		
		//Vertically center the slideshow covers and their inherent arrows

		slideshowHeight = document.getElementById('slideshow').clientHeight;
		slideshowHeight = document.getElementById('slideshow').clientHeight;

		//Left slideshow cover

		slideshowCoverLeft.style.height = slideshowHeight + 'px';
		slideshowCoverLeft.style.width = slideOffset;
		slideArrowLeft.style.left = 0;
		slideArrowLeft.style.top = (slideshowHeight/2-(slideArrowLeft.clientHeight/2))+'px';

		//Center slideshow cover

		slideshowCoverCenter.style.height = slideshowHeight + 'px';
		slideshowCoverCenter.style.width = slideWidth + 'px';
		slideshowCoverCenter.style.left = parseInt(slideOffset) + 'px';

		//Right slideshow cover

		slideshowCoverRight.style.height = slideshowHeight + 'px';
		slideshowCoverRight.style.width = slideOffset;
		slideshowCoverRight.style.left = parseInt(slideOffset) + slideWidth + 'px';
		slideArrowRight.style.left = 0;
		slideArrowRight.style.top = (slideshowHeight/2-(slideArrowRight.clientHeight/2))+'px';

		//Slider Meter
		var slideMeter = document.getElementById('slideMeter');
		slideMeterDots = document.getElementsByClassName('slideMeterDot');
		slideMeter.style.width = (slideMeterDots.length * 16) + 12 + 'px';
		slideMeterDots[0].classList.remove('slideMeterOff');
		slideMeterDots[0].classList.add('slideMeterOn');

	}

	function refreshPage(){

		//Get the variable height for the slideshow area by accounting for the other elements first.

		var slideVariableHeight = visibleHeight - (headerHeight + slideElementsHeight);

		//Set the height and width of the slides and the slideshow area.
		var totalVisibleHeight = headerHeight + slideElementsHeight + slideVariableHeight;

		var slideHeight = Math.floor(slideVariableHeight);

		//The slideWidth comes from the predefined cropping ratio for slides
		var slideWidth = Math.floor((slideHeight/5)*8);
		slideshow.style.height = slideHeight + "px";
		for(i=0; i<slides.length; i++){
			slides[i].style.width = slideWidth + "px";
			slides[i].style.height = slideHeight + "px";
			slides[i].style.display = 'block';
			
		}

		//Assign offsets for the slides, keeping the main slide (slides[0]) in the center

		slideOffset = (innerDocumentWidth/2)-(slideWidth/2) + 'px';

		var currentSlide = 0;
		var previousSlide = 0;

		//Set the offset for the currently featured slide

		for(i=0; i<slides.length; i++){
			if(slides[i].classList.contains('slideFeatured')){
				slides[i].style.left = slideOffset;
				currentSlide = slides[i].slideNumber;
			}
		}

		//Set the offset for the slide previous to the featured one

		for(i=0; i<slides.length; i++){
			if(!slides[i].classList.contains('slideFeatured') && currentSlide == 1 && slides[i].slideNumber == slides.length+1){
				slides[i].style.left = 0 - (slideWidth - parseInt(slideOffset)) + 'px';
				previousSlide = slides[i].slideNumber;
			}else if(!slides[i].classlist.contains('slideFeatured') && currentSlide > 1 && slides[i].slideNumber == currentSlide-1){
				slides[i].style.left = 0 - (slideWidth - parseInt(slideOffset)) + 'px';
				previousSlide = slides[i].slideNumber;
			}
		}

		//Set the offset for the slides that come after the featured one

		for(i=0; i<slides.length; i++){
			//The current slide is the last in the list
			if(slides[i].slideNumber != previousSlide || slides[i].slideNumber != currentSlide || currentSlide == slides.length + 1){

			}
			//The current slide is the first in the list

			//The current slide is neither the first nor last
		}

		slides[0].style.left = slideOffset;
		slides[slides.length-1].style.left = 0 - (slideWidth - parseInt(slideOffset)) + 'px';
		for(i=1; i<slides.length-1; i++){
			slides[i].style.left = ((slideWidth)+parseInt(slideOffset))+'px';
		}
		
		//Vertically center the slideshow covers and their inherent arrows

		slideshowHeight = document.getElementById('slideshow').clientHeight;
		slideshowHeight = document.getElementById('slideshow').clientHeight;

		//Left slideshow cover

		slideshowCoverLeft.style.height = slideshowHeight + 'px';

		if(innerDocumentWidth/slideWidth>0.5){

		}else if(innerDocumentWidth/slideWidth<0.5)

		slideshowCoverLeft.style.width = slideOffset;
		slideArrowLeft.style.left = 0;
		slideArrowLeft.style.top = (slideshowHeight/2-(slideArrowLeft.clientHeight/2))+'px';

		//Center slideshow cover

		slideshowCoverCenter.style.height = slideshowHeight + 'px';
		slideshowCoverCenter.style.width = slideWidth + 'px';
		slideshowCoverCenter.style.left = parseInt(slideOffset) + 'px';

		//Right slideshow cover

		slideshowCoverRight.style.height = slideshowHeight + 'px';
		slideshowCoverRight.style.width = slideOffset;
		slideshowCoverRight.style.left = parseInt(slideOffset) + slideWidth + 'px';
		slideArrowRight.style.left = 0;
		slideArrowRight.style.top = (slideshowHeight/2-(slideArrowRight.clientHeight/2))+'px';

		//Slider Meter
		var slideMeter = document.getElementById('slideMeter');
		var slideMeterDots = document.getElementsByClassName('slideMeterDot');
		slideMeter.style.width = (slideMeterDots.length * 16) + 12 + 'px';
	}

	window.page = page;

})();