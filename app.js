// Save the button into a variable and listen for a click
// run the loadAJAX function when clicked
var myButton = document.getElementById('loadButton');
myButton.onclick = loadAJAX;

// Store the API information for use later
var uri = {
  protocol:"http://",
  host:"maps.googleapis.com/",
  resourceRoot:"maps/api/geocode/json?address=",
  address:"",
  parameters:"&sensor=false"
};

function loadAJAX() {
  // Get the input from the box right away when it is clicked
  var address = document.getElementById("getInput").value;
  uri.address = address;


  // Check ActiveXObject or XMLHttpRequest based on
  // whether the XMLHttpRequest object exists
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("XMLHTTP");
  }

  // Open the connection to the API and build the right address
  // for the current GET request
  request.open("GET", uri.protocol + uri.host + uri.resourceRoot + uri.address + uri.parameters);

  // Check to make sure that the data is loaded with a 200 status code
  // and a readyState change to 4
  request.onreadystatechange = function() {
    if((request.readyState===4) && (request.status===200)) {
      // Parse the responseText from text to objects and arrays
      // so that we can use the data
      var data = JSON.parse(request.responseText);

      // Create an output varibale to store what we want displayed
      // on the page and add the strings together
      var output = "Google Formatted Address: ";
      output += "<br />";
      output += data.results[0].formatted_address;

      // Grab the div element with Id update and put the
      // output string into the code
      document.getElementById('update').innerHTML = output;
    }
  }

  // Send the request
  request.send();
}
