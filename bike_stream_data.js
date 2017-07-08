var RTM = require("satori-rtm-sdk");

var endpoint = "wss://open-data.api.satori.com";
var appKey = "EDC25D6EB2CF1916590F186d20461c2D";
var channel = "US-Bike-Sharing-Channel";

var client = new RTM(endpoint, appKey);

client.on('enter-connected', function () {
  console.log('Connected to Satori RTM!');
});

var subscription = client.subscribe(channel, RTM.SubscriptionMode.SIMPLE);

subscription.on('rtm/subscription/data', function (pdu) {
  pdu.body.messages.forEach(function (msg) {
    console.log('Got message:', msg);
  });
});

client.start();
