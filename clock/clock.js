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
          "style",
          `background-image: url(https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=300x200&key=AIzaSyBkK9EaTURhnywpa1o9bj1MPzIIGbZ9d_s)`
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

// global variables:
let currentTime;
let requestedTime;
let hourInterval;
let minuteInterval;
let userCOROriginalVal;
let userCORChange;
let fetchedCOR;
let weatherData;
let forcast;
let latitude = -1;
let longitude = -1;
let statusVal = false;
let i = 0;

// create a function that calls the weather API and returns the response:
const getWeather = async () => {
    // check if the latitude and longitude are not empty:
    if (latitude !== -1 && longitude !== -1) {
        // if they are empty, call the getLocation function:
        // await getLocation();

        
        console.log("fetching weather data...");
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8d5a25e33b672d7e9210bbf697c33ba9`);
        let myJson = await response.json(); //extract JSON from the http response
        // myJson = "fetched weather data";
        weatherData = myJson;
        fetchedCOR = weatherData.list[0].pop;
    
        console.log("fetched weather data: " + fetchedCOR);
        // make a query selector for percipitation__number
        // assign the fetchedCOR to the query selector innerHTML:
        document.querySelector("#percipitation__number").innerHTML = (fetchedCOR * 100).toFixed(0) + "%";
        
        console.log("fetched weather data");
    
        // set the userCOROriginalVal to the fetched COR value only the first time ran:
        if (userCOROriginalVal === undefined && i === 0) {
            userCOROriginalVal = fetchedCOR;
        }
        i++;

        // check if the precipitation chance is greater than the userCOR
        if (userCOROriginalVal + (userCORChange*.01) < fetchedCOR) {
            console.log("Chance of rain changed to more than user requested");
            console.log("userCOROriginalVal: " + userCOROriginalVal);
            console.log("fetchedCOR: " + fetchedCOR);
            console.log("userCORChange: " + userCORChange);
            console.log("userCOROriginalVal + userCORChange: " + (userCOROriginalVal + userCORChange));
    
            statusVal = true;
            
            alert("It is going to rain! the percentage passed your requested amount is: " + (fetchedCOR * 100).toFixed(0) + "%");
        } else {
            console.log("The weather only changed by " + (fetchedCOR - userCOROriginalVal) + " degrees.\n and the user requested " + userCORChange + " change degrees of rain.\n continuing to wait for the weather to change.");
        }
        myJson;
    } else {
        alert("Please enter a location");
    }
}

// form submit event listener:
document.getElementById("clock-form__inputs").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted");
    console.table(e);
    //requestedTime = JSON.stringify(e.timeStamp);
    requestedTime = e.target.time.value;
    console.log("requestedTime: " + requestedTime);
    // get the values of the form inputs:
    minuteInterval = document.getElementById("minuteInputRangeId").value;
    hourInterval = document.getElementById("hourInputRangeId").value;
    userCORChange = document.getElementById("chanceOfRainRangeId").value;
    // try catch value to check if placeArray[0].lat is undefined:
    if (placeArray.length > 0) {
        latitude = placeArray[0].lat;
        longitude = placeArray[0].lng;  
        getWeather();
        apiWeatherCallback();
        countdown();
    } else {
        alert("Please enter a location");
    }
});

// create page active timestamp
(function clock() {
    var d = new Date();
    currentTime = JSON.stringify(d);
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

    document.querySelector(".clock-hour").innerHTML = hours;
    document.querySelector(".clock-minutes").innerHTML = minutes;
    document.querySelector(".clock-seconds").innerHTML = seconds;
    
    setTimeout(clock, 1000);
})();

function countdown() {
    var d = new Date();
    currentTime = JSON.stringify(d);
    var seconds = d.getSeconds();
    var minutes = d.getMinutes();
    var hours = d.getHours();

    requestedHours = requestedTime.slice(0, 2);
    requestedMinutes = requestedTime.slice(3, 5);
    // convert requestedHours and requestedMinutes to seconds and add the sum:
    requestedSeconds = (requestedHours * 60 * 60) + (requestedMinutes * 60);
    // create a variable named currentSeconds with the currentTime converted to seconds:
    currentSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
    // create a variable named secondsUntilRequestedTime with the difference between the currentSeconds and the requestedSeconds:
    secondsUntilRequestedTime = requestedSeconds - currentSeconds;

    // convert secondsUntilRequestedTime to hours, minutes, and seconds:
    hoursUntilRequestedTime = Math.floor(secondsUntilRequestedTime / (60 * 60));
    
    minutesUntilRequestedTime = Math.floor((secondsUntilRequestedTime - (hoursUntilRequestedTime * 60 * 60)) / 60);
    
    secondsUntilRequestedTime = Math.floor(secondsUntilRequestedTime - (hoursUntilRequestedTime * 60 * 60) - (minutesUntilRequestedTime * 60));
    
    // check if the secondsUntilRequestedTime is less than 1:
    if (secondsUntilRequestedTime > 1) {
        document.querySelector(".hour").innerHTML = hoursUntilRequestedTime;
        document.querySelector(".minutes").innerHTML = minutesUntilRequestedTime;
        document.querySelector(".seconds").innerHTML = secondsUntilRequestedTime;
        // This is where HH MM SS of current time would be assigned to the clock
        // queryselect the class "hour":
        setTimeout(countdown, 1000);
    } else {
        alert("It's time to go to head out!");
        return;
    }
}

function apiWeatherCallback() {
    if (currentTime < requestedTime) {
        let milliseconds =  (hourInterval * 60 * 60 * 1000) + (minuteInterval * 60 * 1000);
        console.log(hourInterval+" hours, and "+minuteInterval+" minutes until next fetch");
        setTimeout(function () {
            getWeather(); // calls the weather API and returns the response
            if (statusVal === true) {
                console.log("the weather has passed the requested amount in Chance of Rain, exiting the timeout function");
                return;
            }
            apiWeatherCallback();
            console.log("api call running again in " + milliseconds + " milliseconds");
        }, milliseconds);
    } else {
        console.log("Break out of loop and exit");
        return;
    }
}
