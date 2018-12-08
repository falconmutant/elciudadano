/* ===================================================================
 * Abstract - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

	"use strict";

	var cfg = {		
		defAnimation   : "fadeInUp",    // default css animation		
		scrollDuration : 800,           // smoothscroll duration
		statsDuration  : 4000,          // stats animation duration
		mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'
	},
		
	$WIN = $(window);


	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {
		$WIN.on('load', function() {	

	      // will first fade out the loading animation 
	    	$("#loader").fadeOut("slow", function(){

	        // will fade out the whole DIV that covers the website.
	        $("#preloader").delay(300).fadeOut("slow");

	      }); 
	  	});
	};  


	/* audio controls 
	 * -------------------------------------------------- */ 
	var ssMediaElementPlayer = function() {
		$("audio").mediaelementplayer({
			features: ['playpause','progress', 'tracks','volume']
	  	});
	};


	/* FitVids
	------------------------------------------------------ */ 
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 

		
	/* pretty print
	 * -------------------------------------------------- */ 
	var ssPrettyPrint = function() {
		$('pre').addClass('prettyprint');
		$( document ).ready(function() {		
	    	prettyPrint();		
	  	}); 
	};


	/* Alert Boxes
  	------------------------------------------------------- */
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	   


	/* superfish
	 * -------------------------------------------------- */  
	var ssSuperFish = function() {
		$('ul.sf-menu').superfish({

	   	animation: { height:'show' }, // slide-down effect without fade-in
			animationOut: { height:'hide'}, // slide-up effect without fade-in			
			cssArrows: false, // disable css arrows	
			delay: 600 // .6 second delay on mouseout
			
		});
	};

	
  	/* Mobile Menu
   ------------------------------------------------------ */ 
   var ssMobileNav = function() {

   	var toggleButton = $('.menu-toggle'),
          nav = $('.main-navigation');

	   toggleButton.on('click', function(event){
			event.preventDefault();

			toggleButton.toggleClass('is-clicked');
			nav.slideToggle();
		});

	  	if (toggleButton.is(':visible')) nav.addClass('mobile');

	  	$WIN.resize(function() {
	   	if (toggleButton.is(':visible')) nav.addClass('mobile');
	    	else nav.removeClass('mobile');
	  	});

	  	$('#main-nav-wrap li a').on("click", function() {   
	   	if (nav.hasClass('mobile')) {   		
	   		toggleButton.toggleClass('is-clicked'); 
	   		nav.fadeOut();   		
	   	}     
	  	});

   }; 
   

  /* search
   ------------------------------------------------------ */ 
   var ssSearch = function() {

   	var searchWrap = $('.search-wrap');
	   var searchField = searchWrap.find('.search-field');
	   var closeSearch = $('#close-search');
	   var searchTrigger = $('.search-trigger');
	   var body = $('body');

	   searchTrigger.on('click', function(e){

	      e.preventDefault();
	      e.stopPropagation();   
	      var $this = $(this);

	      body.addClass('search-visible');
	      setTimeout(function(){
	         $('.search-wrap').find('.search-field').focus();
	      }, 100);

	   });


	   closeSearch.on('click', function(){
	      var $this = $(this);
	      
	      if(body.hasClass('search-visible')){
	         body.removeClass('search-visible');
	         setTimeout(function(){
	            $('.search-wrap').find('.search-field').blur();
	         }, 100);
	      }
	   });

	   searchWrap.on('click',  function(e){
	   	if( !$(e.target).is('.search-field') ) {   		
	   		closeSearch.trigger('click');   		
	   	}
	   });

	   searchField.on('click', function(e){
	      e.stopPropagation();
	   });

	   searchField.attr({placeholder: 'Ingresa las palabras', autocomplete: 'off'});

   };
	 


	/*	Masonry
	------------------------------------------------------ */
	var ssMasonryFolio = function() {

	};


  /* animate bricks
	* ------------------------------------------------------ */
	var ssBricksAnimate = function() {



	};
		

  /* Flex Slider
	* ------------------------------------------------------ */
	var ssFlexSlider = function() {

	};	


  /* Smooth Scrolling
	* ------------------------------------------------------ */
	var ssSmoothScroll = function() {



	};


  /* Placeholder Plugin Settings
	* ------------------------------------------------------ */
	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	}; 


  /* AjaxChimp
	* ------------------------------------------------------ */
	

  /* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	


  /* Map
	* ------------------------------------------------------ */
	var ssGoogleMap = function() { 

		if (typeof google === 'object' && typeof google.maps === 'object') {

			var latitude = 14.549072,
				 longitude = 121.046958,
				 map_zoom = 15,		 
				 main_color = '#d8ac00',
				 saturation_value = -30,
				 brightness_value = 5,
				 marker_url = null,
				 winWidth = $(window).width();	

		   // show controls
		   $("#map-zoom-in, #map-zoom-out").show();	 	 

		   // marker url
			if ( winWidth > 480 ) {
				marker_url = 'images/icon-location@2x.png';                    
		   } else {
		      marker_url = 'images/icon-location.png';            
		   }	 

			// map style
			var style = [ 
				{
					// set saturation for the labels on the map
					elementType: "labels",
					stylers: [
						{ saturation: saturation_value }
					]
				},  
			   {	// poi stands for point of interest - don't show these lables on the map 
					featureType: "poi",
					elementType: "labels",
					stylers: [
						{visibility: "off"}
					]
				},
				{
					// don't show highways lables on the map
			      featureType: 'road.highway',
			      elementType: 'labels',
			      stylers: [
			         { visibility: "off" }
			      ]
			   }, 
				{ 	
					// don't show local road lables on the map
					featureType: "road.local", 
					elementType: "labels.icon", 
					stylers: [
						{ visibility: "off" } 
					] 
				},
				{ 
					// don't show arterial road lables on the map
					featureType: "road.arterial", 
					elementType: "labels.icon", 
					stylers: [
						{ visibility: "off" }
					] 
				},
				{
					// don't show road lables on the map
					featureType: "road",
					elementType: "geometry.stroke",
					stylers: [
						{ visibility: "off" }
					]
				}, 
				// style different elements on the map
				{ 
					featureType: "transit", 
					elementType: "geometry.fill", 
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}, 
				{
					featureType: "poi",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.government",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.sport_complex",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.attraction",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.business",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "transit",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "transit.station",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "landscape",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
					
				},
				{
					featureType: "road",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "road.highway",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}, 
				{
					featureType: "water",
					elementType: "geometry",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}
			];
				
			// map options
			var map_options = {

		      	center: new google.maps.LatLng(latitude, longitude),
		      	zoom: 15,
		      	panControl: false,
		      	zoomControl: false,
		        	mapTypeControl: false,
		      	streetViewControl: false,
		      	mapTypeId: google.maps.MapTypeId.ROADMAP,
		      	scrollwheel: false,
		      	styles: style

		    	};

		   // inizialize the map
			var map = new google.maps.Map(document.getElementById('map-container'), map_options);

			// add a custom marker to the map				
			var marker = new google.maps.Marker({

				 	position: new google.maps.LatLng(latitude, longitude),
				 	map: map,
				 	visible: true,
				 	icon: marker_url
				 
				});

			// add custom buttons for the zoom-in/zoom-out on the map


			var zoomControlDiv = document.createElement('div');
			var zoomControl = new CustomZoomControl(zoomControlDiv, map);

			// insert the zoom div on the top right of the map
			map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);

		} 

	};
	function CustomZoomControl(controlDiv, map) {

        // grap the zoom elements from the DOM and insert them in the map
        var controlUIzoomIn= document.getElementById('map-zoom-in'),
             controlUIzoomOut= document.getElementById('map-zoom-out');

        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom()+1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom()-1)
        });

    }



  /* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {

		ssPreloader();
		ssMediaElementPlayer();
		ssFitVids();
		ssPrettyPrint();
		ssAlertBoxes();
		ssSuperFish();
		ssMobileNav();
		ssSearch();
		ssMasonryFolio();
		ssBricksAnimate();
		ssFlexSlider();
		ssSmoothScroll();
		ssPlaceholder();
		ssBackToTop();
		ssGoogleMap();

	})();
 
 

})(jQuery);