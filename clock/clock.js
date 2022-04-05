
// create a callback 
let currentTime;
let requestedTime;
let hourInterval;
let minuteInterval;
let chanceOfRainChange;
let weatherData;

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

// callback function for calling api on proper interval:
// function intervalCall(hours, minutes, callback) {
//     var date = new Date();
//     var targetTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0);
  
//     if (targetTime - date <= 0) {
//       targetTime.setDate(targetTime.getDate() + 1);
//     }
// }

// making a REST API call to the weather API:
const userAction = async () => {
    const response = await fetch(https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=8d5a25e33b672d7e9210bbf697c33ba9);
    const myJson = await response.json(); //extract JSON from the http response
// do something with myJson
}

function compareTime() {
    if (currentTime < requestedTime) {
        let milliseconds;
        // create a callback that runs at the interval of the minuteInterval value in minutes
        // and hourInterval value in hours:
        // convert hourInterval into milliseconds (only if hourInterval is greater than 0):
        if (hourInterval > 0) {
            milliseconds += hourInterval * 60 * 60 * 1000;
        }
        // convert minuteInterval into milliseconds (only if minuteInterval is greater than 0):
        if (minuteInterval > 0) {
            milliseconds += minuteInterval * 60 * 1000;
        }
        setTimeout(function () {
            console.log("api call");
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=38.8951&lon=-77.0364&appid=8d5a25e33b672d7e9210bbf697c33ba9");
            const fetchedJson = await response.json();
            weatherData = fetchedJson;
            // run conditional logic to determine if breaking out of logic if conditions are met:
            

            compareTime();
        }, milliseconds);
    } else {
        console.log("Break out of loop and exit");
    }
}




// function compareTime() {
//     var d = new Date();
//     if (currentTime > requestTime) {
//         document.getElementById("countdown").innerHTML = "It's later!";
//     } else if (currentTime < requestTime) {
//         document.getElementById("countdown").innerHTML = "It's earlier by " + (requestTime - currentTime) + " seconds!";
//         let d = (requestTime - currentTime);
//         var hours = d.getHours();
//         var minutes = d.getMinutes();
//         var seconds = d.getSeconds();
//         minutes = minutes < 10 ? '0' + minutes : minutes;
//         seconds = seconds < 10 ? '0' + seconds : seconds;
//         var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
//         document.getElementById("countdown").innerHTML = strTime;

//         setTimeout(compareTime, 1000);
//     } else {
//         document.getElementById("countdown").innerHTML = "It's the same time!";
//     }
// }


//Code for making a REST API call to the weather API:
// //const userAction = async () => {
//     const response = await fetch(https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key});
//     const myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson
//   }