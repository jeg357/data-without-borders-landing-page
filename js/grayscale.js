(function($) {
  "use strict"; // Start of use strict

  var cats = ['recycle', 'trafficking', 'test'];

  //Constructing the suggestion engine
  var categories = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: $.map(cats, function (cat) {
        console.log("cat", cat)
        return {
            name: cat
        };
      })
  });

  categories.initialize();

  $('.typeahead').on('beforeItemAdd', function(event) {
    if($.inArray(event.item, cats) === -1) {
      event.item="";
      event.cancel = true;
    } 
  });

  $('.typeahead').tagsinput({
    typeaheadjs: [{
          hint:true,
          highlight: true,
          minLength: 1
        },
      {
       minLength: 1,
       name: 'categories',
       displayKey: 'name',
       valueKey: 'name',
       source: categories.ttAdapter()
  }],
      freeInput: true
  });
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

})(jQuery); // End of use strict


$('#registerBtn').click(function(){
  dataToBePosted = {
    name:$('#name').val(),
    email:$('#email').val(),
    password:$('#password').val(),
    username:$('#name').val(),
    active: true,
    approved: true
  }

user_fields = $('#user_field').text();
if(user_fields === "Data Scientist"){
  group = 42;
} else {
  group = 41;
}

$.each( [ "put", "delete" ], function( i, method ) {
  $[ method ] = function( url, data, callback, type ) {
    if ( $.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return $.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});



$.post("http://discussion.datawithoutborders.org:4000"+"/users?api_key=b5a802f239160697786c69a642e70ddaa7eafb78446f8f6cbcc78b11a2ba8e34&api_username=eyvind"
 , dataToBePosted, function(data, status){
    if(status == "success"){
      $.post("http://discussion.datawithoutborders.org:4000/admin/users/" + data.user_id +"/groups?api_key=b5a802f239160697786c69a642e70ddaa7eafb78446f8f6cbcc78b11a2ba8e34&api_username=eyvind"
 , {"group_id": group}, function(data, status){
    }).done(function(){
      $(location).attr('href', 'http://discussion.datawithoutborders.org:4000');
    });
    }
 });

});

$(".dropdown-item").click(function(){
  $(this).parents(".dropdown").find('.btn').html($(this).text());
  $(this).parents(".dropdown").find('.btn').val($(this).data("value"));
});

// Google Maps Scripts
var map = null;
// When the window has finished loading create our google map below
// google.maps.event.addDomListener(window, 'load', init);
// google.maps.event.addDomListener(window, 'resize', function() {
//   map.setCenter(new google.maps.LatLng(40.6700, -73.9400));
// });

function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  // var mapOptions = {
  //   // How zoomed in you want the map to start at (always required)
  //   zoom: 15,

  //   // The latitude and longitude to center the map (always required)
  //   center: new google.maps.LatLng(40.6700, -73.9400), // New York

  //   // Disables the default Google Maps UI components
  //   disableDefaultUI: true,
  //   scrollwheel: false,
  //   draggable: false,

  //   // How you would like to style the map.
  //   // This is where you would paste any style found on Snazzy Maps.
  //   styles: [{
  //     "featureType": "water",
  //     "elementType": "geometry",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 17
  //     }]
  //   }, {
  //     "featureType": "landscape",
  //     "elementType": "geometry",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 20
  //     }]
  //   }, {
  //     "featureType": "road.highway",
  //     "elementType": "geometry.fill",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 17
  //     }]
  //   }, {
  //     "featureType": "road.highway",
  //     "elementType": "geometry.stroke",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 29
  //     }, {
  //       "weight": 0.2
  //     }]
  //   }, {
  //     "featureType": "road.arterial",
  //     "elementType": "geometry",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 18
  //     }]
  //   }, {
  //     "featureType": "road.local",
  //     "elementType": "geometry",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 16
  //     }]
  //   }, {
  //     "featureType": "poi",
  //     "elementType": "geometry",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 21
  //     }]
  //   }, {
  //     "elementType": "labels.text.stroke",
  //     "stylers": [{
  //       "visibility": "on"
  //     }, {
  //       "color": "#000000"
  //     }, {
  //       "lightness": 16
  //     }]
  //   }, {
  //     "elementType": "labels.text.fill",
  //     "stylers": [{
  //       "saturation": 36
  //     }, {
  //       "color": "#000000"
  //     }, {
  //       "lightness": 40
  //     }]
  //   }, {
  //     "elementType": "labels.icon",
  //     "stylers": [{
  //       "visibility": "off"
  //     }]
  //   }, {
  //     "featureType": "transit",
  //     "elementType": "geometry",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 19
  //     }]
  //   }, {
  //     "featureType": "administrative",
  //     "elementType": "geometry.fill",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 20
  //     }]
  //   }, {
  //     "featureType": "administrative",
  //     "elementType": "geometry.stroke",
  //     "stylers": [{
  //       "color": "#000000"
  //     }, {
  //       "lightness": 17
  //     }, {
  //       "weight": 1.2
  //     }]
  //   }]
  // };

  // console.log("here")
  // Get the HTML DOM element that will contain your map
  // // We are using a div with id="map" seen below in the <body>
  // var mapElement = document.getElementById('map');

  // Create the Google Map using out element and options defined above

  // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
  // var image = 'img/map-marker.svg';
  // var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
  // var beachMarker = new google.maps.Marker({
  //   position: myLatLng,
  //   map: map,
  //   icon: image
  // });
}
