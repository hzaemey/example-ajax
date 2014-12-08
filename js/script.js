
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

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=640x400&location=' + address + '';

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // New York Times articles display.
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=f687c95763fd24965fe961798327fc9e:1:70265392';

    $.getJSON(nytimesUrl, function(data) {
        $nytHeaderElem.text('New York Times aricles about ' + cityStr);

        articles = data.response.docs;

        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="'+article.web_url+'">'+article.headline.main+'</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };
    }).error(function(e) {
        $nytHeaderElem.text('New York Times could not be loaded.')
    });

    // Wiki related links
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + cityStr + '&callback=wikiCallback';

    // timeout
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text('Cannot Load Wiki Source For '+cityStr);
    }, 8000);

    $.ajax( {
        // $nytHeaderElem.text('New York Times aricles about ' + cityStr);
        url: wikiUrl,
        dataType: "jsonp",
        //The next line is commonted becuase it redandant, radandant because by defualt jsonp has a value of callback, check the wikiUrl link to seek the word callback.
        //jsonp: "callback",
        
        success: function(response){
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                var articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + cityStr;
                $wikiElem.append('<li class="wikipedia-links">' + '<a href="'+url+'">'+articleStr+'</a>' + '</li>');
            };
            
            // This will stop the wikiRequestTimeout from happening. because it clears the timeout of 8000 when sucessful.
            clearTimeout(wikiRequestTimeout);
        }    

    });

    $.ajax({
        url: 'https://loudelement-free-natural-language-processing-service.p.mashape.com/nlp-url/', // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        datatype: 'json',
        success: function(data) { console.dir((data.source)); },
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "aKGeoEra0vmshsvGsVmNTB88D8I6p1JSgVVjsnF7LoRoNmxTiP"); // Enter here your Mashape key
    }
});    

    return false;
};

$('#form-container').submit(loadData);

// loadData();
