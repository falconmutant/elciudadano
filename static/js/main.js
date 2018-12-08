/*====================================================
  TABLE OF CONTENT
  1. Function Declearetion
  2. Initialization
====================================================*/
/*===========================
 1. Function Declearetion
 ==========================*/
var themeApp = {

    particles: function() {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    },


    video_responsive: function() {

        $('.video-post-format, .blog-details').fitVids();
    },

    preload: function() {

         var win = $(window);

          win.load(function() {

            $('.preloader').fadeOut(1000);
        });
    },
 
 
    backtotop: function() {
        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            topDistance: '300', // Distance from top before showing element (px)
            topSpeed: 300, // Speed back to top (ms)
            animation: 'fade', // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: '<i class="fa fa-angle-up"></i>', // Text for element
            activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        });
    },


	
    video_post_format: function() {
$(".video-post-format,.audio-post-format").each(function(){
     var wrapper = $(this);
     var embed_url = wrapper.find("iframe").attr("src");
     var iframe_content = ('<iframe width="560" height="315" src="' + embed_url + '" frameborder="0" allowfullscreen></iframe>');	 
     var embed_media_div =  wrapper.find(".embed-media")
     embed_media_div.each(function(){
              embed_media_div.html(iframe_content);
          });
      });
    },
	
   image_post_format: function() {
$(".image-post-format").each(function(){
    var wrapper = $(this);
    var embed_url = wrapper.find("img").attr("src");
     var iframe_content = ('<img src="' + embed_url + '" />');	 
     var embed_media_div =  wrapper.find(".embed-media")
     embed_media_div.each(function(){
              embed_media_div.html(iframe_content);
             
              });
          });
    },
		
    remove_iframe_form_excerpt: function() {

    $(".blog-excerpt iframe, .blog-excerpt img, .blog-excerpt br").remove(); 
    $(".blog-excerpt iframe, .blog-excerpt img, .blog-excerpt br").remove();
   
     var str = $( ".blog-excerpt" ).text();
    
     $(".blog-excerpt").text(function(index, currentText) {
        
            return currentText.substr(0, 360);
       });
	},
	
     sticky: function() {
      var windows = $(window);
      windows.on('scroll',function(){
      var scroll = windows.scrollTop();
      if(scroll < 110){   

         $("#stickey-menu").removeClass("stickey");
        
    }else{

        $("#stickey-menu").addClass("stickey");
    }
    
    
       });
	},
	
	
    init: function() {
		themeApp.preload();
		themeApp.sticky();
        themeApp.particles();
        themeApp.backtotop();
        themeApp.video_post_format();
		themeApp.video_responsive();
		themeApp.image_post_format();
		themeApp.remove_iframe_form_excerpt();

    }

}

 
/*===========================
2. Initialization
==========================*/
$(document).ready(function() {
    themeApp.init();

$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
   });
});




