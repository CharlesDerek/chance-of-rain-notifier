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
let latitude;
let longitude;
let statusVal = false;
let i = 0;

// create a function that calls the weather API and returns the response:
const getWeather = async () => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=38.8951&lon=-77.0364&appid=8d5a25e33b672d7e9210bbf697c33ba9");
    let myJson = await response.json(); //extract JSON from the http response
    console.log("fetching weather data...");
    // myJson = "fetched weather data";
    console.log(JSON.stringify(myJson, null, 2));
    console.table(myJson);
    weatherData = myJson;
    fetchedCOR = weatherData.list[0].pop;

    // set the userCOROriginalVal to the fetched COR value only the first time ran:
    if (userCOROriginalVal === undefined && i === 0) {
        userCOROriginalVal = fetchedCOR;
    }
    i++;

    // check if the precipitation chance is greater than the userCOR
    if (userCOROriginalVal + userCORChange > fetchedCOR) {
        document.body.style.backgroundColor = "red";
        console.log("Chance of rain changed more than user requested");
        statusVal = true;
    } else {
        console.log("The weather only changed by " + (fetchedCOR - userCOROriginalVal) + " degrees");
    }
    return myJson;
}

// form submit event listener:
document.getElementById("clock-form__inputs").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submit");
    console.table(e);
    requestedTime = JSON.stringify(e.timeStamp);
    // get the values of the form inputs:
    minuteInterval = document.getElementById("minuteInputRangeId").value;
    hourInterval = document.getElementById("hourInputRangeId").value;
    chanceOfRainChange = document.getElementById("chanceOfRainRangeId").value;
    // call the weather API once when the form is submitted:
    getWeather();
    compareTime();
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
    document.getElementById("clock").innerHTML = strTime;
    // This is where HH MM SS of current time would be assigned to the clock
    setTimeout(clock, 1000);
})();

function compareTime() {
    if (currentTime < requestedTime) {
        let milliseconds =  (hourInterval * 60 * 60 * 1000) + (minuteInterval * 60 * 1000);
        console.log("milliseconds: " + milliseconds);
        setTimeout(function () {
            getWeather(); // calls the weather API and returns the response
            if (statusVal === true) {
                console.log("the weather has passed the requested amount in Chance of Rain, exiting the timeout function");
                return;
            }
            compareTime();
            console.log("api call running again in " + milliseconds + " milliseconds");
        }, milliseconds);
    } else {
        console.log("Break out of loop and exit");
        return;
    }
}
