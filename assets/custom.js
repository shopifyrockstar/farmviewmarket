/*-----------------------------------------------------------------------------/
/ Custom Theme JS
/-----------------------------------------------------------------------------*/

// Insert any custom theme js here...
$(document).ready(function(){
  
  //ANIMATION
  AOS.init();
  
  function equalizeSite() {
        // Found an issue with this script when a browser is zooming in/out so we disable it on zoom.
		//var zoom = detectZoom.zoom();
		//if(zoom != 1) return;

		// Break Points: These are what you have setup in the _settings.scss
		// The actual points where it converts from mobile to tablet and tablet to desktop.
		// Sometimes there is not a tablet design in this case simply set it to the same as the desktop.
		var $bptablet = 640,
			$bpdesktop = 968;

		// Designed Sizes: These sizes are referencing what you are using to design the site e.g. PSD, AI etc.
		// This is what you have your media queries set to. Remember you only need 1 set of styles for each device this
		// script will handle the rest.
		var $mobile = 375,
			$tablet = 768,
			$desktop = 1440;

		// Initial Font Size: This is based on what the common copy font size is for each design.
		var $fsmobile = 16,
			$fstablet = 16,
			$fsdesktop = 16;

        var $ww = window.innerWidth;

        if($ww < $bptablet) {
            // mobile
            var fontsize = $fsmobile * ($ww/$mobile);
            $('html').css('font-size',fontsize);
        } else if($ww < $bpdesktop) {
            // tablet
            var fontsize = $fstablet * ($ww/$tablet);
            $('html').css('font-size',fontsize);
        } else {
            // desktop
			var fontsize = $fsdesktop * ($ww/$desktop);
            $('html').css('font-size',fontsize);
        }


    }
  
  $('#SiteNav').find('li').each(function(){
       // cache jquery var
       var current = $(this).find('button.site-nav__link').attr('aria-controls');
           
       if(current == 'SiteNavLabel-butcher-shop' && $('body').hasClass( "template-page-butcher" )) {
              
           $(this).find('button.site-nav__link').css('font-weight','700');
            
       }
    	if(current == 'SiteNavLabel-cheese' && $('body').hasClass( "template-page-cheese" )) {
              
           $(this).find('button.site-nav__link').css('font-weight','700');
            
       }
    	if(current == 'SiteNavLabel-pantry' && $('body').hasClass( "template-page-pantry" )) {
              
           $(this).find('button.site-nav__link').css('font-weight','700');
            
       }
    	if(current == 'SiteNavLabel-home-gifts' && $('body').hasClass( "template-page-homegift" )) {
              
           $(this).find('button.site-nav__link').css('font-weight','700');
            
       }
    	if(current == 'SiteNavLabel-cafe-market' && $('body').hasClass( "template-page-cafe-market" )) {
              
           $(this).find('button.site-nav__link').css('font-weight','700');
            
       }
    
    	if(current == 'SiteNavLabel-our-story' && $('body').hasClass( "template-page-our-story" )) {
              
           $(this).find('button.site-nav__link').css('font-weight','700');
            
       }
    
            
  });
  
  if($('body').hasClass( "template-page-butcher" )){
  
  	
  }
    
  $('input[type="checkbox"]#isGift').click(function(){
        if($(this).is(":checked")){
            $('#CartSpecialInstructions').attr('name', 'note');
        }
        else if($(this).is(":not(:checked)")){
               $('#CartSpecialInstructions').attr('name', '');
        }
   });
   
   $('input[type="checkbox"]#termsBtn').click(function(){
        if($(this).is(":checked")){
            $('#loginBtn').prop('disabled', false);
        }
        else if($(this).is(":not(:checked)")){
               $('#loginBtn').prop('disabled', true);
        }
   });


    const rmCheck = $("#rememberMe"),
        emailInput = $("#CustomerEmail");
    

    if (localStorage.checkbox && localStorage.checkbox !== "") {
      rmCheck.attr("checked", "checked");
      emailInput.value = localStorage.username;
    } else {
      rmCheck.removeAttr("checked");
      emailInput.value = "";
    }

    
    
    
    $('#loginBtn').click(function(){
    
        
        if (rmCheck.checked && emailInput.value !== "") {
        localStorage.username = emailInput.value;
        localStorage.checkbox = rmCheck.value;
      } else {
        localStorage.username = "";
        localStorage.checkbox = "";
      }
    
    });
  
  $('.apply-coupon').click(function(e){
    	e.preventDefault();
    var current = $(this);
    	let url = $(this).data('coupon');
    	//let url = 'https://www.farmviewmarket.com/discount/shop10';
    	if(url){
      		
            $.ajax({
                url: url,
                type: 'GET',
                cache: false,
                success:function(data) {
                    console.log('worked');
                  	console.log($(this));
                  	current.eq(0).html('Applied <span class="success"><i class="fas fa-check"></i></span>');
                  	 current.eq(0).children('.success').delay(1000).fadeOut(400);
                },
                error: function () {
                    console.log('error');
                }
            });
		}
  });
  
  $('.coupon-add-cart').click(function(e){
    	e.preventDefault();
    var current = $(this);
    	let variant = $(this).data('variant-id');
    	 data = {
          "id": variant,
          "quantity": 1,
        }
        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: data,
          dataType: 'json',
          success: function() { 
            console.log('added');
            current.eq(0).html('Added <span class="success"><i class="fas fa-check"></i></span>');
            current.eq(0).children('.success').delay(1000).fadeOut(400);
          },
          error: function(obj, status) { 
            console.log(obj);
            console.log(status);
          },
        });
  });
  
  $('.copy-clipboard').click(function(e){
    	e.preventDefault();
    	var copyText = $(this).siblings(".code").text();
    	console.log($(this).siblings(".code"));
        var textArea = document.createElement("textarea");
        textArea.value = copyText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    	$(this).children(".copy-tooltip").css('display','inline');
        $(this).children(".copy-tooltip").delay(1000).fadeOut(400);
  });
  
  
  $('#product-tabs li a:not(:first)').addClass('inactive');
  $('.tab-container').hide();
  $('.tab-container:first').show();

  $('#product-tabs li a').click(function(){
      var t = $(this).attr('id');
    if($(this).hasClass('inactive')){ //this is the start of our condition 
      $('#product-tabs li a').addClass('inactive');           
      $(this).removeClass('inactive');

      $('.tab-container').hide();
      $('#'+ t + 'C').fadeIn('slow');
   }
  });
  
  $('.homepage-slider .collection-container').slick({
    dots: true,
    arrows:false
  });
  //WOrk around for now - resp not working on slick 
  
  var size = $(document).width();
  var show = 2;
  if(size > 600){
    show = 4;
  }
  $('#cafemenu_tabs_mobile_breakfast').slick({
        infinite: false,
    	dots: true,
    	arrows:false,
     	slidesToShow: show,
 	 	slidesToScroll: show,
   		 swipeToSlide : true,
    	cssEase: 'linear',
    	mobileFirst:true,//add this one
    variableWidth: true,
        responsive: [
         {
          breakpoint: 968,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
           
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
  });
  
  $('#cafemenu_tabs_mobile_lunch').slick({
        infinite: false,
    	dots: true,
    	arrows:false,
     	slidesToShow: show,
 	 	slidesToScroll: show,
   		 swipeToSlide : true,
    	mobileFirst:true,//add this one
    variableWidth: true,
        responsive: [
        {
          breakpoint: 968,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1
          }
        }
      ]
  });
  
  $('#cafemenu_tabs_mobile_dinner').slick({
        infinite: false,
    	dots: true,
    	arrows:false,
     	slidesToShow: show,
 	 	slidesToScroll: show,
   		 swipeToSlide : true,
    	mobileFirst:true,//add this one
    variableWidth: true,
        responsive: [
        {
          breakpoint: 968,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1
          }
        }
      ]
  });
 $('.cafemenu_time .lunch').click(function(){
  	
   
  
   $('#cafemenu_tabs_mobile_lunch').slick('unslick').slick('reinit').slick({
        infinite: false,
    	dots: true,
    	arrows:false,
     	slidesToShow: show,
 	 	slidesToScroll: show,
   		 swipeToSlide : true,
    	mobileFirst:true,//add this one
        responsive: [
        {
          breakpoint: 968,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1
          }
        }
      ]
  });
   $('#cafemenu_tabs_mobile_lunch').slick('refresh');
   $('#cafemenu_tabs_mobile_lunch').slick('setPosition');
   $('.cafemenu_products').removeClass().addClass("cafemenu_products lunch_products");
  //
 });
   $('.cafemenu_time .breakfast').click(function(){
     $('#cafemenu_tabs_mobile_breakfast').slick('destroy');
     $('#cafemenu_tabs_mobile_breakfast').slick('unslick').slick('reinit').slick({
        infinite: false,
    	dots: true,
    	arrows:false,
     	slidesToShow: show,
 	 	slidesToScroll: show,
   		 swipeToSlide : true,
    	cssEase: 'linear',
    	mobileFirst:true,//add this one
        responsive: [
         {
          breakpoint: 968,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
           
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
  });
     $('#cafemenu_tabs_mobile_breakfast').slick('refresh');
     $('#cafemenu_tabs_mobile_breakfast').slick('setPosition');
     $('.cafemenu_products').removeClass().addClass("cafemenu_products breakfast_products");
  //
 });
  $('.cafemenu_time .dinner').click(function(){
    $('#cafemenu_tabs_mobile_dinner').slick('destroy');
     $('#cafemenu_tabs_mobile_dinner').slick('unslick').slick('reinit').slick({
        infinite: false,
    	dots: true,
    	arrows:false,
     	slidesToShow: show,
 	 	slidesToScroll: show,
   		 swipeToSlide : true,
    	mobileFirst:true,//add this one
        responsive: [
        {
          breakpoint: 968,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1
          }
        }
      ]
  });
    $('#cafemenu_tabs_mobile_dinner').slick('refresh');
    $('#cafemenu_tabs_mobile_dinner').slick('setPosition');
    $('.cafemenu_products').removeClass().addClass("cafemenu_products dinner_products");
  //
 });
  
  // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
  
  
  var $containter = $('.cafemenu-containter');
    
    
    $('.breakfast').click(function(){
      $('.cafemenu_tabs-wrapper_mobile_lunch').hide();
      $('.cafemenu_tabs-wrapper_mobile_dinner').hide();
       $('.cafemenu_tabs-wrapper_mobile_breakfast').show();
      if (!($(this).hasClass('active_time'))){
      	$(this).addClass('active_time');
        $('.lunch').removeClass('active_time');
        $('.dinner').removeClass('active_time');
        $containter.removeClass('lunch_panel');
        $containter.removeClass('dinner_panel');
        $containter.addClass('breakfast_panel');
        
        if (!($(".active_category_tab").hasClass('breakfast_category_tab'))){
          console.log("active_tab");
          $('.lunch_category_tab').each(function(index){
            var $active_category_tab = $(this);
            if(index == 0){
              	console.log($active_category_tab);
            	$active_category_tab.trigger('click');
            }
          });
         
        }
        
      }
    });
    $('.lunch').click(function(){
       $('.cafemenu_tabs-wrapper_mobile_lunch').show();
      $('.cafemenu_tabs-wrapper_mobile_dinner').hide();
        $('.cafemenu_tabs-wrapper_mobile_breakfast').hide();
      if (!($(this).hasClass('active_time'))){
      	$(this).addClass('active_time');
        $('.breakfast').removeClass('active_time');
        $('.dinner').removeClass('active_time');
        $containter.removeClass('breakfast_panel');
        $containter.removeClass('dinner_panel');
        $containter.addClass('lunch_panel');
        
        if (!($(".active_category_tab").hasClass('lunch_category_tab'))){
          $('.breakfast_category_tab').each(function(index){
            var $active_category_tab = $(this);
            if(index == 0){
            	$active_category_tab.trigger('click');
              	
            }
          });
          
        }
        
      }
    });
    
    $('.dinner').click(function(){
       $('.cafemenu_tabs-wrapper_mobile_dinner').show();
        $('.cafemenu_tabs-wrapper_mobile_breakfast').hide();
      $('.cafemenu_tabs-wrapper_mobile_lunch').hide();
      if (!($(this).hasClass('active_time'))){
      	$(this).addClass('active_time');
        $('.breakfast').removeClass('active_time');
        $('.lunch').removeClass('active_time');
        $containter.removeClass('breakfast_panel');
        $containter.removeClass('lunch_panel');
        $containter.addClass('dinner_panel');
        
        if (!($(".active_category_tab").hasClass('dinner_category_tab'))){
          $('.breakfast_category_tab').each(function(index){
            var $active_category_tab = $(this);
            if(index == 0){
            	$active_category_tab.trigger('click');
              	
            }
          });
      
        }
        
        
        
      }
    });
    
    $(".cafemenu_category_tab").click(function(){
    	var $active_tab = $(this);
      	var $active_tab_handle = $active_tab.data('handle');
        if (!($active_tab.hasClass('active_category_tab'))){
          
          $(".cafemenu_tabs .cafemenu_category_tab").each(function(e){
          	$(this).removeClass('active_category_tab');
          });
          $active_tab.addClass('active_category_tab');
          
          $(".cafemenu_products .cafemenu_category_wrapper").each(function(e){
            if ($(this).hasClass($active_tab_handle)){
            	$(this).addClass('active_category_wrapper');
            }else{
            	$(this).removeClass('active_category_wrapper');
            }
          });
          
        } 
    });
  
  
  if($(".cafemenu_product.lunch_product").size() == 0){
  	$('.cafemenu_time .lunch').hide();
    $('.cafemenu_products.lunch_products').hide();
    
  }
  
  if($(".cafemenu_product.dinner_product").size() == 0){
  	$('.cafemenu_time .dinner').hide();
    $('.cafemenu_products.dinner_products').hide();
  }
  
  if($(".cafemenu_product.breakfast_product").size() == 0){
  	$('.cafemenu_time .breakfast').hide();
    $('.cafemenu_products.breakfast_products').hide();
  }
   
  $('.deals-tab').click(function(){
    $('.deals-wrapper').toggleClass('expanded');
  });
  $('.close-deals').click(function(){
    $('.deals-wrapper').removeClass('expanded');
  });
  

  function equalizeHeight() {
       var highestBox = 0;
      $('.grid--view-items').each(function(){  

        // Cache the highest
        //var highestBox = 0;

        // Select and loop the elements you want to equalise
        $('.grid__item.collection-item', this).each(function(){

          // If this box is higher than the cached highest then store it
          if($(this).find('.grid-view-item.product-card').height() > highestBox) {
            highestBox = $(this).find('.grid-view-item.product-card').height(); 
          }

        });  

        // Set the height of all those children to whichever was highest 
       


      }); 
       $('.grid__item.collection-item').height(highestBox);
  }
  
  function equalizeHeightProducts() {
       var highestBox = 0;
      $('.grid--view-items').each(function(){  
        // Cache the highest
        //var highestBox = 0;
        // Select and loop the elements you want to equalise
        $('.grid__item.collection-item .product-card__title-wrapper', this).each(function(){
          // If this box is higher than the cached highest then store it
          if($(this).find('.product-card__title').height() > highestBox) {
            highestBox = $(this).find('.product-card__title').height(); 
          }
        });  
        // Set the height of all those children to whichever was highest 
      }); 
       $('.grid__item.collection-item .product-card__title-wrapper').height(highestBox);
    
     var bloghighestBox = 0;
    $('.blog-grid-item').each(function(){  
          if($(this).find('.blog-grid-inner-wrapper').height() > bloghighestBox) {
            bloghighestBox = $(this).find('.blog-grid-inner-wrapper').height(); 
          }
          
        // Set the height of all those children to whichever was highest 
      }); 
       $('.blog-grid-item .blog-grid-wrapper').height(bloghighestBox);
    
    
  }
 
  
    $(window).resize(function () {
        equalizeSite();
        equalizeHeight();
      	equalizeHeightProducts();
    	 $('#cafemenu_tabs_mobile_breakfast').slick('refresh');
      	 $('#cafemenu_tabs_mobile_lunch').slick('refresh');
      	$('#cafemenu_tabs_mobile_dinner').slick('refresh');
      });

    equalizeSite();
 	equalizeHeight();
  	equalizeHeightProducts();

    $(document).ready(function() {
    $('ul.tabs').each(function(){
      var active, content, links = $(this).find('a');
      active = links.first().addClass('active');
      content = $(active.attr('href'));
      links.not(':first').each(function () {
        $($(this).attr('href')).hide();
      });
      $(this).find('a').click(function(e){
       $("html").animate({ scrollTop: 0 }, "slow");
        active.removeClass('active');
        content.hide();
        active = $(this);
        content = $($(this).attr('href'));
        active.addClass('active');
        content.show();
        return false;
      });
    });
    
    $(".btn-prev").click(function(e) {
      var ind = $("ul.tabs a.active").parent().index();
      
      if( ind <= 0 ) {
        return;
      }
     
        $("ul.tabs li").eq(ind - 1).find("a").trigger("click");
     
    });
    
    $(".btn-next").click(function(e) {
      var ind = $("ul.tabs a.active").parent().index();
      
      if( ind >= $("ul.tabs li").length - 1 ) {
        return;
      }
      
      $("ul.tabs li").eq(ind + 1).find("a").trigger("click");
    });
      
      $('#cafemenu_tabs_mobile_breakfast').slick('refresh');
      	 $('#cafemenu_tabs_mobile_lunch').slick('refresh');
  });
	
});

$(document).on('.video-bg', 'click', function() {
       $(".video-bg").hide();
     var video = $(".video-bg").next("iframe");
    video.attr("src", video.attr("src"));
 });
	

$(".recipe-filter-wrapper .main-filter-title").click(function(){
  $(".recipe-filter-wrapper .filter-content-wrapper").toggle("medium");
})

$('.btn-apply').click(function(){
  var url_component = "";
  var generated_url = "";
  var banner_top_position = $(".recipe-main-header").offset();
  var banner_height = $(".recipe-main-header").height();
  $(".recipe-filter-wrapper .filter-content-wrapper").toggle("medium");
  $("html, body").animate({ scrollTop: (banner_top_position.top + banner_height - 50) });
  
  $("#pagination").addClass("hide");
  
  $(".filter-content-wrapper .custom").each(function(index){
    if( $(this).is(":checked") ){
      url_component = $(this).data("filter");
      generated_url += url_component + "+";
    }
  })

  generated_url = generated_url.slice(0,-1);
  if( typeof generated_url !== "undefined" && generated_url){    
    var final_url = window.location.href + "/tagged/" + generated_url;
    console.log(final_url);
    $.ajax({
      url: final_url,
      type: 'GET',
      beforeSend: function() {
        $(".loading-wrapper").removeClass("hide");
        $(".page-width.blog-content .blog-grid .blog-content-wrapper").html("");
      },
      success: function(response) {
        setTimeout(function(){          
          $(".page-width.blog-content .blog-grid").replaceWith($(response).find(".page-width.blog-content .blog-grid"));
          $(".loading-wrapper").addClass("hide");
        }, 500);
      },
      error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText
        console.log('Error - ' + errorMessage);
        $(".page-width.blog-content .blog-grid .blog-content-wrapper").html('<p class="error-message">There is no search result</p>');
        $("#pagination").addClass("hide");
        $(".loading-wrapper").addClass("hide");
      }
    });
  }else{
    var final_url = window.location.href ;
    $.ajax({
      url: final_url,
      type: 'GET',
      beforeSend: function() {
        $(".loading-wrapper").removeClass("hide");
        $(".page-width.blog-content .blog-grid .blog-content-wrapper").html("");
      },
      success: function(response) {
        setTimeout(function(){          
          $(".page-width.blog-content .blog-grid").replaceWith($(response).find(".page-width.blog-content .blog-grid"));
          $(".loading-wrapper").addClass("hide");
          $("#pagination").removeClass("hide");
        }, 500);
      },
      error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText
        console.log('Error - ' + errorMessage);
        $(".page-width.blog-content .blog-grid .blog-content-wrapper").html('<p class="error-message">There is no search result</p>');
        $("#pagination").addClass("hide");
        $(".loading-wrapper").addClass("hide");
      }
    });
  }
  
})
