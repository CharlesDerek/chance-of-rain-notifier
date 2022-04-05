
// create a callback 
let currentTime;
let requestedTime;

// form submit event listener:
document.getElementById("clock-form__inputs").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submit");
    console.log(e);
    requestedTime = JSON.stringify(e.timeStamp);
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
    //
    // var currentTimeStamp = JSON.parse(currentTime);
    if (currentTime > requestedTime) {
        // document.getElementById("clock-form__output").innerHTML = "It's later!";
        console.log();
        var difference = currentTime - requestedTime;
        var hours = Math.floor(difference / 3600000);
        var minutes = Math.floor((difference - (hours * 3600000)) / 60000);
        var seconds = Math.floor((difference - (hours * 3600000) - (minutes * 60000)) / 1000);
        console.log("It's later by: " + hours + ":" + minutes + ":" + seconds);

    } else if (currentTime < requestedTime) {
        // document.getElementById("clock-form__output").innerHTML = "It's earlier!";
        console.log();
        var difference = requestedTime - currentTime;
        document.getElementById("clock-form__output").innerHTML = "It's earlier!";
    } else {
        document.getElementById("clock-form__output").innerHTML = "It's the same time!";
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
