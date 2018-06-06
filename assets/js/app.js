var config = {
    apiKey: "AIzaSyAOlc5yX3G-_eeIIEJOgLIKlUtXPIvweNY",
    authDomain: "train-scheduler-abfe0.firebaseapp.com",
    databaseURL: "https://train-scheduler-abfe0.firebaseio.com",
    projectId: "train-scheduler-abfe0",
    storageBucket: "",
    messagingSenderId: "1080289240973"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainTime,
        freq: trainFrequency
    };

    console.log(trainTime);

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (snapshot) {

    var data = snapshot.val();    
    var trainName = data.name;
    var trainDestination = data.destination;
    var trainTime = data.start;
    var trainFrequency = data.freq;

    var firstTrainConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    var remainder = diffTime % trainFrequency;
    var minsAway = trainFrequency - remainder;
    var nextArrival = moment().add(minsAway, "minutes").format("h:mm a");

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");
});