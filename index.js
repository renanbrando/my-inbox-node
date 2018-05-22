var mqtt = require('mqtt');
var gcm = require('node-gcm');

var sender = new gcm.Sender('AIzaSyDVSUQijfKoGBxIXJ7W4SBBVJKAeMP6VpM');
var client = mqtt.connect('mqtt://iot.eclipse.org');

client.on('connect', function () {

    console.log('Oh Glorious Day! I have connected to eclipse broker.')
    client.subscribe('myinbox')

});

client.on('message', function (topic, message) {

    console.log(topic)
    console.log(message.toString())

    client.end();

    // Prepare a message to be sent
    var message = new gcm.Message();
    
    // as object
    message.addNotification({
        title: 'New Inbox!',
        body: 'You just received a new letter.',
        icon: 'ic_launcher'
    });
    
    
    // Actually send the message
    sender.send(message, { topic: 'myinbox' }, function (err, response) {
        if (err) console.error(err);
        else console.log(response);
    });

});