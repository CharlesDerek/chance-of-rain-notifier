let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
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
    document.getElementById("autocomplete").placeholder = "enter a place";
  } else {
    //display details about a valid place
  }
}
