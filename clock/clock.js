
// create a callback 
let currentTime;
let requestedTime;
let hourInterval;
let minuteInterval;
let chanceOfRainChange;

// form submit event listener:
document.getElementById("clock-form__inputs").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submit");
    console.table(e);
    requestedTime = JSON.stringify(e.timeStamp);
    // get the values of the form inputs:
    minuteInterval = document.getElementById("minuteInputRangeId").value;
    hourInterval = document.getElementById("hourInputRangeId").value;
    chanceOfRainChange = document.getElementById("chanceOfRainOutputRange").value;
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
    setTimeout(clock, 1000);
})();

function compareTime() {
    if (currentTime > requestedTime) {
        var difference = currentTime - requestedTime;
        var hours = Math.floor(difference / 3600000);
        var minutes = Math.floor((difference - (hours * 3600000)) / 60000);
        var seconds = Math.floor((difference - (hours * 3600000) - (minutes * 60000)) / 1000);
        console.log("It's later by: " + hours + ":" + minutes + ":" + seconds);
    } else if (currentTime < requestedTime) {
        // refer to the following date:
        console.log();
        var difference = requestedTime - currentTime;
        console.log("It's earlier!");
    } else {
        console.log("It's the same time!");
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