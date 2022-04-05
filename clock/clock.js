
// create a callback 
let currentTime;
let requestTime;

// form submit event listener:
document.getElementById("clock-form__inputs").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submit");
    console.log(e);
    requestTime = JSON.stringify(e.timeStamp);
    compareTime();
});



// create page active timestamp
(function clock() {
    // 
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


// create a function that gets the value of currentTime and comapres it to the value of the input field with id time:
// if the current time is greater than the input field value, print "It's later!" to the page.
// if the current time is less than the input field value, print "It's earlier!" to the page.
// if the current time is equal to the input field value, print "It's the same time!" to the page:
function compareTime() {
    // 
    var time = document.getElementById("time").value;
    var timeStamp = JSON.parse(time);
    var currentTimeStamp = JSON.parse(currentTime);
    if (currentTimeStamp > timeStamp) {
        document.getElementById("clock-form__output").innerHTML = "It's later!";
    } else if (currentTimeStamp < timeStamp) {
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
