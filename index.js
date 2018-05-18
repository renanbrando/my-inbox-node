var mqtt = require('mqtt');
var admin = require("firebase-admin");

var config = require("./firebase-config.json");
var client = mqtt.connect('mqtt://iot.eclipse.org');

admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: "mydatabase"
});

client.on('connect', function () {

    console.log('Oh Glorious Day! I have connected to eclipse broker.')
    client.subscribe('myinbox')

});

client.on('message', function (topic, message) {

    console.log(topic)
    console.log(message.toString())

    client.end();

    // sending push notification
    admin.messaging().send({
        data: message.toString(),
        topic: 'myinbox'
    })
    .then((response) => {
        console.log('pushed successfully! ', response)
    })
    .catch((error) => {
        console.log('error while pushing: ', error)
    });

});