<?php

	add_theme_support('post-thumbnails');

	function slider_scripts(){
		//wp_enqueue_style('interact-style', get_stylesheet_uri() );
		wp_register_script('slideshow', get_template_directory_uri() . '/js/slideshow.js', null, '4.1.1', true);
		wp_register_script('page', get_template_directory_uri() . '/js/page.js', null, '4.1.1', true);
		wp_enqueue_script('slider-script', get_template_directory_uri() . '/js/app.js', array('slideshow', 'page'), '4.1.1', true);
	}

	add_action('wp_enqueue_scripts', 'slider_scripts');


?>