
//Style variables for page width, height

console.log(page.getDocumentWidth());

var body = document.body;
var html = document.documentElement;
var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, 
	html.clientHeight, html.scrollHeight, html.offsetHeight);
var documentWidth = Math.max(body.clientWidth, body.offsetWidth, 
	html.clientWidth, html.offsetWidth);

//The slideshow

var slides = document.getElementsByClassName('slide');
var slideCaptions = document.getElementsByClassName('slideCaption');
var slideMeterDots = document.getElementsByClassName('slideMeterDot');

//Slideshow Functions

var slideWidth = (documentHeight/6);

//moveFlag prevents button spam. 'True' means the move event will work. 
var moveFlag = true;
//These determine if the user has clicked a directional arrow.
//When they are 'on' the default timer will pause. 
var slideButtonClicked = false;
var pauseClicked = false;
//The basic slide interval used when nothing has been clicked. 
var slideInterval;
//If no dot has been clicked on the meter, the auto slide will run. It will restart when the "play"
//button is pressed. 
var autoSlideInterval;

//Events for responsive design

window.onload = function(){
	//Setting the minimum size of the main content area
	page.build();
	//Assign id numbers to slides and their elements
	slideshow.assignSlideProperties();
	//Default instance of the slide animation timer
 	//slideshow.autoSlide();
}

window.onresize = function(){
	//Refresh the page elements
	page.refreshPage();
	console.log(page.getDocumentWidth());
}

document.getElementById('leftArrow').onclick = function(){
	if(!slideButtonClicked){
		window.clearInterval(slideInterval);
		slideButtonClicked = true;
		slideshow.slideshowLeft();
		slideshow.animateLeftArrow(this);
	}
}

document.getElementById('rightArrow').onclick = function(){
	if(!slideButtonClicked){
		window.clearInterval(slideInterval);
		slideButtonClicked = true;
		slideshow.slideshowRight();	
		slideshow.animateRightArrow(this);	
	}
}

for(i=0; i<slides.length; i++){
	slideMeterDots[i].addEventListener('click', slideshow.slideMeterClick);
}






