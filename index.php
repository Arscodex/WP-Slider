<!-- INDEX.PHP BELOW -->
<!DOCTYPE html>
<html lang='en'>
<head>
	<meta charset='UTF-8'/>
	<meta name='viewport' content="width=device-width, initial-scale=1"/>
	<link rel='stylesheet' type='text/css' href="<?php bloginfo('stylesheet_url'); ?>">
	<title></title>
	<?php wp_head(); ?> 
</head>
<body>
	<!--?php get_header(); ?-->
	<div id='tempHeader'>Wordpress Slider</div>
	<div id='wrapper'>
		<div id='slideshow' style='min-height:0px'>
			<div id='slideshowContainer'>
				<?php
					//Count the number of slides
					$posts_array = get_posts( array('category_name' => 'Front Page Slide'));
					//The slide scale determines the loop behavior
					$slideScale;
					if(count($posts_array) == 1):
						$slideScale = 3;
					elseif(count($posts_array) == 2):
						$slideScale = 2;
					else:
						$slideScale = 1;
					endif;
					//Generate the slides
					for($i=0; $i<$slideScale; $i++){
						if (have_posts()) : 
							while (have_posts()) : the_post();
								if (in_category('Front Page Slide')) :
									echo "<div class='slide' style='left:0px'>";
										if(has_post_thumbnail()):
											the_post_thumbnail();
										else:endif;
									echo "</div>";
								else:endif;
							endwhile; 
						else:endif; 					
					}
				?>		
			</div>
			<div id='slideshowCoverLeft' style='width:0px; height:0px'>
				<div id='leftArrow' style='top:0'></div>
			</div>
			<div id='slideshowCoverCenter' style='width:0px; height:0px'></div>
			<div id='slideshowCoverRight' style='left:0; width:0px; height:0px'>
				<div id='rightArrow' style='top:0px'></div>
			</div>
		</div>
		<div id='slideElements'>
			<?php
				//Generate the slide meter
				echo "<div id='slideMeter'>";
				if (have_posts()) : 
					while (have_posts()) : the_post();
						if (in_category('Front Page Slide')) : 
							echo "<div class='slideMeterDot slideMeterOff'></div>";
						else: endif; 
					endwhile; 
				else: endif; 
				echo "</div>";
			?>
			<div class='divisor'></div>
			<?php
				//Generate the slide captions
				echo "<div id='slideCaptionContainer'>";
				if (have_posts()) : 
					while (have_posts()) : the_post();
						if (in_category('Front Page Slide')) : 
							//The caption taken from the current slide's image file. 
							echo "<div class='slideCaption slideCaptionOff'>";
							echo get_post(get_post_thumbnail_id())->post_excerpt;
							echo "</div>";
						else: endif; 
					endwhile; 
				else: endif;
				echo "</div>";
			?>
		</div>
		<!--?php get_footer(); ?-->
		<?php wp_footer(); ?> 
	</div>
</body>
</html>
