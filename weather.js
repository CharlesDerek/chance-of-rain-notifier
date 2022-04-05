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
      let latitude = response.data.results[0].geometry.location.lat;
      let longitude = response.data.results[0].geometry.location.lng;
      console.log(latitude + " " + longitude);
    })
    .catch(function (error) {
      console.log(error);
    });
}
document.getElementById("address-form").addEventListener("submit", (event) => {
  event.preventDefault();
  let givenAddress = event.target.addressInput.value;
  geocode(givenAddress);
  event.target.addressInput.value = "";
});

//Autocomplete function for the input field, checks only for real geographical locations
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
  }
}

//map code starts here

//Initialize and add the map
// function initMap() {
//   // The location of Uluru
//   const uluru = { lat: -35.344, lng: -70.036 };
//   // The map, centered at Uluru
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 8,
//     center: uluru,
//   });
//   // The marker, positioned at Uluru
//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
// }
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 8,
  center: uluru,
});
