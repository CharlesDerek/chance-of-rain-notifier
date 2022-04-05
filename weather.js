//array where location data can be stored in object form
let placeArray = [];
// function that accepts an address and console longs the coordinates
function geocode(address) {
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: address,
        key: "AIzaSyBkK9EaTURhnywpa1o9bj1MPzIIGbZ9d_s",
      },
    })
    .then(function (response) {
      let name = response.data.results[0].formatted_address;
      let latitude = response.data.results[0].geometry.location.lat;
      let longitude = response.data.results[0].geometry.location.lng;
      placeArray.push({ name: name, lat: latitude, lng: longitude });
      console.log(name + " " + latitude + " " + longitude);
      document
        .getElementById("map")
        .setAttribute(
          "src",
          `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=300x200&key=AIzaSyBkK9EaTURhnywpa1o9bj1MPzIIGbZ9d_s`
        );
    })
    .catch(function (error) {
      console.log(error);
    });
}

let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("pac-input"),
    {
      types: ["establishment"],
      componentRestrictions: { country: ["CA", "US", "AU", "UK"] },
      fields: ["place_id", "geometry", "name"],
    }
  );
  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
  let place = autocomplete.getPlace();
  if (!place.geometry) {
    //user did not select a prediction; reset input field
    document.getElementById("pac-input").placeholder = "enter a place";
  } else {
    //display details about a valid place
    geocode(place.name);
    document.getElementById("pac-input").value = "";
  }
}
