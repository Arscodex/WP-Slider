(function(){

	var page = {
		build:buildPage
	}

	var spotlightArray = document.getElementsByClassName('spotlight');
	var spotlightPostArray = document.getElementsByClassName('spotlightPost');
	var spotlights = document.getElementById('spotlights');

	function spotlightOn(index){
		return function(){
			var spotlightScroll = document.getElementById('onStage').offsetTop;
			var currentScrollTop = document.body.scrollTop;
			if(spotlightScroll>currentScrollTop){
				window.scrollTo(0,spotlightScroll);
			}
			for(j=0; j<spotlightPostArray.length; j++){
				spotlightPostArray[j].style.display = 'none';
				spotlightArray[j].classList.remove('activeSpotlight');
			}
			spotlightPostArray[index].style.display = 'block';
			spotlightArray[index].classList.add('activeSpotlight');
		}
		
	}
		
	function buildPage(){
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

		//Element Variables

		var headerHeight = document.getElementById('header').clientHeight;
		var slideshow = document.getElementById('slideshow');
		var slideshowContainerHeight = document.getElementById('slideshow').clientHeight;
		var onStageHeight = document.getElementById('onStage').clientHeight;
		var wrapperHeight = document.getElementById('wrapper').clientHeight;
		var slideMeterHeight = document.getElementById('slideMeter').clientHeight;
		var slideElementsHeight = document.getElementById('slideElements').clientHeight;
		var slideCaptionContainer = document.getElementById('slideCaptionContainer');

		//Spotlight toolbar and elements

		spotlightArray[0].classList.add('activeSpotlight');
		spotlightPostArray[0].style.display = 'block';

		for(i=0; i<spotlightArray.length; i++){
			spotlightArray[i].addEventListener("click", spotlightOn(i));
		}

		//Spotlight widths

		for(i=0; i<spotlightArray.length; i++){
			spotlightArray[i].style.width = 90/(spotlightArray.length) + "%";
		}

		//Check to see if the document width is consistent from initial to final load
		/*
		var currentDocumentWidth = Math.max(body.clientWidth, body.offsetWidth, 
		html.clientWidth, html.offsetWidth);

		if (documentWidth > currentDocumentWidth){
			documentWidth = currentDocumentWidth;
		}
		*/

		//Get the variable height for the slideshow area by accounting for the other elements first.

		var slideVariableHeight = visibleHeight - (headerHeight + onStageHeight + slideElementsHeight);

		//Set the height and width of the slides and the slideshow area.
		var totalVisibleHeight = headerHeight + onStageHeight + slideElementsHeight + slideVariableHeight;

		var slideHeight = Math.floor(slideVariableHeight);
		var slideWidth = Math.floor((slideHeight/5)*8);
		slideshow.style.height = slideHeight + "px";
		for(i=0; i<slides.length; i++){
			slides[i].style.width = slideWidth + "px";
			slides[i].style.height = slideHeight + "px";
			slides[i].style.display = 'block';
			
		}

		//Assign offsets for the slides, keeping the main slide (slides[0]) in the center

		var slideOffset = (documentWidth/2)-(slideWidth/2) + 'px';

		slides[0].classList.add('slideFeatured');
		slides[0].style.left = slideOffset;
		slides[slides.length-1].style.left = 0 - (slideWidth - parseInt(slideOffset)) + 'px';
		for(i=1; i<slides.length-1; i++){
			slides[i].style.left = ((slideWidth)+parseInt(slideOffset))+'px';
		}
		
		//Vertically center the slideshow covers and their inherent arrows

		var slideshowCoverLeft = document.getElementById('slideshowCoverLeft');
		var slideshowHeight = document.getElementById('slideshow').clientHeight;
		var slideArrowLeft = document.getElementById('leftArrow')
		slideshowCoverLeft.style.height = slideshowHeight + 'px';
		slideshowCoverLeft.style.width = slideOffset;
		//slideArrowLeft.style.left = (slideshowCoverLeft.clientWidth/2 - (slideArrowLeft.clientWidth/2)+'px');
		slideArrowLeft.style.left = 0;
		slideArrowLeft.style.top = (slideshowHeight/2-(slideArrowLeft.clientHeight/2))+'px';

		var slideshowCoverRight = document.getElementById('slideshowCoverRight');
		var slideshowHeight = document.getElementById('slideshow').clientHeight;
		var slideArrowRight = document.getElementById('rightArrow')
		slideshowCoverRight.style.height = slideshowHeight + 'px';
		slideshowCoverRight.style.width = slideOffset;
		slideshowCoverRight.style.left = parseInt(slideOffset) + slideWidth + 'px';
		//slideArrowRight.style.left = (slideshowCoverRight.clientWidth/2 - (slideArrowRight.clientWidth/2)+'px');
		slideArrowRight.style.left = 0;
		slideArrowRight.style.top = (slideshowHeight/2-(slideArrowRight.clientHeight/2))+'px';
	}

	window.page = page;

}());