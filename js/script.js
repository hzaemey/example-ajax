
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    
    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So you want to live in ' + address + ' ?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=1400x400&location=' + address + '';

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
