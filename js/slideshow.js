(function(){

	var slideshow ={
		slideshowLeft: slideshowLeft,
		slideshowRight: slideshowRight,
		slideMeterClick: slideMeterClick,
		animateLeftArrow: animateLeftArrow,
		animateRightArrow: animateRightArrow,
		autoSlide: autoSlide,
		assignSlideProperties: assignSlideProperties,
		setSlideOffsets: setSlideOffsets
	};

	//The autoSlide function rotates slides every five seconds
	function autoSlide(){
		autoSlideInterval = window.setInterval(function(){
			if(!slideButtonClicked && !pauseClicked){
				slideshow.slideshowLeft();
				slideInterval = window.setInterval(slideshow.slideshowLeft, 5000);
			}
		}, 5000);
	}

	//These slide properties are used for logistics and animation timing
	function assignSlideProperties(){
		for(i=0; i<slides.length; i++){
			slides[i].slideId = i;
			slideCaptions[i].slideCaptionId = i;
			slideMeterDots[i].slideMeterId = i;
		}
	}

	function slideMeterClick(){
		if(this.classList.contains('slideMeterOn')){
			window.clearInterval(autoSlideInterval);
		}
		else if(this.classList.contains('slideMeterOff')){
			window.clearInterval(autoSlideInterval);
		}
	}

	function slideshowLeft(){
		if(moveFlag){
			moveFlag = false;
			moveMeterLeft();
			var slideCurrent;
			var slideNext;
			var slideFutureNext;
			for(i=0; i<slides.length; i++){
				if(slides[i].classList.contains('slideFeatured')){
					slideCurrent = slides[i];
					if(i===slides.length-1){
						slideNext = 0;
						slideFutureNext = 1;
					}else if(i===slides.length-2){
						slideNext = i+1;
						slideFutureNext = 0;
					}
					else{
						slideNext = i+1;
						slideFutureNext = i+2;
					}	
				}
			}
			positionSlideNext(slides[slideFutureNext]);
			slideCurrent.classList.remove('slideFeatured');
			slides[slideNext].classList.add('slideFeatured');
			moveElementLeft(slideCurrent);
			moveElementLeft(slides[slideNext]);
			refreshCaption();
			window.setTimeout(function(){
				moveFlag = true;
				slideButtonClicked = false;
			}, 1000);	
		}
	}

	function slideshowRight(){
		if(moveFlag){
			moveFlag = false;
			moveMeterRight();
			var slideCurrent;
			var slidePrevious;
			var slideFuturePrevious;
			for(i=0; i<slides.length; i++){
				if(slides[i].classList.contains('slideFeatured')){
					slideCurrent = slides[i];
					if(i===0){
						slidePrevious = slides.length-1;
						slideFuturePrevious = slides.length-2;
					}else if(i===1){
						slidePrevious = i-1;
						slideFuturePrevious = slides.length-1;
					}
					else{
						slidePrevious = i-1;
						slideFuturePrevious = i-2;
					}	
				}
			}
			positionSlidePrevious(slides[slideFuturePrevious]);
			slideCurrent.classList.remove('slideFeatured');
			slides[slidePrevious].classList.add('slideFeatured');
			moveElementRight(slideCurrent);
			moveElementRight(slides[slidePrevious]);
			refreshCaption();
			window.setTimeout(function(){
				moveFlag = true;
				slideButtonClicked = false;
			}, 1000);	
		}
	}

	function animateLeftArrow(element){
		element.classList.add('moveArrowLeft');
		window.setTimeout(function(){
			element.classList.remove('moveArrowLeft');
		}, 1000)
	}

	function animateRightArrow(element){
		element.classList.add('moveArrowRight');
		window.setTimeout(function(){
			element.classList.remove('moveArrowRight');
		}, 1000)
	}

	function positionSlidePrevious(element){
		//The element parameter should be the slides[index] for the currently featured slide. 
		var previousOffset = 0 - (element.clientWidth-((documentWidth/2)-element.clientWidth/2));
		element.style.left = previousOffset + 'px';
	}

	function positionSlideNext(element){
		//The element parameter should be the slides[index] for the currently featured slide. 
		var nextOffset = element.clientWidth+((documentWidth/2)-element.clientWidth/2);
		element.style.left = nextOffset + 'px';
	}

	function moveElementRight(element){
		var counter = parseInt(element.style.left);
		//I would use 'toggle' below, but Internet Explorer lacks support as of this writing.
		if (!element.classList.contains('moveRight')){
			element.classList.add('moveRight');
		}
		window.setTimeout(function(){
			counter += element.clientWidth;
			element.style.left = counter + 'px';
			if(element.classList.contains('moveRight')){
				element.classList.remove('moveRight');
			}
			moveFlag = true;
		}, 1000);
	}

	function moveElementLeft(element){
		var counter = parseInt(element.style.left);
		//I would use 'toggle' below, but Internet Explorer lacks support as of this writing.
		if (!element.classList.contains('moveLeft')){
			element.classList.add('moveLeft');
		}
		window.setTimeout(function(){
			counter -= element.clientWidth;
			element.style.left = counter + 'px';
			if(element.classList.contains('moveLeft')){
				element.classList.remove('moveLeft');
			}
			moveFlag = true;
		}, 1000);
	}

	function moveMeterRight(){
		var slideMeterOn = document.getElementsByClassName('slideMeterOn');
		var slideMeterOff = document.getElementsByClassName('slideMeterOff');
		var previousMeter;
		if(slideMeterOn[0] !== slideMeterDots[0]){
			previousMeter = slideMeterOn[0].previousSibling;
			previousMeter.classList.add('slideMeterOn');
			previousMeter.classList.remove('slideMeterOff');
			slideMeterOn[1].classList.add('slideMeterOff');
			slideMeterOn[1].classList.remove('slideMeterOn');
		}else{
			previousMeter = slideMeterDots[slideMeterDots.length-1];
			previousMeter.classList.add('slideMeterOn');
			previousMeter.classList.remove('slideMeterOff');
			slideMeterOn[0].classList.add('slideMeterOff');
			slideMeterOn[0].classList.remove('slideMeterOn');
		}
	}

	function moveMeterLeft(){
		var slideMeterOn = document.getElementsByClassName('slideMeterOn');
		var slideMeterOff = document.getElementsByClassName('slideMeterOff');
		var nextMeter;
		if(slideMeterOn[0] !== slideMeterDots[slideMeterDots.length-1]){
			nextMeter = slideMeterOn[0].nextSibling;
			nextMeter.classList.add('slideMeterOn');
			nextMeter.classList.remove('slideMeterOff');
			slideMeterOn[0].classList.add('slideMeterOff');
			slideMeterOn[0].classList.remove('slideMeterOn');
		}else{
			nextMeter = slideMeterDots[0]
			nextMeter.classList.add('slideMeterOn');
			nextMeter.classList.remove('slideMeterOff');
			slideMeterOn[1].classList.add('slideMeterOff');
			slideMeterOn[1].classList.remove('slideMeterOn');
		}
	}

	function refreshCaption(){
		for(i=0; i<slideCaptions.length; i++){
			slideCaptions[i].classList.remove('slideCaptionOn');
			slideCaptions[i].classList.add('slideCaptionOff');
		}
		var slideFeatured = document.getElementsByClassName('slideFeatured');
		slideCaptions[slideFeatured[0].slideId].classList.remove('slideCaptionOff');
		slideCaptions[slideFeatured[0].slideId].classList.add('slideCaptionOn');
	}

	function setSlideOffsets(){
		var currentSlide = 0;
		for(i=0; i<slides.length; i++){
			if(slides[i].classList.contains('slideFeatured')){
				currentSlide = slides[i].slideId;
			}
		}




	}

	window.slideshow = slideshow;

})();