//Grabbing the input value

var button = document.querySelector("button");
button.addEventListener("click", function() {
var input = document.querySelector("input").value;
getInput(input);
});


//The keyup event is fired when a key is released.
//grabbing event e, which is the keycode of the key pressed
var x = document.querySelector(".js-userinput");
x.addEventListener("keyup", function(e) {
var input = document.querySelector("input").value;

// 13 is key code for Enter
if(e.which === 13) {
getInput(input);
}
});

// Interacting with the Giphy API

function getInput(item) {
  var query = item.split(' ').join('+')
  var url = "https://api.giphy.com/v1/gifs/search?q="+ query + "&api_key=SDEsWMHoj4DO7LFMxWFHlVJVkElcDm8h";

// Create an XMLHttpRequest object
//The XMLHttpRequest object can be used to exchange data with a web server behind the scenes. 
//This means that it is possible to update parts of a web page, without reloading the whole page.
  
var GiphyAJAXCall = new XMLHttpRequest();
  
//Send a request to the server using open() and send() methods
GiphyAJAXCall.open( 'GET', url );
GiphyAJAXCall.send();

GiphyAJAXCall.addEventListener('load', function(e) {
var data = e.target.response
pushToDom(data)
});
}

// Showing the gifs

//A common use of JSON is to exchange data to/from a web server.
//When receiving data from a web server, the data is always a string.
//Parse the data with JSON.parse(), and the data becomes a JavaScript object.

function pushToDom(input) {
  var response = JSON.parse(input);
  var f = document.querySelector(".js-container");
  var result = document.querySelector(".results");

  clear(f);
  clear(result);
      var imageUrls = response.data

      imageUrls.forEach(function(gif) {
        var src = gif.images.fixed_height.url;

        result.innerHTML = src.length + " gifs found";
        f.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";
      })
      
      function clear(item) {
        item.innerHTML = "";
    }
}
