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
      document.getElementById("details").innerText = latitude + " " + longitude;
    })
    .catch(function (error) {
      console.log(error);
    });
}
document.getElementById("address-form").addEventListener("submit", (event) => {
  event.preventDefault();
  let givenAddress = event.target.addressInput.value;

  geocode(givenAddress);
});
