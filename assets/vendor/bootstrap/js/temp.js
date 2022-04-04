// loop through all the whole numbers from 1 to 100:
for (var i = 1; i <= 100; i++) {
    // if the number is divisible by 3, print "Fizz"
    if (i % 3 === 0) {
        console.log("Fizz");
    }
    // if the number is divisible by 5, print "Buzz"
    if (i % 5 === 0) {
        console.log("Buzz");
    }
    // if the number is divisible by 3 and 5, print "FizzBuzz"
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    }
    // otherwise, print the number
    else {
        console.log(i);
    }
}

// add the sum of all the whole numbers from 1 to 100:
var sum = 0;
for (let i = 1; i < 101; i++) {
    sum += i;
}
