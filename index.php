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
	<?php get_header(); ?>
	<div id='wrapper'>
		<div id='slideshow' style='min-height:0px'>
			<div id='slideshowCoverLeft' style='width:0px; height:0px'>
				<div id='leftArrow' style='top:0'></div>
			</div>
			<div id='slideshowCoverRight' style='left:0; width:0px; height:0px'>
				<div id='rightArrow' style='top:0px'></div>
			</div>
			<div id='slideshowContainer'>
				<?php 
					//Generate the Featured slide first
					if (have_posts()) : 
						while (have_posts()) : the_post();
							if (in_category('Featured')) :
								echo "<div class='slide' style='left:0px'>";
									if(has_post_thumbnail()):
										the_post_thumbnail();
									else:endif;
								echo "</div>";
							else:endif;
						endwhile; 
					else:endif; 
					//Generate the rest of the slides
					if (have_posts()) : 
						while (have_posts()) : the_post();
							if (in_category('Front Page Slide') and !in_category('Featured')) :
								echo "<div class='slide' style='left:0px'>";
									if(has_post_thumbnail()):
										the_post_thumbnail();
									else:endif;
								echo "</div>";
							else:endif;
						endwhile; 
					else:endif; 
				?>				
			</div>
		</div>
		<div id='slideElements'>
			<?php
				//Generate the slide meter
				echo "<div id='slideMeter'>";
				if (have_posts()) : 
					while (have_posts()) : the_post();
						if (in_category('Featured')) : 
							echo "<div class='slideMeterDot slideMeterOn'></div>";
						else: endif; 
					endwhile; 
				else: endif;
				if (have_posts()) : 
					while (have_posts()) : the_post();
						if (in_category('Front Page Slide') and !in_category('Featured')) : 
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
						if (in_category('Featured')) : 
							//The caption taken from the current slide's image file. 
							echo "<div class='slideCaption slideCaptionOn'>";
							echo get_post(get_post_thumbnail_id())->post_excerpt;
							echo "</div>";
						else: endif; 
					endwhile; 
				else: endif;
				if (have_posts()) : 
					while (have_posts()) : the_post();
						if (in_category('Front Page Slide') and !in_category('Featured')) : 
							echo "<div class='slideCaption slideCaptionOff'>";
							echo get_post(get_post_thumbnail_id())->post_excerpt; 
							echo "</div>";
						else: endif; 
					endwhile; 
				else: endif; 
				echo "</div>";
			?>
		</div>
		<!--div id='left'></div-->
		<div id='onStage'>
			<div id='onStageContent'>
				<div id='onStageTitle'>
					<span>What's  </span><span>New?</span>
				</div>
				<div class='line'></div>
				<!-- The buttons for featured posts on the front page -->
				<div id='spotlights'>
						<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
							<?php if (in_category('Front Page Button Post')) : ?>
							<div class='spotlight'>
								<?php the_title(); ?>
							</div>
							<?php else : ?>
							<?php endif; ?>
						<?php endwhile; else: ?>
						<?php endif; ?>		
				</div>
			</div>
		</div>
		<div id='mainContent'>
			<div class='content'>
				<!--The featured posts on the front page -->
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					<?php if (in_category('Front Page Button Post')) : ?>
						<div class='spotlightPost'>
							<!--h4>Posted on <?php the_time('F jS, Y') ?></h4-->
							<p><?php the_content(__('(more...)')); ?></p>
						</div>
					<?php else : ?>
					<?php endif; ?>
				<?php endwhile; else: ?>
				<?php endif; ?>
			</div>
			
				<!--The non-featured posts on the front page -->
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					<?php if (in_category('Front Page Post')) : ?>
					<div class='content'>
						<div class='frontPagePost'>
							<?php the_title(); ?>
							<!--h4>Posted on <?php the_time('F jS, Y') ?></h4-->
							<p><?php the_content(__('(more...)')); ?></p>
						</div>
					</div>
					<?php else : ?>
					<?php endif; ?>
				<?php endwhile; else: ?>
				<?php endif; ?>
			
			<!--Delete the comments below to activate the sidebar-->
			<!--?php get_sidebar(); ?-->
			<!--div id='right'></div-->
		</div>
			<!-- Javascript -->
		<div id='divisor'></div>
		<?php get_footer(); ?>
		<?php wp_footer(); ?> 
	</div>
</body>
</html>
